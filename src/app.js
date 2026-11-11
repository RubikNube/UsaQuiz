const DEFAULT_TOTAL_ROUNDS = 10;

// Map of state code -> name.
const STATES = [
  { code: "AL", name: "Alabama", capital: "Montgomery" },
  { code: "AK", name: "Alaska", capital: "Juneau" },
  { code: "AZ", name: "Arizona", capital: "Phoenix" },
  { code: "AR", name: "Arkansas", capital: "Little Rock" },
  { code: "CA", name: "California", capital: "Sacramento" },
  { code: "CO", name: "Colorado", capital: "Denver" },
  { code: "CT", name: "Connecticut", capital: "Hartford" },
  { code: "DE", name: "Delaware", capital: "Dover" },
  { code: "FL", name: "Florida", capital: "Tallahassee" },
  { code: "GA", name: "Georgia", capital: "Atlanta" },
  { code: "HI", name: "Hawaii", capital: "Honolulu" },
  { code: "ID", name: "Idaho", capital: "Boise" },
  { code: "IL", name: "Illinois", capital: "Springfield" },
  { code: "IN", name: "Indiana", capital: "Indianapolis" },
  { code: "IA", name: "Iowa", capital: "Des Moines" },
  { code: "KS", name: "Kansas", capital: "Topeka" },
  { code: "KY", name: "Kentucky", capital: "Frankfort" },
  { code: "LA", name: "Louisiana", capital: "Baton Rouge" },
  { code: "ME", name: "Maine", capital: "Augusta" },
  { code: "MD", name: "Maryland", capital: "Annapolis" },
  { code: "MA", name: "Massachusetts", capital: "Boston" },
  { code: "MI", name: "Michigan", capital: "Lansing" },
  { code: "MN", name: "Minnesota", capital: "Saint Paul" },
  { code: "MS", name: "Mississippi", capital: "Jackson" },
  { code: "MO", name: "Missouri", capital: "Jefferson City" },
  { code: "MT", name: "Montana", capital: "Helena" },
  { code: "NE", name: "Nebraska", capital: "Lincoln" },
  { code: "NV", name: "Nevada", capital: "Carson City" },
  { code: "NH", name: "New Hampshire", capital: "Concord" },
  { code: "NJ", name: "New Jersey", capital: "Trenton" },
  { code: "NM", name: "New Mexico", capital: "Santa Fe" },
  { code: "NY", name: "New York", capital: "Albany" },
  { code: "NC", name: "North Carolina", capital: "Raleigh" },
  { code: "ND", name: "North Dakota", capital: "Bismarck" },
  { code: "OH", name: "Ohio", capital: "Columbus" },
  { code: "OK", name: "Oklahoma", capital: "Oklahoma City" },
  { code: "OR", name: "Oregon", capital: "Salem" },
  { code: "PA", name: "Pennsylvania", capital: "Harrisburg" },
  { code: "RI", name: "Rhode Island", capital: "Providence" },
  { code: "SC", name: "South Carolina", capital: "Columbia" },
  { code: "SD", name: "South Dakota", capital: "Pierre" },
  { code: "TN", name: "Tennessee", capital: "Nashville" },
  { code: "TX", name: "Texas", capital: "Austin" },
  { code: "UT", name: "Utah", capital: "Salt Lake City" },
  { code: "VT", name: "Vermont", capital: "Montpelier" },
  { code: "VA", name: "Virginia", capital: "Richmond" },
  { code: "WA", name: "Washington", capital: "Olympia" },
  { code: "WV", name: "West Virginia", capital: "Charleston" },
  { code: "WI", name: "Wisconsin", capital: "Madison" },
  { code: "WY", name: "Wyoming", capital: "Cheyenne" },
];

const RIVERS = [
  { code: "missouri", name: "Missouri River", lengthMiles: 2540, namedLengthMiles: 2319 },
  { code: "mississippi", name: "Mississippi River", lengthMiles: 2340 },
  { code: "yukon", name: "Yukon River", lengthMiles: 1980 },
  { code: "rio-grande", name: "Rio Grande", lengthMiles: 1900 },
  { code: "st-lawrence", name: "St. Lawrence River", lengthMiles: 1900, namedLengthMiles: 744 },
  { code: "arkansas", name: "Arkansas River", lengthMiles: 1469 },
  { code: "colorado", name: "Colorado River", lengthMiles: 1450 },
  { code: "atchafalaya", name: "Atchafalaya River", lengthMiles: 1420, namedLengthMiles: 137 },
  { code: "ohio", name: "Ohio River", lengthMiles: 1310, namedLengthMiles: 981 },
  { code: "red", name: "Red River", lengthMiles: 1290 },
  { code: "brazos", name: "Brazos River", lengthMiles: 1280, namedLengthMiles: 840 },
  { code: "columbia", name: "Columbia River", lengthMiles: 1249 },
  { code: "snake", name: "Snake River", lengthMiles: 1040 },
  { code: "platte", name: "Platte River", lengthMiles: 990, namedLengthMiles: 310 },
  { code: "pecos", name: "Pecos River", lengthMiles: 926 },
  { code: "canadian", name: "Canadian River", lengthMiles: 906 },
  { code: "tennessee", name: "Tennessee River", lengthMiles: 886, namedLengthMiles: 652 },
  { code: "colorado-texas", name: "Colorado River of Texas", lengthMiles: 862 },
  { code: "north-canadian", name: "North Canadian River", lengthMiles: 800 },
  { code: "mobile", name: "Mobile River", lengthMiles: 774, namedLengthMiles: 45 },
];

const MOUNTAINS = [
  { code: "rocky", name: "Rocky Mountains", region: "Western US", peak: "Mount Elbert", peakFeet: 14433 },
  { code: "appalachian", name: "Appalachian Mountains", region: "Eastern US", peak: "Mount Mitchell", peakFeet: 6684 },
  { code: "sierra-nevada", name: "Sierra Nevada", region: "California and Nevada", peak: "Mount Whitney", peakFeet: 14505 },
  { code: "cascade", name: "Cascade Range", region: "Washington, Oregon, and northern California", peak: "Mount Rainier", peakFeet: 14410 },
  { code: "olympic", name: "Olympic Mountains", region: "Olympic Peninsula, Washington", peak: "Mount Olympus", peakFeet: 7980 },
  { code: "wasatch", name: "Wasatch Range", region: "Utah and southern Idaho", peak: "Mount Nebo", peakFeet: 11928 },
  { code: "uinta", name: "Uinta Mountains", region: "Northeastern Utah", peak: "Kings Peak", peakFeet: 13528 },
  { code: "ouachita", name: "Ouachita Mountains", region: "Arkansas and Oklahoma", peak: "Rich Mountain", peakFeet: 2681 },
  { code: "adirondack", name: "Adirondack Mountains", region: "Northern New York", peak: "Mount Marcy", peakFeet: 5344 },
  { code: "alaska", name: "Alaska Range", region: "South-central Alaska", peak: "Denali", peakFeet: 20310 },
  { code: "brooks", name: "Brooks Range", region: "Northern Alaska", peak: "Mount Isto", peakFeet: 8975 },
  { code: "koolau", name: "Koʻolau Range", region: "Eastern Oʻahu, Hawaiʻi", peak: "Kōnāhuanui", peakFeet: 3150 },
];

