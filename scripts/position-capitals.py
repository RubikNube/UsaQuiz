"""Project GNIS capital city points onto the game's stylized SVG map.

Run with --write to update src/index.html or --check to verify it. The source
coordinates in capital-locations.json are GNIS Populated Place points.
"""

import argparse
import json
import math
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MAP = ROOT / "src/index.html"
LOCATIONS = ROOT / "scripts/capital-locations.json"

# State-line intersections on the map, paired with their geographic locations.
# These calibrate the lower-48 Albers projection to this particular SVG.
# Each entry is latitude, longitude, SVG x, SVG y.
ANCHORS = [
    (41, -109.05, 274.33, 367.32),  # Colorado northwest
    (41, -102.05, 385.02, 379.30),  # Colorado northeast
    (37, -109.05, 263.01, 451.95),  # Four Corners
    (37, -102.05, 380.46, 463.44),  # Colorado southeast
    (45, -111.05, 256.55, 277.82),  # Wyoming northwest
    (45, -104.05, 360.07, 290.63),  # Wyoming northeast
    (41, -111.05, 243.29, 363.12),  # Wyoming southwest
    (41, -104.05, 353.99, 376.33),  # Wyoming southeast
    (49, -104.05, 367.45, 206.15),  # North Dakota northwest
    (49, -97.23, 463.87, 210.86),   # North Dakota northeast
]

# Alaska and Hawaii are separately scaled insets. These positions place the
# GNIS Juneau point along the southeast panhandle and the GNIS Honolulu point
# on Oahu's south coast. New Jersey's stylized west border needs a small
# adjustment to keep Trenton's center on the New Jersey side of the river.
INSET_AND_BORDER_POSITIONS = {
    "AK": (203.0, 688.5),
    "HI": (291.2, 663.7),
    "NJ": (824.5, 360.5),
}

CIRCLE = re.compile(
    r'<circle\s+cx="(?P<x>[^"]+)"\s+cy="(?P<y>[^"]+)"'
    r'(?P<rest>\s+r="4"\s+class="capital-dot"\s+data-state="(?P<state>[A-Z]{2})"[^>]*?/>)'
)


def albers(latitude, longitude):
    first, second = math.radians(29.5), math.radians(45.5)
    n = (math.sin(first) + math.sin(second)) / 2
    c = math.cos(first) ** 2 + 2 * n * math.sin(first)
    rho = math.sqrt(c - 2 * n * math.sin(math.radians(latitude))) / n
    theta = n * math.radians(longitude + 96)
    return rho * math.sin(theta), -rho * math.cos(theta)


def fit_axis(axis):
    pairs = [(albers(lat, lon)[axis], (x, y)[axis]) for lat, lon, x, y in ANCHORS]
    source_mean = sum(source for source, _ in pairs) / len(pairs)
    target_mean = sum(target for _, target in pairs) / len(pairs)
    scale = sum(
        (source - source_mean) * (target - target_mean)
        for source, target in pairs
    ) / sum((source - source_mean) ** 2 for source, _ in pairs)
    return scale, target_mean - scale * source_mean


def positions():
    locations = json.loads(LOCATIONS.read_text())
    x_scale, x_offset = fit_axis(0)
    y_scale, y_offset = fit_axis(1)
    result = {}
    for state, point in locations.items():
        if state in INSET_AND_BORDER_POSITIONS:
            result[state] = INSET_AND_BORDER_POSITIONS[state]
        else:
            x, y = albers(point["lat"], point["lon"])
            result[state] = (round(x_scale * x + x_offset, 2), round(y_scale * y + y_offset, 2))
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()

    expected = positions()
    html = MAP.read_text()
    matches = list(CIRCLE.finditer(html))
    seen = [match["state"] for match in matches]
    if len(seen) != 50 or len(set(seen)) != 50 or set(seen) != set(expected):
        raise SystemExit("Capital circles must match the 50 location records exactly")

    if args.check:
        mismatches = [
            match["state"] for match in matches
            if (float(match["x"]), float(match["y"])) != expected[match["state"]]
        ]
        if mismatches:
            raise SystemExit("Capital positions differ: " + ", ".join(mismatches))
        print("All 50 capital positions match their source coordinates.")
    else:
        def replace(match):
            x, y = expected[match["state"]]
            return f'<circle\n            cx="{x:g}"\n            cy="{y:g}"' + match["rest"]

        MAP.write_text(CIRCLE.sub(replace, html))
        print("Updated 50 capital positions in src/index.html.")


if __name__ == "__main__":
    main()
