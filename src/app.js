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

const els = {
  map: document.getElementById("usMap"),
  riversLayer: document.getElementById("riversLayer"),
  mountainsLayer: document.getElementById("mountainsLayer"),
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
  const isCapital = currentState === CapitalState;

  const show =
    (isQuiz || isRiver || isMountain || isCapital) && round > 0 && totalRounds > 0 && target;
  els.quizBanner.classList.toggle("hidden", !show);

  if (!show) return;

  const safeTotal = Number.isFinite(totalRounds) ? totalRounds : 0;
  let line = "";
  if (isQuiz || isRiver || isMountain) {
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
  const availableCount = mode === "river" ? RIVERS.length : mode === "mountain" ? MOUNTAINS.length : Infinity;
  const options = Array.from(els.roundCount.options);
  const selectedCount = Number.parseInt(els.roundCount.value, 10);
  for (const option of options) {
    const unavailable = Number(option.value) > availableCount;
    option.hidden = unavailable;
    option.disabled = unavailable;
  }
  if (selectedCount > availableCount) {
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

// --- State Machine Instance ---
const stateMachine = new StateMachine(
  {
    quiz: QuizState,
    river: RiverState,
    mountain: MountainState,
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
