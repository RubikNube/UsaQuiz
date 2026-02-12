#!/usr/bin/env bash
set -euo pipefail

# Run from repo root.
cd "$(dirname "$0")/.."

out_dir="assets/flags"
mkdir -p "$out_dir"

# stateCode -> Wikimedia Commons "File:" name (without /wiki/File:)
declare -A files=(
  [AL]="Flag_of_Alabama.svg"
  [AK]="Flag_of_Alaska.svg"
  [AZ]="Flag_of_Arizona.svg"
  [AR]="Flag_of_Arkansas.svg"
  [CA]="Flag_of_California.svg"
  [CO]="Flag_of_Colorado.svg"
  [CT]="Flag_of_Connecticut.svg"
  [DE]="Flag_of_Delaware.svg"
  [FL]="Flag_of_Florida.svg"
  [GA]="Flag_of_Georgia_(U.S._state).svg"
  [HI]="Flag_of_Hawaii.svg"
  [ID]="Flag_of_Idaho.svg"
  [IL]="Flag_of_Illinois.svg"
  [IN]="Flag_of_Indiana.svg"
  [IA]="Flag_of_Iowa.svg"
  [KS]="Flag_of_Kansas.svg"
  [KY]="Flag_of_Kentucky.svg"
  [LA]="Flag_of_Louisiana.svg"
  [ME]="Flag_of_Maine.svg"
  [MD]="Flag_of_Maryland.svg"
  [MA]="Flag_of_Massachusetts.svg"
  [MI]="Flag_of_Michigan.svg"
  [MN]="Flag_of_Minnesota.svg"
  [MS]="Flag_of_Mississippi.svg"
  [MO]="Flag_of_Missouri.svg"
  [MT]="Flag_of_Montana.svg"
  [NE]="Flag_of_Nebraska.svg"
  [NV]="Flag_of_Nevada.svg"
  [NH]="Flag_of_New_Hampshire.svg"
  [NJ]="Flag_of_New_Jersey.svg"
  [NM]="Flag_of_New_Mexico.svg"
  [NY]="Flag_of_New_York.svg"
  [NC]="Flag_of_North_Carolina.svg"
  [ND]="Flag_of_North_Dakota.svg"
  [OH]="Flag_of_Ohio.svg"
  [OK]="Flag_of_Oklahoma.svg"
  [OR]="Flag_of_Oregon.svg"
  [PA]="Flag_of_Pennsylvania.svg"
  [RI]="Flag_of_Rhode_Island.svg"
  [SC]="Flag_of_South_Carolina.svg"
  [SD]="Flag_of_South_Dakota.svg"
  [TN]="Flag_of_Tennessee.svg"
  [TX]="Flag_of_Texas.svg"
  [UT]="Flag_of_Utah.svg"
  [VT]="Flag_of_Vermont.svg"
  [VA]="Flag_of_Virginia.svg"
  [WA]="Flag_of_Washington.svg"
  [WV]="Flag_of_West_Virginia.svg"
  [WI]="Flag_of_Wisconsin.svg"
  [WY]="Flag_of_Wyoming.svg"
)

tmp="$(mktemp -d)"
cleanup() { rm -rf "$tmp"; }
trap cleanup EXIT

download_one() {
  local code="$1"
  local file="$2"
  local page_url="https://commons.wikimedia.org/wiki/File:${file}"
  local target="${out_dir}/${code}.svg"

  if [[ -f "${target}" ]]; then
    echo "==> ${code}: already exists, skip (${target})"
    return 0
  fi

  echo "==> ${code}: ${file}"

  # Resolve to the actual raw file URL via the Special:FilePath redirect.
  local raw_url
  raw_url="$(curl -fsSLI "${page_url}" \
    | awk 'BEGIN{IGNORECASE=1} /^location:/{print $2}' \
    | tr -d '\r' \
    | sed -n 's#^/wiki/File:\(.*\)#https://commons.wikimedia.org/wiki/Special:FilePath/\1#p' \
    | tail -n1)"

  if [[ -z "${raw_url}" ]]; then
    raw_url="https://commons.wikimedia.org/wiki/Special:FilePath/${file}"
  fi

  curl -fsSL "${raw_url}" -o "${tmp}/${code}.svg"

  # Basic sanity check: ensure we downloaded an SVG.
  if ! head -c 256 "${tmp}/${code}.svg" | grep -qiE '<svg|<\?xml'; then
    echo "ERROR: ${code} did not download as SVG (got unexpected content). URL: ${raw_url}" >&2
    return 1
  fi

  mv "${tmp}/${code}.svg" "${target}"
}

for code in "${!files[@]}"; do
  download_one "$code" "${files[$code]}"
done

echo "Done. Flags in: ${out_dir}"
echo "Tip: sort order is arbitrary due to associative arrays."