// Curated from the NPS list of currently designated National Historic Landmarks.
// Coordinates are approximate site centers; the map is a stylized teaching aid.
const LANDMARKS = [
  { code: "brown-chapel", name: "Brown Chapel A.M.E. Church", wikipediaTitle: "Brown Chapel A.M.E. Church (Selma, Alabama)", state: "Alabama", fact: "A meeting place and starting point for the 1965 Selma voting rights marches.", lat: 32.4125, lon: -87.0161 },
  { code: "russian-bishops-house", name: "Russian Bishop's House", state: "Alaska", fact: "An 1840s building that recalls Russian colonial life in Sitka.", x: 204, y: 681 },
  { code: "taliesin-west", name: "Taliesin West", state: "Arizona", fact: "Frank Lloyd Wright's desert home and architectural school.", lat: 33.6064, lon: -111.8453 },
  { code: "little-rock-central", name: "Little Rock Central High School", state: "Arkansas", fact: "The 1957 desegregation crisis here became a defining event of the civil rights movement.", lat: 34.7368, lon: -92.2989 },
  { code: "alcatraz", name: "Alcatraz Island", state: "California", fact: "This island served as a federal prison and later became the site of an Indigenous occupation.", lat: 37.8267, lon: -122.4228 },
  { code: "bents-old-fort", name: "Bent's Old Fort", wikipediaTitle: "Bent's Old Fort National Historic Site", state: "Colorado", fact: "A major trading post on the Santa Fe Trail in the 1830s and 1840s.", lat: 38.0406, lon: -103.4294 },
  { code: "vizcaya", name: "Vizcaya", wikipediaTitle: "Vizcaya Museum and Gardens", state: "Florida", fact: "An early twentieth-century estate that reflects Miami's Gilded Age development.", lat: 25.7436, lon: -80.2103 },
  { code: "pearl-harbor", name: "United States Naval Base, Pearl Harbor", wikipediaTitle: "Naval Station Pearl Harbor", state: "Hawaii", fact: "The naval base attacked on December 7, 1941, bringing the United States into World War II.", x: 289, y: 662 },
  { code: "old-state-capitol", name: "Old State Capitol", wikipediaTitle: "Old State Capitol State Historic Site", state: "Illinois", fact: "Abraham Lincoln delivered his 1858 House Divided speech at this former state capitol.", lat: 39.8019, lon: -89.6481 },
  { code: "grand-hotel", name: "Grand Hotel", wikipediaTitle: "Grand Hotel (Mackinac Island)", state: "Michigan", fact: "A landmark 1887 resort hotel on Mackinac Island.", lat: 45.8476, lon: -84.6201 },
  { code: "split-rock", name: "Split Rock Light Station", wikipediaTitle: "Split Rock Lighthouse", state: "Minnesota", fact: "Built after deadly Lake Superior shipwrecks, this lighthouse entered service in 1910.", lat: 47.2003, lon: -91.3677 },
  { code: "hoover-dam", name: "Hoover Dam", state: "Nevada", fact: "A 1930s engineering project that controls the Colorado River and supplies hydroelectric power.", lat: 36.0161, lon: -114.7377 },
  { code: "taos-pueblo", name: "Taos Pueblo", state: "New Mexico", fact: "A living Pueblo community with multi-story adobe buildings maintained over centuries.", lat: 36.4389, lon: -105.5456 },
  { code: "biltmore", name: "Biltmore Estate", state: "North Carolina", fact: "George Vanderbilt's late nineteenth-century estate and its landscaped grounds.", lat: 35.54, lon: -82.5524 },
  { code: "timberline", name: "Timberline Lodge", state: "Oregon", fact: "A Mount Hood lodge built through New Deal public works programs.", lat: 45.3311, lon: -121.711 },
  { code: "fallingwater", name: "Fallingwater", state: "Pennsylvania", fact: "Frank Lloyd Wright designed this house over a waterfall in the 1930s.", lat: 39.9061, lon: -79.4681 },
  { code: "graceland", name: "Graceland", state: "Tennessee", fact: "Elvis Presley's Memphis home and a landmark of American popular music.", lat: 35.0461, lon: -90.0236 },
  { code: "texas-capitol", name: "Texas State Capitol", state: "Texas", fact: "The pink-granite state capitol opened in Austin in 1888.", lat: 30.2747, lon: -97.7404 },
  { code: "temple-square", name: "Temple Square", state: "Utah", fact: "The historic center of the Church of Jesus Christ of Latter-day Saints in Salt Lake City.", lat: 40.7706, lon: -111.8929 },
  { code: "mount-vernon", name: "Mount Vernon", state: "Virginia", fact: "George Washington's Potomac plantation, where hundreds of enslaved people lived and worked.", lat: 38.7073, lon: -77.0865 },
];

// Designations checked against the NPS National Natural Landmarks directory.
// Coordinates mark approximate site centers on the stylized map.
const NATURAL_LANDMARKS = [
  { code: "worthington-glacier", name: "Worthington Glacier", state: "Alaska", fact: "A glacier in the Chugach Mountains that descends toward the Richardson Highway.", x: 158, y: 641 },
  { code: "barringer-crater", name: "Barringer Meteor Crater", wikipediaTitle: "Meteor Crater", state: "Arizona", fact: "A remarkably well-preserved impact crater formed by a meteorite about 50,000 years ago.", lat: 35.0281, lon: -111.0233 },
  { code: "rancho-la-brea", name: "Rancho La Brea", wikipediaTitle: "La Brea Tar Pits", state: "California", fact: "Asphalt seeps preserve fossils of Ice Age animals, including mammoths and saber-toothed cats.", lat: 34.0628, lon: -118.356 },
  { code: "garden-of-the-gods", name: "Garden of the Gods", state: "Colorado", fact: "Eroded sandstone formations expose the region's long geologic history.", lat: 38.8678, lon: -104.8911 },
  { code: "wakulla-springs", name: "Wakulla Springs", state: "Florida", fact: "A large freshwater spring fed by an extensive underground cave system.", lat: 30.2336, lon: -84.3053 },
  { code: "okefenokee-swamp", name: "Okefenokee Swamp", state: "Georgia", fact: "A vast peat-filled wetland that supports distinctive swamp habitats and wildlife.", lat: 30.6167, lon: -82.3167 },
  { code: "diamond-head", name: "Diamond Head", wikipediaTitle: "Diamond Head, Hawaii", state: "Hawaii", fact: "A volcanic tuff cone formed during a late stage of Oʻahu's volcanic activity.", x: 290, y: 662 },
  { code: "great-rift", name: "Great Rift System", wikipediaTitle: "Craters of the Moon National Monument and Preserve", state: "Idaho", fact: "A long volcanic fracture zone marked by lava flows, cones, and fissures.", lat: 43.4617, lon: -113.5628 },
  { code: "monument-rocks", name: "Monument Rocks Natural Area", wikipediaTitle: "Monument Rocks (Kansas)", state: "Kansas", fact: "Chalk formations preserve evidence of an ancient inland sea.", lat: 38.7906, lon: -100.7625 },
  { code: "red-river-gorge", name: "Red River Gorge", state: "Kentucky", fact: "Sandstone cliffs, arches, and valleys were carved by the Red River and its tributaries.", lat: 37.8339, lon: -83.6078 },
  { code: "mount-katahdin", name: "Mount Katahdin", wikipediaTitle: "Katahdin", state: "Maine", fact: "Maine's highest mountain has glacially sculpted cirques and alpine habitat.", lat: 45.9044, lon: -68.9213 },
  { code: "porcupine-mountains", name: "Porcupine Mountain", wikipediaTitle: "Porcupine Mountains", state: "Michigan", fact: "The Lake Superior highlands contain extensive old-growth northern forest.", lat: 46.7542, lon: -89.79 },
  { code: "itasca-natural-area", name: "Itasca Natural Area", wikipediaTitle: "Itasca State Park", state: "Minnesota", fact: "Forest and lakes near the headwaters of the Mississippi River preserve a northern landscape.", lat: 47.2397, lon: -95.2075 },
  { code: "hell-creek", name: "Hell Creek Fossil Area", wikipediaTitle: "Hell Creek Formation", state: "Montana", fact: "Late Cretaceous rocks here preserve dinosaur fossils from near the end of their era.", lat: 46.15, lon: -107.48 },
  { code: "ashfall-fossil-beds", name: "Ashfall Fossil Beds", state: "Nebraska", fact: "Volcanic ash buried and preserved animals at an ancient watering hole.", lat: 42.425, lon: -98.1586 },
  { code: "valley-of-fire", name: "Valley of Fire", wikipediaTitle: "Valley of Fire State Park", state: "Nevada", fact: "Red sandstone outcrops reveal ancient dunes shaped by erosion.", lat: 36.4722, lon: -114.5375 },
  { code: "albany-pine-bush", name: "Albany Pine Bush", state: "New York", fact: "An inland pine barrens ecosystem grows on sand left by ancient glacial Lake Albany.", lat: 42.7183, lon: -73.8644 },
  { code: "newberry-crater", name: "Newberry Crater", wikipediaTitle: "Newberry National Volcanic Monument", state: "Oregon", fact: "A volcanic caldera with lakes, lava flows, and other evidence of repeated eruptions.", lat: 43.6942, lon: -121.2519 },
  { code: "enchanted-rock", name: "Enchanted Rock", state: "Texas", fact: "A massive exposed granite dome rises above the surrounding Hill Country.", lat: 30.5066, lon: -98.8189 },
  { code: "mima-mounds", name: "Mima Mounds", state: "Washington", fact: "Thousands of rounded earth mounds form a distinctive prairie landscape.", lat: 46.8986, lon: -123.0505 },
];

