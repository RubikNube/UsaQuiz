# USA Quiz

This is a simple quiz game about the United States.

https://rubiknube.github.io/UsaQuiz/

## Features

- [x] Find the state on a USA map (Quiz + Learn mode)
- [x] Select the state capital
- [x] Guess the state flag
- [x] Find major US rivers on the map
- [x] Find major US mountain ranges on the map
- [x] Find National Historic Landmarks on the map
- [x] Find National Natural Landmarks on the map

## How to Play

1. Open the game (link above).
2. Select a mode:
   - **Quiz**: press **Start**, then click the correct state on the map.
     - Use **Questions** to choose how many rounds to play.
     - Use **Auto next** to automatically advance after a **correct**
       answer (on by default).
     - If you answer **wrong**, the correct state is highlighted and you
       must press **Next** to continue.
   - **Select the Capital**: press **Start**, then for each round, the name of a state is shown and you must pick the correct capital from the list of options. The options appear both below and in the top banner as clickable buttons. After answering, the correct capital is highlighted. Use **Next** to advance, or **Restart** to start over.
   - **Flag Quiz**: press **Start**, then for each round, the name of a state is shown in the top banner and you must pick the correct flag from a set of options. The map is hidden in this mode to maximize flag size. Use the **Flag size** dropdown to choose how large the flags appear (Auto, S, M, L, XL, XXL). The UI updates instantly when you change the flag size. After answering, a notification appears for correct or wrong answers. Use **Next** to advance, or **Restart** to start over.
   - **River Quiz**: before starting, click any river to see its name and approximate length in a panel that stays visible while scrolling. Press **Start**, then click the named river on the map. The quiz includes 20 major river systems and limits the selected question count to the number available. A wrong answer highlights both the clicked and correct rivers. **Auto next** advances after a correct answer; otherwise use **Next**. River information is available again after the game ends.
   - **Mountain Range Quiz**: before starting, click a range to see its location and a notable summit with approximate elevation. Press **Start**, then click the named range on the map. The quiz includes 12 ranges across the contiguous US, Alaska, and Hawaii; question counts are limited to available ranges. A wrong answer highlights both the clicked and correct ranges. **Auto next** advances after a correct answer; otherwise use **Next**. Range information is available again after the game ends.
   - **National Historic Landmarks Quiz**: before starting, click a marker to see a photo, location, historical note, and a link to the landmark's Wikipedia article. Press **Start**, then click the marker for the named landmark. The quiz includes 20 designated landmarks in 20 states, including Alaska and Hawaii. After an answer, the selected landmark's details appear and a wrong answer highlights the correct marker. **Auto next** advances after a correct answer; otherwise use **Next**. Study information is available again after the game ends.
   - **National Natural Landmarks Quiz**: explore 20 designated natural sites in 20 states, including Alaska and Hawaii. Click a marker to see a photo, location, natural history note, and article link. Press **Start** to find the named site; scoring, wrong-answer highlights, **Auto next**, and post-game study work like the historic landmark quiz.
   - **Learn**: click any state to see its name.
3. Use **Restart** to start a new game.

## Resources

### National Historic Landmarks

