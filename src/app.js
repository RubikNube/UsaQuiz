const DEFAULT_TOTAL_ROUNDS = 10;

// Map of state code -> name.
// Keep in sync with the SVG: only states present in the SVG will be used.
const STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const els = {
  map: document.getElementById("usMap"),
  targetState: document.getElementById("targetState"),
  hint: document.getElementById("hint"),
  score: document.getElementById("score"),
  round: document.getElementById("round"),
  totalRounds: document.getElementById("totalRounds"),
  roundCount: document.getElementById("roundCount"),
  modeToggle: document.getElementById("modeToggle"),
  startBtn: document.getElementById("startBtn"),
  nextBtn: document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  endScreen: document.getElementById("endScreen"),
  finalScore: document.getElementById("finalScore"),
  promptLine: document.getElementById("promptLine"),
  quizOnly: Array.from(document.querySelectorAll("[data-quiz-only]")),
};

function findStateByCode(code) {
  return STATES.find((s) => s.code === code) ?? null;
}

function setQuizUIVisible(visible) {
  els.quizOnly.forEach((el) => el.classList.toggle("hidden", !visible));
}

let mode = "quiz"; // "quiz" | "learn"

let totalRounds = DEFAULT_TOTAL_ROUNDS;
els.totalRounds.textContent = String(totalRounds);

let round = 0;
let score = 0;
let target = null;
let inRound = false;
let remaining = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function resetStateClasses() {
  els.map.querySelectorAll(".state").forEach((p) => {
    p.classList.remove("correct", "wrong");
  });
}

function setHint(text, kind = "neutral") {
  els.hint.textContent = text;
  if (kind === "good") els.hint.style.color = "var(--good)";
  else if (kind === "bad") els.hint.style.color = "var(--bad)";
  else els.hint.style.color = "var(--muted)";
}

function setMode(nextMode) {
  mode = nextMode === "learn" ? "learn" : "quiz";

  // Reset state when switching modes
  resetStateClasses();
  inRound = false;
  target = null;
  remaining = [];

  if (mode === "learn") {
    setQuizUIVisible(false);
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "—";
    els.totalRounds.textContent = "—";
    els.targetState.textContent = "Click a state";
    setHint("Learn mode: click a state to see its name.");
  } else {
    setQuizUIVisible(true);
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0) {
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    }
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Pick the correct state on the map.");
    els.startBtn.disabled = false;
    els.restartBtn.disabled = true;
    els.nextBtn.disabled = true;
  }
}

function startGame() {
  if (mode !== "quiz") return;

  score = 0;
  round = 0;
  inRound = false;
  target = null;

  totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
  if (!Number.isFinite(totalRounds) || totalRounds <= 0) totalRounds = DEFAULT_TOTAL_ROUNDS;

  // Only include states that exist in the SVG (by id).
  const available = STATES.filter((s) => els.map.querySelector(`#${CSS.escape(s.code)}`));

  // Cap rounds to available states.
  totalRounds = Math.min(totalRounds, available.length);
  els.totalRounds.textContent = String(totalRounds);

  els.endScreen.classList.add("hidden");
  els.score.textContent = "0";
  els.round.textContent = "1";
  els.startBtn.disabled = true;
  els.restartBtn.disabled = false;

  remaining = shuffle([...available]);

  if (remaining.length === 0) {
    setHint("No clickable states found in the SVG.", "bad");
    els.startBtn.disabled = false;
    return;
  }

  nextRound();
}

function nextRound() {
  if (mode !== "quiz") return;

  resetStateClasses();

  if (round >= totalRounds || remaining.length === 0) {
    endGame();
    return;
  }

  round += 1;
  inRound = true;
  els.round.textContent = String(round);
  els.nextBtn.disabled = true;

  target = remaining.pop();
  els.targetState.textContent = target.name;
  setHint("Click the correct state on the map.");
}

function endGame() {
  if (mode !== "quiz") return;

  inRound = false;
  target = null;

  els.targetState.textContent = "—";
  els.nextBtn.disabled = true;
  els.startBtn.disabled = false;

  els.finalScore.textContent = String(score);
  els.endScreen.classList.remove("hidden");
  setHint("Game finished.", "neutral");
}

function handleLearnClick(el) {
  resetStateClasses();

  const clickedCode = el.id;
  const clicked = findStateByCode(clickedCode);
  const clickedName = clicked ? clicked.name : clickedCode;

  el.classList.add("correct");
  els.targetState.textContent = clickedName;
  setHint(`You clicked ${clickedName}.`, "neutral");
}

function handleQuizClick(el) {
  if (!inRound || !target) return;

  const clickedCode = el.id;
  const correctCode = target.code;

  // Lock the round after a click.
  inRound = false;

  if (clickedCode === correctCode) {
    score += 1;
    els.score.textContent = String(score);
    el.classList.add("correct");
    setHint("Correct!", "good");
  } else {
    el.classList.add("wrong");
    const correctEl = els.map.querySelector(`#${CSS.escape(correctCode)}`);
    if (correctEl) correctEl.classList.add("correct");

    const clicked = findStateByCode(clickedCode);
    const clickedName = clicked ? clicked.name : clickedCode;

    setHint(`Wrong. That was ${clickedName}.`, "bad");
  }

  els.nextBtn.disabled = false;
}

function handleMapClick(e) {
  const el = e.target;
  if (!(el instanceof SVGPathElement)) return;
  if (!el.classList.contains("state")) return;

  if (mode === "learn") handleLearnClick(el);
  else handleQuizClick(el);
}

els.map.addEventListener("click", handleMapClick);

els.modeToggle?.addEventListener("change", () => {
  setMode(els.modeToggle.value);
});

els.startBtn.addEventListener("click", startGame);
els.nextBtn.addEventListener("click", nextRound);
els.restartBtn.addEventListener("click", () => {
  els.startBtn.disabled = false;
  startGame();
});

// Initialize UI
setMode(els.modeToggle?.value ?? "quiz");