// Familiar places selected from USA-Ecke's Famous Places list, plus three
// additional icons. Coordinates indicate a representative point for places
// that cover a larger area.
const FAMOUS_PLACES = [
  { code: "monument-valley", name: "Monument Valley", wikipediaTitle: "Monument Valley", state: "Arizona and Utah", fact: "The marker sits near the valley's visitor center, among its famous sandstone buttes.", lat: 36.998, lon: -110.099 },
  { code: "delicate-arch", name: "Delicate Arch", state: "Utah", fact: "This freestanding sandstone arch is a symbol of Utah's Arches National Park.", lat: 38.7436, lon: -109.4993 },
  { code: "grand-canyon", name: "Grand Canyon", wikipediaTitle: "Grand Canyon", state: "Arizona", fact: "The marker is at Mather Point on the South Rim, overlooking the canyon carved by the Colorado River.", lat: 36.0619, lon: -112.1093 },
  { code: "yellowstone", name: "Yellowstone", wikipediaTitle: "Yellowstone National Park", state: "Wyoming, Montana, and Idaho", fact: "The marker is at Old Faithful, one of Yellowstone's best-known geysers.", lat: 44.4605, lon: -110.8281 },
  { code: "everglades", name: "Everglades", wikipediaTitle: "Everglades National Park", state: "Florida", fact: "The marker is at the park's Gulf Coast entrance, one gateway to the vast wetland.", lat: 25.847, lon: -81.386 },
  { code: "yosemite", name: "Yosemite", wikipediaTitle: "Yosemite National Park", state: "California", fact: "The marker is in Yosemite Valley, known for granite cliffs and waterfalls.", lat: 37.7456, lon: -119.5936 },
  { code: "golden-gate-bridge", name: "Golden Gate Bridge", state: "California", fact: "The suspension bridge spans the Golden Gate strait at San Francisco.", lat: 37.8199, lon: -122.4783 },
  { code: "hollywood-sign", name: "Hollywood Sign", wikipediaTitle: "Hollywood Sign", state: "California", fact: "The hillside sign has become a familiar symbol of Los Angeles and its film industry.", lat: 34.1341, lon: -118.3215 },
  { code: "las-vegas", name: "Las Vegas", state: "Nevada", fact: "The marker is on the Las Vegas Strip, known for its resort hotels and bright lights.", lat: 36.1147, lon: -115.1728 },
  { code: "white-house", name: "White House", wikipediaTitle: "White House", state: "Washington, D.C.", fact: "The White House is the official residence and workplace of the U.S. president.", lat: 38.8977, lon: -77.0365 },
  { code: "graceland", name: "Graceland", state: "Tennessee", fact: "Elvis Presley's former home is now a museum in Memphis.", lat: 35.0461, lon: -90.0236 },
  { code: "ocean-drive", name: "Ocean Drive", wikipediaTitle: "Ocean Drive (South Beach)", state: "Florida", fact: "The marker is on Miami Beach's Ocean Drive, known for its Art Deco buildings.", lat: 25.7825, lon: -80.1301 },
  { code: "disney-world", name: "Walt Disney World", wikipediaTitle: "Walt Disney World", state: "Florida", fact: "The marker is at Magic Kingdom, one of the resort's theme parks near Orlando.", lat: 28.4177, lon: -81.5812 },
  { code: "key-west", name: "Key West", state: "Florida", fact: "The marker is near the Southernmost Point buoy at the end of the Florida Keys.", lat: 24.5465, lon: -81.7975 },
  { code: "mount-rushmore", name: "Mount Rushmore", wikipediaTitle: "Mount Rushmore", state: "South Dakota", fact: "Four U.S. presidents are carved into the granite face of Mount Rushmore.", lat: 43.8791, lon: -103.4591 },
  { code: "the-alamo", name: "The Alamo", wikipediaTitle: "Alamo Mission", state: "Texas", fact: "This former mission in San Antonio is remembered for the 1836 Battle of the Alamo.", lat: 29.4259, lon: -98.4861 },
  { code: "one-world-trade-center", name: "One World Trade Center", state: "New York", fact: "The skyscraper stands at the World Trade Center site in Lower Manhattan.", lat: 40.713, lon: -74.0132 },
  { code: "space-needle", name: "Space Needle", state: "Washington", fact: "This observation tower was built for the 1962 World's Fair in Seattle.", lat: 47.6205, lon: -122.3493 },
  { code: "gateway-arch", name: "Gateway Arch", state: "Missouri", fact: "The stainless-steel arch rises beside the Mississippi River in St. Louis.", lat: 38.6247, lon: -90.1848 },
  { code: "uss-arizona-memorial", name: "USS Arizona Memorial", state: "Hawaii", fact: "The memorial at Pearl Harbor spans the sunken USS Arizona and honors those killed in the 1941 attack.", x: 289, y: 662 },
];

const els = {
  map: document.getElementById("usMap"),
  riversLayer: document.getElementById("riversLayer"),
  mountainsLayer: document.getElementById("mountainsLayer"),
  landmarksLayer: document.getElementById("landmarksLayer"),
  naturalLandmarksLayer: document.getElementById("naturalLandmarksLayer"),
  famousPlacesLayer: document.getElementById("famousPlacesLayer"),
  landmarkMapHint: document.getElementById("landmarkMapHint"),
  landmarkInfo: document.getElementById("landmarkInfo"),
  landmarkInfoClose: document.getElementById("landmarkInfoClose"),
  landmarkInfoImage: document.getElementById("landmarkInfoImage"),
  landmarkInfoName: document.getElementById("landmarkInfoName"),
  landmarkInfoState: document.getElementById("landmarkInfoState"),
  landmarkInfoFact: document.getElementById("landmarkInfoFact"),
  landmarkInfoWikipedia: document.getElementById("landmarkInfoWikipedia"),
  mountainInfo: document.getElementById("mountainInfo"),
  mountainInfoName: document.getElementById("mountainInfoName"),
  mountainInfoRegion: document.getElementById("mountainInfoRegion"),
  mountainInfoPeak: document.getElementById("mountainInfoPeak"),
  riverInfo: document.getElementById("riverInfo"),
  riverInfoName: document.getElementById("riverInfoName"),
  riverInfoLength: document.getElementById("riverInfoLength"),
  riverInfoSystemLength: document.getElementById("riverInfoSystemLength"),
  toast: document.getElementById("toast"),
  quizBanner: document.getElementById("quizBanner"),
  quizBannerLine: document.getElementById("quizBannerLine"),
  quizBannerMsg: document.getElementById("quizBannerMsg"),
  bannerText: document.getElementById("quizBannerText"),
  bannerNextBtn: document.getElementById("bannerNextBtn"),
  bannerRestartBtn: document.getElementById("bannerRestartBtn"),
  learnBannerFlagWrap: document.getElementById("learnBannerFlagWrap"),
  learnBannerFlagImg: document.getElementById("learnBannerFlagImg"),
  targetState: document.getElementById("targetState"),
  hint: document.getElementById("hint"),
  score: document.getElementById("score"),
  round: document.getElementById("round"),
  totalRounds: document.getElementById("totalRounds"),
  roundCount: document.getElementById("roundCount"),
  capitalOptionCount: document.getElementById("capitalOptionCount"),
  autoNext: document.getElementById("autoNext"),
  modeToggle: document.getElementById("modeToggle"),
  startBtn: document.getElementById("startBtn"),
  nextBtn: document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  endScreen: document.getElementById("endScreen"),
  finalScore: document.getElementById("finalScore"),
  promptLine: document.getElementById("promptLine"),
  learnFlagWrap: document.getElementById("learnFlagWrap"),
  learnFlagImg: document.getElementById("learnFlagImg"),
  quizOnly: Array.from(document.querySelectorAll("[data-quiz-only]")),
  capitalOnly: Array.from(document.querySelectorAll("[data-capital-only]")),
  learnOnly: Array.from(document.querySelectorAll("[data-learn-only]")),
  capitalQuiz: document.getElementById("capitalQuiz"),
  capitalQuestion: document.getElementById("capitalQuestion"),
  capitalOptions: document.getElementById("capitalOptions"),
  flagOptions: document.getElementById("flagOptions"),
  flagQuiz: document.getElementById("flagQuiz"),
  flagQuestion: document.getElementById("flagQuestion"),
  flagSizeSelect: document.getElementById("flagSizeSelect"),
};

function findStateByCode(code) {
  return STATES.find((s) => s.code === code) ?? null;
}

function landmarkMapPoint(landmark) {
  if (Number.isFinite(landmark.x) && Number.isFinite(landmark.y)) return landmark;
  // Same lower-48 Albers fit used by scripts/position-capitals.py.
  const lat = (landmark.lat * Math.PI) / 180;
  const lon = (landmark.lon * Math.PI) / 180;
  const first = (29.5 * Math.PI) / 180;
  const second = (45.5 * Math.PI) / 180;
  const n = (Math.sin(first) + Math.sin(second)) / 2;
  const c = Math.cos(first) ** 2 + 2 * n * Math.sin(first);
  const rho = Math.sqrt(c - 2 * n * Math.sin(lat)) / n;
  const theta = n * (lon + (96 * Math.PI) / 180);
  return { x: 1215.880639934648 * rho * Math.sin(theta) + 481.2076806247704,
    y: -1219.3891356978904 * -rho * Math.cos(theta) - 1132.5252724742165 };
}

function renderLandmarkMarkers(landmarks, layer) {
  if (!layer) return;
  const svgNS = "http://www.w3.org/2000/svg";
  for (const landmark of landmarks) {
    const { x, y } = landmarkMapPoint(landmark);
    const marker = document.createElementNS(svgNS, "g");
    marker.setAttribute("class", "landmark");
    marker.setAttribute("data-landmark", landmark.code);
    marker.setAttribute("role", "button");
    marker.setAttribute("tabindex", "0");
    marker.setAttribute("aria-label", landmark.name);
    const dot = document.createElementNS(svgNS, "circle");
    dot.setAttribute("class", "landmark-dot");
    dot.setAttribute("cx", x.toFixed(1));
    dot.setAttribute("cy", y.toFixed(1));
    dot.setAttribute("r", "6");
    const hit = document.createElementNS(svgNS, "circle");
    hit.setAttribute("class", "landmark-hit");
    hit.setAttribute("cx", x.toFixed(1));
    hit.setAttribute("cy", y.toFixed(1));
    hit.setAttribute("r", "13");
    marker.append(dot, hit);
    layer.appendChild(marker);
  }
}

function setQuizUIVisible(visible) {
  // Quiz mode: show start, next, restart
  ["startBtn", "nextBtn", "restartBtn"].forEach((id) => {
    const btn = els[id];
    if (btn) btn.classList.toggle("hidden", !visible);
  });
  els.map?.classList.toggle("hidden", !visible);
}

function setCapitalUIVisible(visible) {
  // Capital mode: show start, next, restart, and capitalQuiz
  ["startBtn", "nextBtn", "restartBtn"].forEach((id) => {
    const btn = els[id];
    if (btn) btn.classList.toggle("hidden", !visible);
  });
  els.map?.classList.toggle("hidden", !visible);
  if (els.capitalQuiz) els.capitalQuiz.classList.toggle("hidden", !visible);
}

