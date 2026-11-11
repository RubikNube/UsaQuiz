"""Download small Wikimedia Commons natural landmark photos and write their credits.

Run manually when refreshing the curated landmark image set. All images must
be checked for suitable reuse terms before committing them.
"""

import argparse
import json
import html
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "natural-landmarks"
TITLES = {
    "worthington-glacier": "Worthington Glacier",
    "barringer-crater": "Meteor Crater",
    "rancho-la-brea": "La Brea Tar Pits",
    "garden-of-the-gods": "Garden of the Gods",
    "wakulla-springs": "Wakulla Springs",
    "okefenokee-swamp": "Okefenokee Swamp",
    "diamond-head": "Diamond Head, Hawaii",
    "great-rift": "Craters of the Moon National Monument and Preserve",
    "monument-rocks": "Monument Rocks (Kansas)",
    "red-river-gorge": "Red River Gorge",
    "mount-katahdin": "Mount Katahdin",
    "porcupine-mountains": "Porcupine Mountains",
    "itasca-natural-area": "Itasca State Park",
    "hell-creek": "Hell Creek Formation",
    "ashfall-fossil-beds": "Ashfall Fossil Beds",
    "valley-of-fire": "Valley of Fire State Park",
    "albany-pine-bush": "Albany Pine Bush",
    "newberry-crater": "Newberry National Volcanic Monument",
    "enchanted-rock": "Enchanted Rock",
    "mima-mounds": "Mima Mounds",
}
OVERRIDE_IMAGES = {"rancho-la-brea": "La Brea Tar Pits (laenulfean).jpg"}
OVERRIDE_ARTISTS = {"ashfall-fossil-beds": "Mawhamba"}


def get_json(base, params):
    url = base + "?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={"User-Agent": "UsaQuiz/1.0 (educational project; Wikimedia attribution)"})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 5:
                raise
            time.sleep(3 * (attempt + 1))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="redownload existing images")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    existing_path = OUT / "metadata.json"
    existing = {item["slug"]: item for item in json.loads(existing_path.read_text())} if existing_path.exists() else {}
    records = []
    for slug, title in TITLES.items():
        if not args.refresh and slug in existing and existing[slug].get("path") and (ROOT / existing[slug]["path"]).exists() and (slug not in OVERRIDE_IMAGES or existing[slug].get("file") == OVERRIDE_IMAGES[slug]):
            if slug in OVERRIDE_ARTISTS:
                existing[slug]["artist"] = OVERRIDE_ARTISTS[slug]
            records.append(existing[slug])
            continue
        data = get_json("https://en.wikipedia.org/w/api.php", {
            "action": "query", "format": "json", "titles": title,
            "prop": "pageimages|coordinates", "piprop": "name", "redirects": "1",
        })
        page = next(iter(data["query"]["pages"].values()))
        if "pageimage" not in page and slug not in OVERRIDE_IMAGES:
            records.append({"slug": slug, "title": title, "error": "no page image", "coordinates": page.get("coordinates")})
            existing_path.write_text(json.dumps(records + [v for k, v in existing.items() if k not in {r["slug"] for r in records}], indent=2, ensure_ascii=False) + "\n")
            continue
        filename = OVERRIDE_IMAGES.get(slug, page.get("pageimage"))
        commons = get_json("https://commons.wikimedia.org/w/api.php", {
            "action": "query", "format": "json", "titles": "File:" + filename,
            "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": "360",
        })
        image_page = next(iter(commons["query"]["pages"].values()))
        info = image_page.get("imageinfo", [{}])[0]
        meta = info.get("extmetadata", {})
        record = {"slug": slug, "title": page.get("title"), "file": filename,
                  "coordinates": page.get("coordinates"),
                  "image_url": info.get("thumburl"), "page_url": info.get("descriptionurl"),
                  "artist": meta.get("Artist", {}).get("value", ""),
                  "license": meta.get("LicenseShortName", {}).get("value", ""),
                  "license_url": meta.get("LicenseUrl", {}).get("value", "")}
        if not record["artist"] and slug in OVERRIDE_ARTISTS:
            record["artist"] = OVERRIDE_ARTISTS[slug]
        if record["image_url"]:
            extension = filename.rsplit(".", 1)[-1].lower()
            if extension not in {"jpg", "jpeg", "png", "webp"}:
                extension = "jpg"
            path = OUT / f"{slug}.{extension}"
            request = urllib.request.Request(record["image_url"], headers={"User-Agent": "UsaQuiz/1.0 (educational project)"})
            with urllib.request.urlopen(request, timeout=30) as response:
                path.write_bytes(response.read())
            record["path"] = str(path.relative_to(ROOT))
        records.append(record)
        existing_path.write_text(json.dumps(records + [v for k, v in existing.items() if k not in {r["slug"] for r in records}], indent=2, ensure_ascii=False) + "\n")
        print(slug, record.get("license"), record.get("path", "NO IMAGE"), flush=True)
        time.sleep(2)
    existing_path.write_text(json.dumps(records, indent=2, ensure_ascii=False) + "\n")
    lines = ["# National Natural Landmark image attribution", "", "These locally stored photos are resized Wikimedia Commons thumbnails. The image files were not otherwise modified.", ""]
    for item in records:
        artist = html.unescape(re.sub(r"<[^>]*>", "", item.get("artist", ""))).strip() or "Unknown"
        license_name = item.get("license", "Unknown license")
        license_url = item.get("license_url", "")
        license_text = f"[{license_name}]({license_url})" if license_url else license_name
        lines.append(f"- **{item['title']}** — {artist}; {license_text}; [source image]({item.get('page_url', '')}).")
    (OUT / "ATTRIBUTION.md").write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
