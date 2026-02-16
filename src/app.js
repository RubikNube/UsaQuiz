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
};

function findStateByCode(code) {
  return STATES.find((s) => s.code === code) ?? null;
}

function setQuizUIVisible(visible) {
  document.getElementById("startBtn").classList.toggle("hidden", !visible);
  document.getElementById("nextBtn").classList.toggle("hidden", !visible);
  document.getElementById("restartBtn").classList.toggle("hidden", !visible);
}

function setCapitalUIVisible(visible) {
  // Capital mode: show start, next, restart
  const show = visible;
  ["startBtn", "nextBtn", "restartBtn"].forEach(id => {
    const btn = els[id];
    if (btn) btn.classList.toggle("hidden", !show);
  });
  if (els.capitalQuiz) els.capitalQuiz.classList.toggle("hidden", !visible);
}

function setLearnUIVisible(visible) {
  // Learn mode: hide all control buttons
  ["startBtn", "nextBtn", "restartBtn"].forEach(id => {
    const btn = els[id];
    if (btn) btn.classList.add("hidden");
  });
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
}

function removeLearnFlagsToggle() {
  if (!els.showLearnFlagsToggle) return;
  const wrap = els.showLearnFlagsToggle.parentElement;
  if (wrap) wrap.remove();
  els.showLearnFlagsToggle = undefined;
}

function updateQuizBanner() {
  if (!els.quizBanner || !els.quizBannerLine) return;

  const show = (mode === "quiz" || mode === "capital") && round > 0 && totalRounds > 0 && target;
  els.quizBanner.classList.toggle("hidden", !show);

  if (!show) return;

  const safeTotal = Number.isFinite(totalRounds) ? totalRounds : 0;
  let line = "";
  if (mode === "quiz") {
    line = `Round ${round}/${safeTotal}: Find ${target.name}`;
  } else if (mode === "capital") {
    // Show all capital options in the banner as clickable buttons
    let options = "";
    if (capitalOptions && capitalOptions.length > 0) {
      options = capitalOptions.map(s => {
        return `<button class="capitalOptionBtn banner" type="button" data-capital="${encodeURIComponent(s.capital)}"${inRound && !capitalAnswered ? "" : " disabled"}>${s.capital}</button>`;
      }).join("  ");
    }
    line = `Round ${round}/${safeTotal}: Guess the capital of ${target.name} — [ ${options} ]`;
  }
  if (els.bannerText) els.bannerText.innerHTML = line;
  else els.quizBannerLine.innerHTML = line;

  // Attach click handlers for banner capital buttons (only in capital mode)
  if (mode === "capital" && capitalOptions && capitalOptions.length > 0 && inRound && !capitalAnswered) {
    const bannerBtns = (els.bannerText || els.quizBannerLine).querySelectorAll(".capitalOptionBtn.banner");
    bannerBtns.forEach(btn => {
      btn.onclick = () => {
        const cap = decodeURIComponent(btn.getAttribute("data-capital"));
        const state = capitalOptions.find(s => s.capital === cap);
        if (state) handleCapitalOptionClick(state, btn);
      };
    });
  }
}

let mode = "quiz"; // "quiz" | "capital" | "learn"

let totalRounds = DEFAULT_TOTAL_ROUNDS;
els.totalRounds.textContent = String(totalRounds);

let round = 0;
let score = 0;
let target = null;
let inRound = false;
let remaining = [];
let capitalOptions = [];
let capitalAnswered = false;

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
  mode = nextMode === "learn" ? "learn" : nextMode === "capital" ? "capital" : "quiz";

  // Reset state when switching modes
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

  // Ensure only the correct set of buttons is visible for the mode
  if (mode === "quiz") {
    setCapitalUIVisible(false);
    setLearnUIVisible(false);
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
  } else if (mode === "capital") {
    setQuizUIVisible(false);
    setLearnUIVisible(false);
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
  } else {
    setQuizUIVisible(false);
    setCapitalUIVisible(false);
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
  }
}

function startGame() {
  if (mode === "quiz") {
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
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;

    remaining = shuffle([...available]);

    if (remaining.length === 0) {
      setHint("No clickable states found in the SVG.", "bad");
      els.startBtn.disabled = false;
      return;
    }

    nextRound();
  } else if (mode === "capital") {
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
    if (!Number.isFinite(totalRounds) || totalRounds <= 0) totalRounds = DEFAULT_TOTAL_ROUNDS;
    els.totalRounds.textContent = String(totalRounds);

    els.endScreen.classList.add("hidden");
    els.score.textContent = "0";
    els.round.textContent = "1";
    els.startBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.restartBtn.disabled = false;

    // Use all states for capital quiz
    remaining = shuffle([...STATES]);

    nextCapitalRound();
  }
}

function handleCapitalOptionClick(selectedState, btn) {
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
  const bannerBtns = (els.bannerText || els.quizBannerLine).querySelectorAll(".capitalOptionBtn.banner");
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
      if (mode !== "capital") return;
      if (inRound) return;
      if (!target) return;
      nextCapitalRound();
    }, 1500);
  }
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

function nextCapitalRound() {
  if (mode !== "capital") return;

  resetStateClasses(); // <-- Add this to clear previous highlights

  hideQuizMessage();

  if (round >= totalRounds || remaining.length === 0) {
    endGame();
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
  const wrongStates = shuffle(STATES.filter((s) => s.code !== target.code)).slice(0, optionCount - 1);
  capitalOptions = shuffle([target, ...wrongStates]);

  updateQuizBanner();

  els.nextBtn.disabled = true;
}

function endGame() {
  if (mode !== "quiz" && mode !== "capital") return;

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
  if (els.capitalQuiz) els.capitalQuiz.classList.add("hidden");
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
  if (mode !== "quiz" && mode !== "learn") return;
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
els.nextBtn.addEventListener("click", () => {
  if (mode === "quiz") nextRound();
  else if (mode === "capital") nextCapitalRound();
});
els.restartBtn.addEventListener("click", () => {
  els.startBtn.disabled = false;
  startGame();
});

els.bannerNextBtn?.addEventListener("click", () => {
  if (mode === "quiz") nextRound();
  else if (mode === "capital") nextCapitalRound();
});
els.bannerRestartBtn?.addEventListener("click", () => {
  els.startBtn.disabled = false;
  startGame();
});

// Initialize UI
setMode(els.modeToggle?.value ?? "quiz");