function setLearnUIVisible(visible) {
  // Learn mode: hide all control buttons
  ["startBtn", "nextBtn", "restartBtn"].forEach((id) => {
    const btn = els[id];
    if (btn) btn.classList.toggle("hidden", visible);
  });
  els.map?.classList.toggle("hidden", !visible);
}

function setFlagQuizUIVisible(visible) {
  els.map?.classList.toggle("hidden", visible);
  els.flagQuiz?.classList.toggle("hidden", !visible);
}

function setNextEnabled(enabled) {
  els.nextBtn.disabled = !enabled;
  if (els.bannerNextBtn) els.bannerNextBtn.disabled = !enabled;
}

let toastTimer = null;

function showToast(text, flagSrc = null, flagAlt = "") {
  if (!els.toast) return;

  if (toastTimer) {
    window.clearTimeout(toastTimer);
    toastTimer = null;
  }

  els.toast.textContent = "";
  if (flagSrc) {
    const img = document.createElement("img");
    img.src = flagSrc;
    img.alt = flagAlt;
    els.toast.appendChild(img);
  }
  // Replace \n with <br> and set as HTML
  const htmlText = text.replace(/\n/g, "<br>");
  const span = document.createElement("span");
  span.innerHTML = htmlText;
  els.toast.appendChild(span);

  els.toast.classList.remove("hidden");

  toastTimer = window.setTimeout(() => {
    els.toast.classList.add("hidden");
    toastTimer = null;
  }, 3000);
}

function hideToast() {
  if (!els.toast) return;
  els.toast.classList.add("hidden");
  if (toastTimer) {
    window.clearTimeout(toastTimer);
    toastTimer = null;
  }
}

let quizMsgTimer = null;

function showQuizMessage(text, kind = "neutral") {
  if (!els.quizBannerMsg) return;

  if (quizMsgTimer) {
    window.clearTimeout(quizMsgTimer);
    quizMsgTimer = null;
  }

  els.quizBannerMsg.textContent = text;
  els.quizBannerMsg.classList.remove("hidden", "good", "bad");
  if (kind === "good") els.quizBannerMsg.classList.add("good");
  if (kind === "bad") els.quizBannerMsg.classList.add("bad");

  quizMsgTimer = window.setTimeout(() => {
    els.quizBannerMsg.classList.add("hidden");
    els.quizBannerMsg.classList.remove("good", "bad");
    quizMsgTimer = null;
  }, 3000);
}

function hideQuizMessage() {
  if (!els.quizBannerMsg) return;

  if (quizMsgTimer) {
    window.clearTimeout(quizMsgTimer);
    quizMsgTimer = null;
  }
  els.quizBannerMsg.classList.add("hidden");
  els.quizBannerMsg.classList.remove("good", "bad");
}

function ensureLearnFlagsToggle() {
  if (els.showLearnFlagsToggle) return;

  const hintParent = els.hint?.parentElement ?? null;
  if (!hintParent) return;

  const id = "showLearnFlags";
  const wrap = document.createElement("label");
  wrap.className = "learn-flags-toggle";
  wrap.dataset.learnOnly = "";
  wrap.style.display = "inline-flex";
  wrap.style.alignItems = "center";
  wrap.style.gap = "0.5rem";
  wrap.style.userSelect = "none";
  wrap.style.marginTop = "0.5rem";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = id;
  input.checked = true;

  const text = document.createElement("span");
  text.textContent = "Show flags";

  // --- Capital toggle ---
  const capWrap = document.createElement("label");
  capWrap.className = "learn-capital-toggle";
  capWrap.style.display = "inline-flex";
  capWrap.style.alignItems = "center";
  capWrap.style.gap = "0.5rem";
  capWrap.style.userSelect = "none";
  capWrap.style.marginLeft = "1.5rem";

  const capInput = document.createElement("input");
  capInput.type = "checkbox";
  capInput.id = "showLearnCapital";
  capInput.checked = true;

  const capText = document.createElement("span");
  capText.textContent = "Show capital";

  capWrap.appendChild(capInput);
  capWrap.appendChild(capText);

  wrap.appendChild(input);
  wrap.appendChild(text);
  wrap.appendChild(capWrap);
  hintParent.appendChild(wrap);

  els.showLearnFlagsToggle = input;
  els.showLearnCapitalToggle = capInput;
}

function removeLearnFlagsToggle() {
  if (!els.showLearnFlagsToggle && !els.showLearnCapitalToggle) return;
  const wrap = els.showLearnFlagsToggle?.parentElement;
  if (wrap) wrap.remove();
  els.showLearnFlagsToggle = undefined;
  els.showLearnCapitalToggle = undefined;
}

function updateQuizBanner(currentState) {
  if (!els.quizBanner || !els.quizBannerLine) return;

  const isQuiz = currentState === QuizState;
  const isRiver = currentState === RiverState;
  const isMountain = currentState === MountainState;
  const isLandmark = currentState === LandmarkState;
  const isNaturalLandmark = currentState === NaturalLandmarkState;
  const isFamousPlace = currentState === FamousPlaceState;
  const isCapital = currentState === CapitalState;

  const show =
    (isQuiz || isRiver || isMountain || isLandmark || isNaturalLandmark || isFamousPlace || isCapital) && round > 0 && totalRounds > 0 && target;
  els.quizBanner.classList.toggle("hidden", !show);

  if (!show) return;

  const safeTotal = Number.isFinite(totalRounds) ? totalRounds : 0;
  let line = "";
  if (isQuiz || isRiver || isMountain || isLandmark || isNaturalLandmark || isFamousPlace) {
    line = `Round ${round}/${safeTotal}: Find ${target.name}`;
  } else if (isCapital) {
    // Show all capital options in the banner as clickable buttons
    let options = "";
    if (capitalOptions && capitalOptions.length > 0) {
      options = capitalOptions
        .map((s) => {
          return `<button class="capitalOptionBtn banner" type="button" data-capital="${encodeURIComponent(s.capital)}"${inRound && !capitalAnswered ? "" : " disabled"}>${s.capital}</button>`;
        })
        .join("  ");
    }
    line = `Round ${round}/${safeTotal}: Guess the capital of ${target.name} — [ ${options} ]`;
  }
  if (els.bannerText) els.bannerText.innerHTML = line;
  else els.quizBannerLine.innerHTML = line;

  // Attach click handlers for banner capital buttons (only in capital mode)
  if (
    isCapital &&
    capitalOptions &&
    capitalOptions.length > 0 &&
    inRound &&
    !capitalAnswered
  ) {
    const bannerBtns = (els.bannerText || els.quizBannerLine).querySelectorAll(
      ".capitalOptionBtn.banner",
    );
    bannerBtns.forEach((btn) => {
      btn.onclick = () => {
        const cap = decodeURIComponent(btn.getAttribute("data-capital"));
        const state = capitalOptions.find((s) => s.capital === cap);
        if (state) stateMachine.handle("handleCapitalOptionClick", state, btn);
      };
    });
  }
}

function resetStateClasses() {
  if (!els.map) return;
  els.map.querySelectorAll(".state").forEach((el) => {
    el.classList.remove("correct", "wrong");
  });
}

function resetRiverClasses() {
  els.riversLayer?.querySelectorAll(".river").forEach((el) => {
    el.classList.remove("correct", "wrong", "learned");
  });
}

function resetMountainClasses() {
  els.mountainsLayer?.querySelectorAll(".mountain").forEach((el) => {
    el.classList.remove("correct", "wrong", "learned");
  });
}

function resetLandmarkClasses(layer) {
  layer?.querySelectorAll(".landmark").forEach((el) => {
    el.classList.remove("correct", "wrong", "learned");
  });
}

function hideLandmarkInfo() {
  els.landmarkInfo?.classList.add("hidden");
  if (els.landmarkInfoImage) els.landmarkInfoImage.removeAttribute("src");
}

function showLandmarkInfo(landmark, imageDirectory) {
  if (!els.landmarkInfo) return;
  els.landmarkInfoName.textContent = landmark.name;
  els.landmarkInfoState.textContent = landmark.state;
  els.landmarkInfoFact.textContent = landmark.fact;
  const title = landmark.wikipediaTitle ?? landmark.name;
  els.landmarkInfoWikipedia.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  els.landmarkInfoImage.src = `assets/${imageDirectory}/${landmark.code}.jpg`;
  els.landmarkInfoImage.alt = `Photo of ${landmark.name}`;
  els.landmarkInfo.classList.remove("hidden");
}

function nearestRiverAt(clientX, clientY) {
  let nearest = null;
  let shortestDistance = Infinity;
  els.riversLayer?.querySelectorAll(".river").forEach((river) => {
    const path = river.querySelector(".river-line");
    const matrix = path?.getScreenCTM();
    if (!matrix) return;
    const length = path.getTotalLength();
    const steps = Math.max(1, Math.ceil(length / 3));
    for (let i = 0; i <= steps; i += 1) {
      const point = path.getPointAtLength((length * i) / steps);
      const x = point.x * matrix.a + point.y * matrix.c + matrix.e;
      const y = point.x * matrix.b + point.y * matrix.d + matrix.f;
      const distance = (x - clientX) ** 2 + (y - clientY) ** 2;
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = river;
      }
    }
  });
  return nearest;
}

