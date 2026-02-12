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
  learnOnly: Array.from(document.querySelectorAll("[data-learn-only]")),
};

function findStateByCode(code) {
  return STATES.find((s) => s.code === code) ?? null;
}

function setQuizUIVisible(visible) {
  els.quizOnly.forEach((el) => el.classList.toggle("hidden", !visible));
}

function setLearnUIVisible(visible) {
  els.learnOnly.forEach((el) => el.classList.toggle("hidden", !visible));
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
  els.toast.appendChild(document.createTextNode(text));

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

  wrap.appendChild(input);
  wrap.appendChild(text);
  hintParent.appendChild(wrap);

  els.showLearnFlagsToggle = input;
  els.learnOnly = Array.from(document.querySelectorAll("[data-learn-only]"));
}

function updateQuizBanner() {
  if (!els.quizBanner || !els.quizBannerLine) return;

  const show = mode === "quiz" && round > 0 && totalRounds > 0 && target;
  els.quizBanner.classList.toggle("hidden", !show);

  if (!show) return;

  const safeTotal = Number.isFinite(totalRounds) ? totalRounds : 0;
  const line = `Round ${round}/${safeTotal}: Find ${target.name}`;
  if (els.bannerText) els.bannerText.textContent = line;
  else els.quizBannerLine.textContent = line;
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
  hideToast();
  hideQuizMessage();
  setNextEnabled(false);
  inRound = false;
  target = null;
  remaining = [];
  round = 0;

  // Learn mode flag UI
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

  updateQuizBanner();

  if (mode === "learn") {
    ensureLearnFlagsToggle();
    setQuizUIVisible(false);
    setLearnUIVisible(true);
    els.quizBanner?.classList.add("hidden");
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = true;
    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "—";
    els.totalRounds.textContent = "—";
    els.targetState.textContent = "Click a state";
    setHint("Learn mode: click a state to see its name and flag.");
  } else {
    setQuizUIVisible(true);
    setLearnUIVisible(false);
    totalRounds = Number.parseInt(els.roundCount?.value ?? "", 10);
    if (!Number.isFinite(totalRounds) || totalRounds <= 0) {
      totalRounds = DEFAULT_TOTAL_ROUNDS;
    }
    els.totalRounds.textContent = String(totalRounds);
    els.round.textContent = "1";
    els.targetState.textContent = "—";
    setHint("Pick the correct state on the map.");
    els.startBtn.disabled = false;
    els.restartBtn.disabled = false;
    if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;
    setNextEnabled(false);
  }
}

function startGame() {
  if (mode !== "quiz") return;

  score = 0;
  round = 0;
  inRound = false;
  target = null;

  hideQuizMessage();
  setNextEnabled(false);
  els.restartBtn.disabled = false;
  if (els.bannerRestartBtn) els.bannerRestartBtn.disabled = false;

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
  hideQuizMessage();

  if (round >= totalRounds || remaining.length === 0) {
    endGame();
    return;
  }

  round += 1;
  inRound = true;
  els.round.textContent = String(round);
  setNextEnabled(false);

  target = remaining.pop();

  // Hide the state name in the main prompt for quiz mode; use banner instead.
  els.targetState.textContent = "—";
  setHint("Click the correct state on the map.");

  updateQuizBanner();
}

function endGame() {
  if (mode !== "quiz") return;

  inRound = false;
  target = null;

  els.targetState.textContent = "—";
  setNextEnabled(false);
  els.startBtn.disabled = false;

  els.finalScore.textContent = String(score);
  els.endScreen.classList.remove("hidden");
  setHint("Game finished.", "neutral");

  hideQuizMessage();
  updateQuizBanner();
}

function handleLearnClick(el) {
  resetStateClasses();

  const clickedCode = el.id;
  const clicked = findStateByCode(clickedCode);
  const clickedName = clicked ? clicked.name : clickedCode;

  el.classList.add("correct");

  const showFlags = els.showLearnFlagsToggle?.checked ?? true;
  if (showFlags) {
    // In learn mode show state name + flag in the toast.
    showToast(clickedName, `assets/flags/${clickedCode}.svg`, `${clickedName} flag`);
  } else {
    showToast(clickedName);
  }

  // Keep the prompt area stable in fullscreen; avoid relying on it.
  els.targetState.textContent = "Click a state";
  setHint("Learn mode: click a state to see its name and flag.");
}

function handleQuizClick(el) {
  if (!inRound || !target) return;

  const clickedCode = el.id;
  const correctCode = target.code;

  // Lock the round after a click.
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
      // if the user already advanced / restarted / switched mode, ignore
      if (mode !== "quiz") return;
      if (inRound) return;
      if (!target) return;

      nextRound();
    }, 1500);
  }
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

els.bannerNextBtn?.addEventListener("click", nextRound);
els.bannerRestartBtn?.addEventListener("click", () => {
  els.startBtn.disabled = false;
  startGame();
});

// Initialize UI
setMode(els.modeToggle?.value ?? "quiz");