The 20 sites were checked against the [NPS list of designated National Historic Landmarks by state](https://www.nps.gov/subjects/nationalhistoriclandmarks/list-of-nhls-by-state.htm). Brief descriptions summarize their historic significance. Lower-48 markers use the same Albers projection as the capital markers; Alaska and Hawaii markers are placed on the map's separate insets. Positions are approximate on this stylized map.

The locally bundled photos come from Wikimedia Commons. Authors, licenses, and source files are listed in [`assets/landmarks/ATTRIBUTION.md`](assets/landmarks/ATTRIBUTION.md). The source titles, image metadata, and coordinates used during curation are in [`assets/landmarks/metadata.json`](assets/landmarks/metadata.json). Run `python3 scripts/fetch-landmark-images.py --refresh` to refresh the photo thumbnails and attribution.

### National Natural Landmarks

The 20 sites were checked against the [NPS list of current National Natural Landmarks](https://irma.nps.gov/DataStore/Reference/Profile/2318620). Marker positions are approximate site centers on the stylized map; Alaska and Hawaii use the map's separate insets. The notes describe natural features rather than access or visiting conditions.

The bundled photos come from Wikimedia Commons. Authors, licenses, and source files are listed in [`assets/natural-landmarks/ATTRIBUTION.md`](assets/natural-landmarks/ATTRIBUTION.md); image metadata and article coordinates are in [`assets/natural-landmarks/metadata.json`](assets/natural-landmarks/metadata.json). Run `python3 scripts/fetch-natural-landmark-images.py --refresh` to refresh thumbnails and attribution.

### US map

File:Blank US Electoral Map Revised.svg. (2023, November 26). Wikimedia Commons. Retrieved February 11, 2026, from https://commons.wikimedia.org/w/index.php?title=File:Blank_US_Electoral_Map_Revised.svg&oldid=825333292.

### Capital city markers

The 50 city-center coordinates in [`scripts/capital-locations.json`](scripts/capital-locations.json) come from [USGS GNIS Populated Place points](https://www.usgs.gov/us-board-on-geographic-names/what-geographic-names-information-system-gnis), accessed through the [GNIS-based USA Populated Places layer](https://services.arcgis.com/o6oETlrWetREI1A2/ArcGIS/rest/services/FeatureLayerForWebGIS/FeatureServer/2). Capital names and states were checked against the [2026 Census Places Gazetteer](https://www.census.gov/geographies/reference-files/2026/geo/gazetter-file.html). GNIS points locate the city center rather than the center of its municipal boundary; this matters especially for large cities such as Juneau and Phoenix.

[`scripts/position-capitals.py`](scripts/position-capitals.py) fits an Albers projection to state-border intersections on this stylized SVG, then writes the projected points to the map. Alaska and Hawaii use their separate inset positions; Trenton is moved slightly inside New Jersey's simplified western border. Run `python3 scripts/position-capitals.py --write` after changing source coordinates, or `python3 scripts/position-capitals.py --check` to verify the committed marker positions. The map is intended for learning, so the dots are approximate at the scale of its simplified state shapes.

### Flags

The state flag images are downloaded from Wikimedia Commons.

Attribution and license details per flag: [`assets/flags/ATTRIBUTION.md`](assets/flags/ATTRIBUTION.md)

Source collection: https://commons.wikimedia.org/wiki/Flags_of_the_U.S._states

### Rivers

The river lines are simplified from Natural Earth's public domain 1:10m rivers and North America supplement, then projected onto the game's stylized state map. Short gaps at lakes and reservoirs are joined where needed. The map itself is stylized, so the overlay is for learning rather than precise navigation. Source: https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/

The Rio Grande along Texas and the St. Lawrence along northern New York use the corresponding state border paths to keep those shared boundaries aligned on the stylized map.

The 20 entries follow the [USGS length ranking](https://pubs.usgs.gov/of/1987/ofr87-242/) for river systems associated with the United States. That ranking measures the route from a distant headwater to the mouth, even when the headwater stream has another name. The learning panel labels this as **river system** length. When the named river has a substantially different length, the panel shows that length separately (for example, the [Mobile River is about 45 miles](https://www.usgs.gov/water-science-school/science/rivers-world-worlds-longest-rivers), while its ranked system is 774 miles). Named-river figures also use [USACE Atchafalaya](https://www.mvn.usace.army.mil/Portals/56/Draft_South_Central_Coast_Louisiana_Main_Report.pdf), [USGS Ohio](https://pubs.usgs.gov/wri/1991/4050/report.pdf), [USGS Tennessee](https://pubs.usgs.gov/sir/2020/5138/sir20205138.pdf), [USGS Brazos](https://www.usgs.gov/news/science-snippet/earthview-rain-swollen-brazos-river-floods-suburban-houston), [Nebraska Platte](https://walk2unlock.ne.gov/markers/central-platte-nrd-watersheds/), and [New York St. Lawrence](https://dec.ny.gov/sites/default/files/2024-01/lkontditlteachpacket.pdf). The simplified map lines show the river's US course rather than every headwater branch.

The named Missouri River figure uses [USGS river mileage from its headwaters near Three Forks](https://www.usgs.gov/publications/travel-times-streamflow-velocities-and-dispersion-rates-missouri-river-upstream-canyon).

### Mountain ranges

The 12 mountain range routes are hand-drawn, simplified centerlines on the game's stylized map. They indicate general locations, not surveyed boundaries. See the [USGS National Map](https://www.usgs.gov/tools/national-map-viewer) for detailed terrain. The [Koʻolau Range on Oʻahu](https://www.gohawaii.com/islands/oahu/travel-info/maps) uses a wider click target because the island is small in the map inset.

The learning panel lists a notable summit and its approximate elevation, not the height of the whole range. Summit figures come from [USGS (Elbert and Rainier)](https://www.usgs.gov/educational-resources/elevations-named-summits-over-14000-feet-above-sea-level), [NPS (Mitchell)](https://www.nps.gov/places/mount-mitchell.htm), [NPS (Whitney)](https://home.nps.gov/seki/planyourvisit/whitney.htm), [NPS (Olympus)](https://www.nps.gov/olym/learn/nature/geology.htm), [NPS (Denali)](https://www.nps.gov/dena/planyourvisit/park-brochure.htm), [Utah Geological Survey (Nebo)](https://geology.utah.gov/map-pub/survey-notes/geosights/devils-kitchen/devils_kitchen3/), [USDA Forest Service (Kings Peak)](https://www.fs.usda.gov/air/documents/hu_AQRV.pdf), [University of Arkansas Extension (Rich Mountain)](https://www.uaex.uada.edu/environment-nature/musings-on-nature-blog/posts/ouachita-maountains.aspx), [New York DEC (Marcy)](https://extapps.dec.ny.gov/docs/lands_forests_pdf/hpwump.pdf), [University of Alaska Fairbanks (Isto)](https://www.gi.alaska.edu/alaska-science-forum/measuring-highest-peaks-brooks-range), and [Hawaiʻi DLNR (Kōnāhuanui)](https://dlnr.hawaii.gov/recreation/files/2023/03/Maunawili-Creed-EA.pdf). Meter values are rounded conversions from feet.