function nearestMountainAt(clientX, clientY) {
  let nearest = null;
  let shortestDistance = Infinity;
  els.mountainsLayer?.querySelectorAll(".mountain").forEach((mountain) => {
    const path = mountain.querySelector(".mountain-line");
    const matrix = path?.getScreenCTM();
    if (!matrix) return;
    const length = path.getTotalLength();
    const steps = Math.max(1, Math.ceil(length / 3));
    for (let i = 0; i <= steps; i += 1) {
      const point = path.getPointAtLength((length * i) / steps);
      const x = point.x * matrix.a + point.y * matrix.c + matrix.e;
      const y = point.x * matrix.b + point.y * matrix.d + matrix.f;
      const distance = (x - clientX) ** 2 + (y - clientY) ** 2;
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = mountain;
      }
    }
  });
  return nearest;
}

function hideMountainInfo() {
  els.mountainInfo?.classList.add("hidden");
  if (els.mountainInfoName) els.mountainInfoName.textContent = "";
  if (els.mountainInfoRegion) els.mountainInfoRegion.textContent = "";
  if (els.mountainInfoPeak) els.mountainInfoPeak.textContent = "";
}

function formatMountainElevation(feet) {
  return `${feet.toLocaleString("en-US")} ft (${Math.round(feet * 0.3048).toLocaleString("en-US")} m)`;
}

function hideRiverInfo() {
  els.riverInfo?.classList.add("hidden");
  if (els.riverInfoName) els.riverInfoName.textContent = "";
  if (els.riverInfoLength) els.riverInfoLength.textContent = "";
  if (els.riverInfoSystemLength) {
    els.riverInfoSystemLength.textContent = "";
    els.riverInfoSystemLength.classList.add("hidden");
  }
}

function formatRiverLength(miles) {
  return `${miles.toLocaleString("en-US")} mi (${Math.round(miles * 1.609344).toLocaleString("en-US")} km)`;
}

function setHint(text, kind = "neutral") {
  if (!els.hint) return;
  els.hint.textContent = text;
  els.hint.classList.remove("good", "bad");
  if (kind === "good") els.hint.classList.add("good");
  if (kind === "bad") els.hint.classList.add("bad");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateRoundCountOptions(mode) {
  if (!els.roundCount) return;
  const availableCount = mode === "river" ? RIVERS.length : mode === "mountain" ? MOUNTAINS.length : mode === "landmark" ? LANDMARKS.length : mode === "natural-landmark" ? NATURAL_LANDMARKS.length : mode === "famous-place" ? FAMOUS_PLACES.length : Infinity;
  const options = Array.from(els.roundCount.options);
  const selectedCount = Number.parseInt(els.roundCount.value, 10);
  for (const option of options) {
    const unavailable = Number(option.value) > availableCount || (option.value === "12" && mode !== "mountain");
    option.hidden = unavailable;
    option.disabled = unavailable;
  }
  if (selectedCount === 12 && mode !== "mountain") {
    els.roundCount.value = String(DEFAULT_TOTAL_ROUNDS);
  } else if (selectedCount > availableCount) {
    const largestAvailable = options
      .filter((option) => !option.disabled)
      .at(-1);
    if (largestAvailable) els.roundCount.value = largestAvailable.value;
  }
}
// State Machine for Quiz Modes

class StateMachine {
  constructor(states, initial) {
    this.states = states;
    this.current = null;
    this.setState(initial);
  }
  setState(name) {
    if (this.current && this.current.exit) this.current.exit();
    this.current = this.states[name];
    updateRoundCountOptions(name);
    if (this.current && this.current.enter) this.current.enter();
    els.riversLayer?.classList.toggle("hidden", name !== "river");
    els.mountainsLayer?.classList.toggle("hidden", name !== "mountain");
    els.landmarksLayer?.classList.toggle("hidden", name !== "landmark");
    els.naturalLandmarksLayer?.classList.toggle("hidden", name !== "natural-landmark");
    els.famousPlacesLayer?.classList.toggle("hidden", name !== "famous-place");
    const landmarkMode = name === "landmark" || name === "natural-landmark" || name === "famous-place";
    els.map?.classList.toggle("landmark-mode", landmarkMode);
    els.map?.parentElement?.classList.toggle("landmark-map", landmarkMode);
    els.landmarkMapHint?.classList.toggle("hidden", !landmarkMode);
  }
  handle(event, ...args) {
    if (this.current && this.current[event]) {
      return this.current[event](...args);
    }
  }
}

// Shared state
let totalRounds = DEFAULT_TOTAL_ROUNDS;
els.totalRounds.textContent = String(totalRounds);
let round = 0;
let score = 0;
let target = null;
let inRound = false;
let remaining = [];
let capitalOptions = [];
let capitalAnswered = false;
let riverTurn = 0;
let mountainTurn = 0;

// --- State definitions ---

const QuizState = {
  enter() {
    resetStateClasses();
    hideToast();
    hideQuizMessage();
    setNextEnabled(false);
    inRound = false;
    target = null;
    remaining = [];
    round = 0;
    capitalOptions = [];
    capitalAnswered = false;
    els.learnFlagWrap?.classList.add("hidden");
    if (els.learnFlagImg) {
      els.learnFlagImg.src = "";
      els.learnFlagImg.alt = "";
    }
    els.learnBannerFlagWrap?.classList.add("hidden");
    if (els.learnBannerFlagImg) {
      els.learnBannerFlagImg.src = "";
      els.learnBannerFlagImg.alt = "";
    }
    updateQuizBanner(this);
    setCapitalUIVisible(false);
    setLearnUIVisible(false);
    setFlagQuizUIVisible(false);
    setQuizUIVisible(true);
    removeLearnFlagsToggle();
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0) {
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    }
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Pick the correct state on the map.");
    els.startBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    setNextEnabled(false);
  },
  start() {
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    hideQuizMessage();
    setNextEnabled(false);
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    const available = STATES.filter((s) =>
      els.map.querySelector(`#${CSS.escape(s.code)}`),
    );
    totalRounds = Math.min(totalRounds, available.length);
    els.totalRounds.textContent = String(totalRounds);
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.startBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
    remaining = shuffle([...available]);
    if (remaining.length === 0) {
      setHint("No clickable states found in the SVG.", "bad");
      els.startBtn.disabled = false;
      return;
    }
    this.next();
  },
  next() {
    resetStateClasses();
    hideQuizMessage();
    if (round >= totalRounds || remaining.length === 0) {
      this.end();
      return;
    }
    round += 1;
    inRound = true;
    els.round.textContent = String(round);
    setNextEnabled(false);
    target = remaining.pop();
    els.targetState.textContent = "—";
    setHint("Click the correct state on the map.");
    updateQuizBanner(this); // <-- Move this after target is set
  },
  end() {
    inRound = false;
    target = null;
    els.targetState.textContent = "—";
    setNextEnabled(false);
    els.startBtn.disabled = false;
    els.finalScore.textContent = String(score);
    els.endScreen.classList.remove("hidden");
    setHint("Game finished.", "neutral");
    hideQuizMessage();
    updateQuizBanner(this);
    if (els.capitalQuiz) els.capitalQuiz.classList.add("hidden");
  },
  handleMapClick(el) {
    if (!inRound || !target) return;
    const clickedCode = el.id;
    const correctCode = target.code;
    inRound = false;
    const isCorrect = clickedCode === correctCode;
    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
      el.classList.add("correct");
      setHint("Correct!", "good");
      showQuizMessage("Correct!", "good");
    } else {
      el.classList.add("wrong");
      const correctEl = els.map.querySelector(`#${CSS.escape(correctCode)}`);
      if (correctEl) correctEl.classList.add("correct");
      const clicked = findStateByCode(clickedCode);
      const clickedName = clicked ? clicked.name : clickedCode;
      setHint(`Wrong. That was ${clickedName}.`, "bad");
      showQuizMessage(`Wrong, that was ${clickedName}.`, "bad");
    }
    setNextEnabled(true);
    if (isCorrect && els.autoNext?.checked) {
      window.setTimeout(() => {
        if (stateMachine.current !== QuizState) return;
        if (inRound) return;
        if (!target) return;
        stateMachine.handle("next");
      }, 1500);
    }
  },
};

const RiverState = {
  enter() {
    riverTurn += 1;
    resetStateClasses();
    resetRiverClasses();
    hideRiverInfo();
    hideToast();
    hideQuizMessage();
    score = 0;
    inRound = false;
    target = null;
    remaining = [];
    round = 0;
    setNextEnabled(false);
    updateQuizBanner(this);
    setCapitalUIVisible(false);
    setLearnUIVisible(false);
    setFlagQuizUIVisible(false);
    setQuizUIVisible(true);
    removeLearnFlagsToggle();
    els.learnFlagWrap?.classList.add("hidden");
    els.learnBannerFlagWrap?.classList.add("hidden");
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    totalRounds = Math.min(totalRounds, RIVERS.length);
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Click a river to see its name and length, or press Start.");
    els.startBtn.disabled = false;
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
  },
  exit() {
    hideRiverInfo();
    resetRiverClasses();
  },
  start() {
    riverTurn += 1;
    resetRiverClasses();
    hideRiverInfo();
    hideQuizMessage();
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    const available = RIVERS.filter((river) =>
      els.riversLayer?.querySelector(`[data-river="${river.code}"]`),
    );
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    totalRounds = Math.min(totalRounds, available.length);
    els.totalRounds.textContent = String(totalRounds);
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.endScreen.classList.add("hidden");
    setNextEnabled(false);
    remaining = shuffle([...available]);
    if (remaining.length === 0) {
      setHint("No clickable rivers found in the SVG.", "bad");
      return;
    }
    els.startBtn.disabled = true;
    this.next();
  },
  next() {
    riverTurn += 1;
    resetRiverClasses();
    hideQuizMessage();
    if (round >= totalRounds || remaining.length === 0) {
      this.end();
      return;
    }
    round += 1;
    inRound = true;
    target = remaining.pop();
    els.round.textContent = String(round);
    els.targetState.textContent = target.name;
    setNextEnabled(false);
    setHint("Click the correct river on the map.");
    updateQuizBanner(this);
  },
  end() {
    inRound = false;
    target = null;
    els.targetState.textContent = "—";
    setNextEnabled(false);
    els.startBtn.disabled = false;
    els.finalScore.textContent = String(score);
    els.endScreen.classList.remove("hidden");
    setHint("Game finished. Click a river to learn its length, or Restart.");
    updateQuizBanner(this);
  },
  handleRiverClick(el) {
    if (!target) {
      const river = RIVERS.find(
        (item) => item.code === el.getAttribute("data-river"),
      );
      if (!river) return;
      resetRiverClasses();
      el.classList.add("learned");
      els.riverInfoName.textContent = river.name;
      if (river.namedLengthMiles) {
        els.riverInfoLength.textContent = `Named river: approx. ${formatRiverLength(river.namedLengthMiles)}`;
        els.riverInfoSystemLength.textContent = `River system: approx. ${formatRiverLength(river.lengthMiles)}`;
        els.riverInfoSystemLength.classList.remove("hidden");
      } else {
        els.riverInfoLength.textContent = `Source-to-mouth system: approx. ${formatRiverLength(river.lengthMiles)}`;
        els.riverInfoSystemLength.textContent = "";
        els.riverInfoSystemLength.classList.add("hidden");
      }
      els.riverInfo.classList.remove("hidden");
      return;
    }
    if (!inRound || !target) return;
    const clickedCode = el.getAttribute("data-river");
    const isCorrect = clickedCode === target.code;
    inRound = false;
    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
      el.classList.add("correct");
      setHint("Correct!", "good");
      showQuizMessage("Correct!", "good");
    } else {
      el.classList.add("wrong");
      els.riversLayer
        ?.querySelector(`[data-river="${target.code}"]`)
        ?.classList.add("correct");
      const clickedName = RIVERS.find((river) => river.code === clickedCode)?.name;
      setHint(`Wrong. That was ${clickedName}.`, "bad");
      showQuizMessage(`Wrong, that was ${clickedName}.`, "bad");
    }
    setNextEnabled(true);
    if (isCorrect && els.autoNext?.checked) {
      const answeredTurn = riverTurn;
      window.setTimeout(() => {
        if (stateMachine.current !== RiverState || riverTurn !== answeredTurn)
          return;
        if (inRound || !target) return;
        this.next();
      }, 1500);
    }
  },
};

const MountainState = {
  enter() {
    mountainTurn += 1;
    resetStateClasses();
    resetMountainClasses();
    hideMountainInfo();
    hideToast();
    hideQuizMessage();
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    remaining = [];
    setNextEnabled(false);
    updateQuizBanner(this);
    setCapitalUIVisible(false);
    setLearnUIVisible(false);
    setFlagQuizUIVisible(false);
    setQuizUIVisible(true);
    removeLearnFlagsToggle();
    els.learnFlagWrap?.classList.add("hidden");
    els.learnBannerFlagWrap?.classList.add("hidden");
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    totalRounds = Math.min(totalRounds, MOUNTAINS.length);
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Click a mountain range to see its location and a notable summit, or press Start.");
    els.startBtn.disabled = false;
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
  },
  exit() {
    mountainTurn += 1;
    hideMountainInfo();
    resetMountainClasses();
  },
  start() {
    mountainTurn += 1;
    resetMountainClasses();
    hideMountainInfo();
    hideQuizMessage();
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    const available = MOUNTAINS.filter((mountain) =>
      els.mountainsLayer?.querySelector(`[data-mountain="${mountain.code}"]`),
    );
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    totalRounds = Math.min(totalRounds, available.length);
    els.totalRounds.textContent = String(totalRounds);
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.endScreen.classList.add("hidden");
    setNextEnabled(false);
    remaining = shuffle([...available]);
    if (remaining.length === 0) {
      setHint("No clickable mountain ranges found in the SVG.", "bad");
      return;
    }
    els.startBtn.disabled = true;
    this.next();
  },
  next() {
    mountainTurn += 1;
    resetMountainClasses();
    hideQuizMessage();
    if (round >= totalRounds || remaining.length === 0) {
      this.end();
      return;
    }
    round += 1;
    inRound = true;
    target = remaining.pop();
    els.round.textContent = String(round);
    els.targetState.textContent = target.name;
    setNextEnabled(false);
    setHint("Click the correct mountain range on the map.");
    updateQuizBanner(this);
  },
  end() {
    inRound = false;
    target = null;
    els.targetState.textContent = "—";
    setNextEnabled(false);
    els.startBtn.disabled = false;
    els.finalScore.textContent = String(score);
    els.endScreen.classList.remove("hidden");
    setHint("Game finished. Click a range to learn about it, or Restart.");
    updateQuizBanner(this);
  },
  handleMountainClick(el) {
    const clickedCode = el.getAttribute("data-mountain");
    if (!target) {
      const mountain = MOUNTAINS.find((item) => item.code === clickedCode);
      if (!mountain) return;
      resetMountainClasses();
      el.classList.add("learned");
      els.mountainInfoName.textContent = mountain.name;
      els.mountainInfoRegion.textContent = `Location: ${mountain.region}`;
      els.mountainInfoPeak.textContent = `Notable summit: ${mountain.peak} — approx. ${formatMountainElevation(mountain.peakFeet)}`;
      els.mountainInfo.classList.remove("hidden");
      return;
    }
    if (!inRound) return;
    const isCorrect = clickedCode === target.code;
    inRound = false;
    if (isCorrect) {
      score += 1;
      els.score.textContent = String(score);
      el.classList.add("correct");
      setHint("Correct!", "good");
      showQuizMessage("Correct!", "good");
    } else {
      el.classList.add("wrong");
      els.mountainsLayer
        ?.querySelector(`[data-mountain="${target.code}"]`)
        ?.classList.add("correct");
      const clickedName = MOUNTAINS.find((item) => item.code === clickedCode)?.name;
      setHint(`Wrong. That was ${clickedName}.`, "bad");
      showQuizMessage(`Wrong, that was ${clickedName}.`, "bad");
    }
    setNextEnabled(true);
    if (isCorrect && els.autoNext?.checked) {
      const answeredTurn = mountainTurn;
      window.setTimeout(() => {
        if (stateMachine.current !== MountainState || mountainTurn !== answeredTurn)
          return;
        if (inRound || !target) return;
        this.next();
      }, 1500);
    }
  },
};

function createLandmarkState(landmarks, layer, imageDirectory, label) {
  let landmarkTurn = 0;
  return {
    enter() {
      landmarkTurn += 1;
      resetStateClasses();
      resetLandmarkClasses(layer);
      hideLandmarkInfo();
      hideToast();
      hideQuizMessage();
      score = 0;
      round = 0;
      inRound = false;
      target = null;
      remaining = [];
      setNextEnabled(false);
      updateQuizBanner(this);
      setCapitalUIVisible(false);
      setLearnUIVisible(false);
      setFlagQuizUIVisible(false);
      setQuizUIVisible(true);
      removeLearnFlagsToggle();
      els.learnFlagWrap?.classList.add("hidden");
      els.learnBannerFlagWrap?.classList.add("hidden");
      els.endScreen.classList.add("hidden");
      els.score.textContent = "0";
      totalRounds = Math.min(Number(els.roundCount?.value) || DEFAULT_TOTAL_ROUNDS, landmarks.length);
      els.totalRounds.textContent = String(totalRounds);
      els.round.textContent = "1";
      els.targetState.textContent = "—";
      setHint(`Click a marker to explore a ${label}, or press Start.`);
      els.startBtn.disabled = false;
      els.restartBtn.disabled = false;
      if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    },
    exit() {
      landmarkTurn += 1;
      hideLandmarkInfo();
      resetLandmarkClasses(layer);
    },
    start() {
      landmarkTurn += 1;
      resetLandmarkClasses(layer);
      hideLandmarkInfo();
      hideQuizMessage();
      score = 0;
      round = 0;
      inRound = false;
      target = null;
      const available = landmarks.filter((landmark) =>
        layer?.querySelector(`[data-landmark="${landmark.code}"]`),
      );
      totalRounds = Math.min(Number(els.roundCount?.value) || DEFAULT_TOTAL_ROUNDS, available.length);
      els.totalRounds.textContent = String(totalRounds);
      els.score.textContent = "0";
      els.round.textContent = "1";
      els.endScreen.classList.add("hidden");
      setNextEnabled(false);
      remaining = shuffle([...available]);
      if (!remaining.length) {
        setHint("No landmark markers found on the map.", "bad");
        return;
      }
      els.startBtn.disabled = true;
      this.next();
    },
    next() {
      landmarkTurn += 1;
      resetLandmarkClasses(layer);
      hideLandmarkInfo();
      hideQuizMessage();
      if (round >= totalRounds || !remaining.length) {
        this.end();
        return;
      }
      round += 1;
      inRound = true;
      target = remaining.pop();
      els.round.textContent = String(round);
      els.targetState.textContent = target.name;
      setNextEnabled(false);
      setHint("Click the correct landmark marker on the map.");
      updateQuizBanner(this);
    },
    end() {
      inRound = false;
      target = null;
      els.targetState.textContent = "—";
      setNextEnabled(false);
      els.startBtn.disabled = false;
      els.finalScore.textContent = String(score);
      els.endScreen.classList.remove("hidden");
      setHint(`Game finished. Click a marker to explore another ${label}, or Restart.`);
      updateQuizBanner(this);
    },
    handleLandmarkClick(el) {
      const code = el.getAttribute("data-landmark");
      const selected = landmarks.find((landmark) => landmark.code === code);
      if (!selected) return;
      if (!target) {
        resetLandmarkClasses(layer);
        el.classList.add("learned");
        showLandmarkInfo(selected, imageDirectory);
        return;
      }
      if (!inRound) {
        showLandmarkInfo(selected, imageDirectory);
        return;
      }
      const isCorrect = code === target.code;
      inRound = false;
      if (isCorrect) {
        score += 1;
        els.score.textContent = String(score);
        el.classList.add("correct");
        setHint("Correct!", "good");
        showQuizMessage("Correct!", "good");
      } else {
        el.classList.add("wrong");
        layer?.querySelector(`[data-landmark="${target.code}"]`)?.classList.add("correct");
        setHint(`Wrong. That was ${selected.name}. The correct marker is highlighted.`, "bad");
        showQuizMessage(`Wrong. That was ${selected.name}.`, "bad");
      }
      showLandmarkInfo(selected, imageDirectory);
      setNextEnabled(true);
      if (isCorrect && els.autoNext?.checked) {
        const answeredTurn = landmarkTurn;
        window.setTimeout(() => {
          if (stateMachine.current !== this || landmarkTurn !== answeredTurn) return;
          if (inRound || !target) return;
          this.next();
        }, 5000);
      }
    },
  };
}

const LandmarkState = createLandmarkState(LANDMARKS, els.landmarksLayer, "landmarks", "landmark");
const NaturalLandmarkState = createLandmarkState(NATURAL_LANDMARKS, els.naturalLandmarksLayer, "natural-landmarks", "natural landmark");
const FamousPlaceState = createLandmarkState(FAMOUS_PLACES, els.famousPlacesLayer, "famous-places", "famous place");

const CapitalState = {
  enter() {
    resetStateClasses();
    hideToast();
    hideQuizMessage();
    setNextEnabled(false);
    inRound = false;
    target = null;
    remaining = [];
    round = 0;
    capitalOptions = [];
    capitalAnswered = false;
    els.learnFlagWrap?.classList.add("hidden");
    if (els.learnFlagImg) {
      els.learnFlagImg.src = "";
      els.learnFlagImg.alt = "";
    }
    els.learnBannerFlagWrap?.classList.add("hidden");
    if (els.learnBannerFlagImg) {
      els.learnBannerFlagImg.src = "";
      els.learnBannerFlagImg.alt = "";
    }
    updateQuizBanner(this);
    setQuizUIVisible(false);
    setLearnUIVisible(false);
    setFlagQuizUIVisible(false);
    setCapitalUIVisible(true);
    removeLearnFlagsToggle();
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0) {
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    }
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Pick the correct capital for the state.");
    els.startBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    setNextEnabled(false);
    if (els.capitalQuiz) {
      els.capitalQuiz.classList.add("hidden");
      els.capitalQuestion.textContent = "";
      els.capitalOptions.innerHTML = "";
    }
  },
  start() {
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    capitalOptions = [];
    capitalAnswered = false;
    setNextEnabled(false);
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    els.totalRounds.textContent = String(totalRounds);
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.startBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
    remaining = shuffle([...STATES]);
    this.next();
  },
  next() {
    resetStateClasses();
    hideQuizMessage();
    if (round >= totalRounds || remaining.length === 0) {
      this.end();
      return;
    }
    round += 1;
    inRound = true;
    capitalAnswered = false;
    els.round.textContent = String(round);
    setNextEnabled(false);
    target = remaining.pop();
    // Highlight the state for which to guess the capital
    const stateEl = els.map.querySelector(`#${CSS.escape(target.code)}`);
    if (stateEl) stateEl.classList.add("correct");
    // Prepare options
    const optionCount = Math.max(2, Number(els.capitalOptionCount?.value) || 4);
    const wrongStates = shuffle(
      STATES.filter((s) => s.code !== target.code),
    ).slice(0, optionCount - 1);
    capitalOptions = shuffle([target, ...wrongStates]);
    els.nextBtn.disabled = true;
    updateQuizBanner(this);
  },
  end() {
    inRound = false;
    target = null;
    els.targetState.textContent = "—";
    setNextEnabled(false);
    els.startBtn.disabled = false;
    els.finalScore.textContent = String(score);
    els.endScreen.classList.remove("hidden");
    setHint("Game finished.", "neutral");
    hideQuizMessage();
    updateQuizBanner(this);
    if (els.capitalQuiz) els.capitalQuiz.classList.add("hidden");
  },
  handleCapitalOptionClick(selectedState, btn) {
    if (!inRound || capitalAnswered) return;
    capitalAnswered = true;
    inRound = false;
    // Mark all buttons in the main options area
    Array.from(els.capitalOptions.children).forEach((b) => {
      b.disabled = true;
      if (b.textContent === target.capital) {
        b.classList.add("correct");
      }
      if (b === btn && selectedState.capital !== target.capital) {
        b.classList.add("wrong");
      }
    });
    // Mark all banner buttons
    const bannerBtns = (els.bannerText || els.quizBannerLine).querySelectorAll(
      ".capitalOptionBtn.banner",
    );
    bannerBtns.forEach((b) => {
      b.disabled = true;
      if (b.textContent === target.capital) {
        b.classList.add("correct");
      }
      if (b === btn && selectedState.capital !== target.capital) {
        b.classList.add("wrong");
      }
    });
    if (selectedState.capital === target.capital) {
      score += 1;
      els.score.textContent = String(score);
      setHint("Correct!", "good");
      showQuizMessage("Correct!", "good");
    } else {
      setHint(`Wrong. The capital is ${target.capital}.`, "bad");
      showQuizMessage(`Wrong, the capital is ${target.capital}.`, "bad");
    }
    setNextEnabled(true);
    els.nextBtn.disabled = false;
    if (selectedState.capital === target.capital && els.autoNext?.checked) {
      window.setTimeout(() => {
        if (stateMachine.current !== CapitalState) return;
        if (inRound) return;
        if (!target) return;
        stateMachine.handle("next");
      }, 1500);
    }
  },
};

const LearnState = {
  enter() {
    resetStateClasses();
    hideToast();
    hideQuizMessage();
    setNextEnabled(false);
    inRound = false;
    target = null;
    remaining = [];
    round = 0;
    capitalOptions = [];
    capitalAnswered = false;
    els.learnFlagWrap?.classList.add("hidden");
    if (els.learnFlagImg) {
      els.learnFlagImg.src = "";
      els.learnFlagImg.alt = "";
    }
    els.learnBannerFlagWrap?.classList.add("hidden");
    if (els.learnBannerFlagImg) {
      els.learnBannerFlagImg.src = "";
      els.learnBannerFlagImg.alt = "";
    }
    updateQuizBanner(this);
    setQuizUIVisible(false);
    setCapitalUIVisible(false);
    setFlagQuizUIVisible(false);
    setLearnUIVisible(true);
    ensureLearnFlagsToggle();
    els.quizBanner?.classList.add("hidden");
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = true;
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "—";
    els.totalRounds.textContent = "—";
    els.targetState.textContent = "Click a state";
    setHint("Learn mode: click a state to see its name and flag.");
    els.startBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = true;
  },
  handleMapClick(el) {
    resetStateClasses();
    const clickedCode = el.id;
    const clicked = findStateByCode(clickedCode);
    const clickedName = clicked ? clicked.name : clickedCode;
    const clickedCapital = clicked ? clicked.capital : "";
    el.classList.add("correct");
    const showFlags = els.showLearnFlagsToggle?.checked ?? true;
    const showCapital = els.showLearnCapitalToggle?.checked ?? true;
    let toastText = clickedName;
    if (clickedCapital && showCapital) {
      toastText += `\nCapital: ${clickedCapital}`;
    }
    if (showFlags) {
      showToast(
        toastText,
        `assets/flags/${clickedCode}.svg`,
        `${clickedName} flag`,
      );
    } else {
      showToast(toastText);
    }
    els.targetState.textContent = "Click a state";
    setHint("Learn mode: click a state to see its name and flag.");
  },
};

const FlagState = {
  enter() {
    resetStateClasses();
    hideToast();
    hideQuizMessage();
    setNextEnabled(false);
    inRound = false;
    target = null;
    remaining = [];
    round = 0;
    capitalOptions = [];
    capitalAnswered = false;
    els.learnFlagWrap?.classList.add("hidden");
    if (els.learnFlagImg) {
      els.learnFlagImg.src = "";
      els.learnFlagImg.alt = "";
    }
    els.learnBannerFlagWrap?.classList.add("hidden");
    if (els.learnBannerFlagImg) {
      els.learnBannerFlagImg.src = "";
      els.learnBannerFlagImg.alt = "";
    }
    if (els.flagQuiz) {
      els.flagQuiz.classList.remove("hidden");
      els.flagQuestion.textContent = "";
      els.flagOptions.innerHTML = "";
    }
    updateQuizBanner(this);
    els.quizBanner?.classList.remove("hidden");
    setQuizUIVisible(false);
    setCapitalUIVisible(false);
    setLearnUIVisible(false);
    setFlagQuizUIVisible(true);
    removeLearnFlagsToggle();
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.totalRounds.textContent = String(totalRounds);
    els.targetState.textContent = "—";
    setHint("Pick the correct flag for the state.");
    els.startBtn.disabled = false;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
  },
  start() {
    score = 0;
    round = 0;
    inRound = false;
    target = null;
    capitalOptions = [];
    capitalAnswered = false;
    setNextEnabled(false);
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0)
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    els.totalRounds.textContent = String(totalRounds);
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.startBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;
    remaining = shuffle([...STATES]);
    this.next();
  },
  next() {
    resetStateClasses();
    hideQuizMessage();
    if (round >= totalRounds || remaining.length === 0) {
      this.end();
      return;
    }
    round += 1;
    inRound = true;
    capitalAnswered = false;
    els.round.textContent = String(round);
    setNextEnabled(false);
    target = remaining.pop();
    els.targetState.textContent = target.name;
    // Prepare options
    const optionCount = Math.max(2, Number(els.capitalOptionCount?.value) || 4);
    const wrongStates = shuffle(
      STATES.filter((s) => s.code !== target.code),
    ).slice(0, optionCount - 1);
    capitalOptions = shuffle([target, ...wrongStates]);
    // Render flag options
    if (els.flagOptions) {
      els.flagOptions.innerHTML = "";
      // Get selected flag size or default to 'm'
      capitalOptions.forEach((s) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "flagOptionBtn";
        btn.setAttribute("data-flag", s.code);
        const flagSize = els.flagSizeSelect?.value || "auto";
        btn.innerHTML = `<img src="assets/flags/${s.code}.svg" alt="${s.name} flag" class="flag-img size-${flagSize}"><span class="sr-only">${s.name}</span>`;
        els.flagOptions.appendChild(btn);
      });
    }
    if (els.flagQuestion) {
      els.flagQuestion.textContent = `Which is the flag of ${target.name}?`;
    }
    if (els.bannerText) {
      els.bannerText.innerHTML = `Which is the flag of <b>${target.name}</b>?`;
    }
    els.nextBtn.disabled = true;
  },
  end() {
    inRound = false;
    target = null;
    els.targetState.textContent = "—";
    setNextEnabled(false);
    els.startBtn.disabled = false;
    els.finalScore.textContent = String(score);
    els.endScreen.classList.remove("hidden");
    setHint("Game finished.", "neutral");
    hideQuizMessage();
    if (els.flagQuiz) els.flagQuiz.classList.add("hidden");
  },
  handleFlagOptionClick(selectedState, btn) {
    if (!inRound || capitalAnswered) return;
    capitalAnswered = true;
    inRound = false;
    // Mark all buttons
    Array.from(els.flagOptions.children).forEach((b) => {
      b.disabled = true;
      if (b.getAttribute("data-flag") === target.code) {
        b.classList.add("correct");
      }
      if (b === btn && selectedState.code !== target.code) {
        b.classList.add("wrong");
      }
    });
    if (selectedState.code === target.code) {
      score += 1;
      els.score.textContent = String(score);
      setHint("Correct!", "good");
      showQuizMessage("Correct!", "good");
      window.setTimeout(() => {
        hideQuizMessage();
      }, 2000);
    } else {
      setHint(`Wrong. That was ${selectedState.name}.`, "bad");
      showQuizMessage(`Wrong, you clicked on ${selectedState.name}.`, "bad");
      window.setTimeout(() => {
        hideQuizMessage();
      }, 2000);
    }
    setNextEnabled(true);
    els.nextBtn.disabled = false;
    if (selectedState.code === target.code && els.autoNext?.checked) {
      window.setTimeout(() => {
        if (stateMachine.current !== FlagState) return;
        if (inRound) return;
        if (!target) return;
        stateMachine.handle("next");
      }, 1500);
    }
  },
};

renderLandmarkMarkers(LANDMARKS, els.landmarksLayer);
renderLandmarkMarkers(NATURAL_LANDMARKS, els.naturalLandmarksLayer);
renderLandmarkMarkers(FAMOUS_PLACES, els.famousPlacesLayer);

// --- State Machine Instance ---
const stateMachine = new StateMachine(
  {
    quiz: QuizState,
    river: RiverState,
    mountain: MountainState,
    landmark: LandmarkState,
    "natural-landmark": NaturalLandmarkState,
    "famous-place": FamousPlaceState,
    capital: CapitalState,
    learn: LearnState,
    flag: FlagState,
  },
  "quiz",
);

// --- UI Event Bindings ---

els.modeToggle?.addEventListener("change", () => {
  stateMachine.setState(els.modeToggle.value);
});

els.startBtn.addEventListener("click", () => stateMachine.handle("start"));
els.nextBtn.addEventListener("click", () => stateMachine.handle("next"));
els.restartBtn.addEventListener("click", () => {
  els.startBtn.disabled = false;
  stateMachine.handle("start");
});

els.bannerNextBtn?.addEventListener("click", () => stateMachine.handle("next"));
els.bannerRestartBtn?.addEventListener("click", () => {
  els.startBtn.disabled = false;
  stateMachine.handle("start");
});

// Map click handler delegates to state
els.map.addEventListener("click", (e) => {
  const el = e.target;
  if (!(el instanceof SVGElement)) return;
  if (stateMachine.current === RiverState) {
    const riverEl = el.closest(".river");
    if (riverEl) {
      const selected =
        e.clientX || e.clientY
          ? nearestRiverAt(e.clientX, e.clientY)
          : riverEl;
      stateMachine.handle("handleRiverClick", selected ?? riverEl);
    }
    return;
  }
  if (stateMachine.current === MountainState) {
    const mountainEl = el.closest(".mountain");
    if (mountainEl) {
      const selected =
        e.clientX || e.clientY
          ? nearestMountainAt(e.clientX, e.clientY)
          : mountainEl;
      stateMachine.handle("handleMountainClick", selected ?? mountainEl);
    }
    return;
  }
  if (stateMachine.current === LandmarkState || stateMachine.current === NaturalLandmarkState || stateMachine.current === FamousPlaceState) {
    const landmarkEl = el.closest(".landmark");
    if (landmarkEl) stateMachine.handle("handleLandmarkClick", landmarkEl);
    return;
  }
  if (!(el instanceof SVGPathElement)) return;
  if (!el.classList.contains("state")) return;
  if (stateMachine.current === QuizState)
    stateMachine.handle("handleMapClick", el);
  else if (stateMachine.current === LearnState)
    stateMachine.handle("handleMapClick", el);
});

els.riversLayer?.addEventListener("keydown", (e) => {
  if (stateMachine.current !== RiverState) return;
  if (e.key !== "Enter" && e.key !== " ") return;
  const riverEl = e.target.closest(".river");
  if (!riverEl) return;
  e.preventDefault();
  stateMachine.handle("handleRiverClick", riverEl);
});

els.mountainsLayer?.addEventListener("keydown", (e) => {
  if (stateMachine.current !== MountainState) return;
  if (e.key !== "Enter" && e.key !== " ") return;
  const mountainEl = e.target.closest(".mountain");
  if (!mountainEl) return;
  e.preventDefault();
  stateMachine.handle("handleMountainClick", mountainEl);
});

for (const [layer, mode] of [[els.landmarksLayer, LandmarkState], [els.naturalLandmarksLayer, NaturalLandmarkState], [els.famousPlacesLayer, FamousPlaceState]]) {
  layer?.addEventListener("keydown", (e) => {
    if (stateMachine.current !== mode) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    const landmarkEl = e.target.closest(".landmark");
    if (!landmarkEl) return;
    e.preventDefault();
    stateMachine.handle("handleLandmarkClick", landmarkEl);
  });
}

els.landmarkInfoClose?.addEventListener("click", hideLandmarkInfo);

// Capital option click handler
els.capitalOptions.addEventListener("click", (e) => {
  const btn = e.target;
  if (!(btn instanceof HTMLButtonElement)) return;
  if (!btn.classList.contains("capitalOptionBtn")) return;
  const cap = decodeURIComponent(btn.getAttribute("data-capital"));
  const state = capitalOptions.find((s) => s.capital === cap);
  if (state && stateMachine.current === CapitalState) {
    stateMachine.handle("handleCapitalOptionClick", state, btn);
  }
});

// Flag option click handler
els.flagOptions?.addEventListener("click", (e) => {
  const btn = e.target.closest(".flagOptionBtn");
  if (!btn) return;
  const code = btn.getAttribute("data-flag");
  const state = capitalOptions.find((s) => s.code === code);
  if (state && stateMachine.current === FlagState) {
    stateMachine.handle("handleFlagOptionClick", state, btn);
  }
});

// Flag size select handler
els.flagSizeSelect?.addEventListener("change", () => {
  if (stateMachine.current === FlagState && els.flagOptions) {
    const flagSize = els.flagSizeSelect.value;
    els.flagOptions.querySelectorAll(".flag-img").forEach((img) => {
      img.classList.remove(
        "size-auto",
        "size-s",
        "size-m",
        "size-l",
        "size-xl",
        "size-xxl",
      );
      img.classList.add(`size-${flagSize}`);
    });
  }
});

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  stateMachine.setState(els.modeToggle?.value ?? "quiz");
});
