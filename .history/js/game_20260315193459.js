'use strict';

/* ════════════════════════════════════════════
   CodeQuest — Game Engine
   Depends on: js/levels.js (LEVELS array)
   ════════════════════════════════════════════ */

// ── State ─────────────────────────────────────
let currentIndex   = 0;
let totalXP        = 0;
let streak         = 0;
let completedSet   = new Set();   // set of completed level indices
let hintUsed       = false;
let winTriggered   = false;
let validateTimer  = null;

// ── DOM refs ───────────────────────────────────
const editor       = document.getElementById('code-editor');
const previewFrame = document.getElementById('preview-frame');
const lineNums     = document.getElementById('line-numbers');
const statusDot    = document.getElementById('status-dot');
const statusText   = document.getElementById('status-text');
const previewPulse = document.getElementById('preview-pulse');

const hudLevel     = document.getElementById('hud-level');
const hudXP        = document.getElementById('hud-xp');
const hudStreak    = document.getElementById('hud-streak');
const levelDots    = document.getElementById('level-dots');

const badge        = document.getElementById('challenge-badge');
const chapter      = document.getElementById('challenge-chapter');
const xpLabel      = document.getElementById('challenge-xp');
const titleEl      = document.getElementById('challenge-title');
const descEl       = document.getElementById('challenge-desc');
const tipEl        = document.getElementById('challenge-tip');
const hintBox      = document.getElementById('hint-box');
const hintText     = document.getElementById('hint-text');
const cpFill       = document.getElementById('cp-fill');
const cpLabel      = document.getElementById('cp-label');
const btnHint      = document.getElementById('btn-hint');

const winOverlay      = document.getElementById('win-overlay');
const winBadge        = document.getElementById('win-badge');
const winStars        = document.getElementById('win-stars');
const winXPGain       = document.getElementById('win-xp-gain');
const winMessage      = document.getElementById('win-message');
const btnNext         = document.getElementById('btn-next');
const completeOverlay = document.getElementById('complete-overlay');
const finalXPEl       = document.getElementById('final-xp');


/* ════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════ */

function initGame() {
  loadProgress();
  renderDots();

  // Resume at first uncompleted level
  let start = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (!completedSet.has(i)) { start = i; break; }
    if (i === LEVELS.length - 1) start = 0; // all done — restart
  }
  loadLevel(start);
}


/* ════════════════════════════════════════════
   LEVEL MANAGEMENT
   ════════════════════════════════════════════ */

function loadLevel(index) {
  currentIndex  = index;
  winTriggered  = false;
  hintUsed      = false;

  const lvl = LEVELS[index];

  // Populate challenge panel
  badge.textContent   = lvl.badge;
  chapter.textContent = lvl.chapter;
  xpLabel.textContent = `+${lvl.xp} XP`;
  titleEl.textContent = lvl.title;
  descEl.innerHTML    = lvl.description;
  tipEl.textContent   = lvl.tip;
  hintText.innerHTML  = lvl.hint;

  hintBox.style.display     = 'none';
  btnHint.textContent       = '🔍 Show Hint';
  btnHint.style.opacity     = '1';
  btnHint.disabled          = false;

  // Editor
  editor.value = lvl.startCode || '';
  updateLineNumbers();
  editor.focus();

  // Reset UI
  setStatus('waiting', 'Start typing…');
  updateHUD();
  updateProgress();
  updatePreview();

  document.querySelector('.challenge-panel').scrollTop = 0;
}


/* ════════════════════════════════════════════
   EDITOR EVENTS
   ════════════════════════════════════════════ */

editor.addEventListener('input', () => {
  updateLineNumbers();
  updatePreview();
  setStatus('typing', 'Typing…');

  clearTimeout(validateTimer);
  validateTimer = setTimeout(runValidation, 420);
});

editor.addEventListener('keydown', (e) => {
  // Tab → insert two spaces instead of losing focus
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value =
      editor.value.substring(0, s) + '  ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = s + 2;
    updateLineNumbers();
  }
});

function updateLineNumbers() {
  const count = editor.value.split('\n').length;
  lineNums.textContent = Array.from({ length: count }, (_, i) => i + 1).join('\n');
}


/* ════════════════════════════════════════════
   LIVE PREVIEW
   ════════════════════════════════════════════ */

function updatePreview() {
  // Flash pulse indicator
  previewPulse.classList.add('active');
  setTimeout(() => previewPulse.classList.remove('active'), 480);

  const userCode = editor.value;
  previewFrame.srcdoc =
    `<!DOCTYPE html><html><head>` +
    `<meta charset="UTF-8">` +
    `<style>body{font-family:system-ui,sans-serif;padding:16px;margin:0}` +
    `*{box-sizing:border-box}</style></head>` +
    `<body>${userCode}</body></html>`;
}


/* ════════════════════════════════════════════
   VALIDATION  (uses DOMParser — no iframe access needed)
   ════════════════════════════════════════════ */

function runValidation() {
  if (winTriggered) return;

  const code = editor.value.trim();
  if (code.length === 0) {
    setStatus('waiting', 'Start typing…');
    return;
  }

  const lvl = LEVELS[currentIndex];

  try {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(editor.value, 'text/html');
    const passed = lvl.validate(doc);

    if (passed) {
      winTriggered = true;
      setStatus('correct', 'Perfect! ✓');
      setTimeout(winLevel, 600);
    } else {
      setStatus('typing', 'Keep going…');
    }
  } catch (_) {
    setStatus('wrong', 'Check your syntax');
  }
}

function setStatus(state, message) {
  statusDot.className = 'status-dot ' + state;
  statusText.textContent = message;
}


/* ════════════════════════════════════════════
   WIN SEQUENCE
   ════════════════════════════════════════════ */

function winLevel() {
  const lvl      = LEVELS[currentIndex];
  const xpEarned = hintUsed ? Math.floor(lvl.xp * 0.7) : lvl.xp;
  const stars    = hintUsed ? '⭐⭐☆' : '⭐⭐⭐';

  totalXP += xpEarned;
  streak++;
  completedSet.add(currentIndex);
  saveProgress();

  // Floating XP number
  spawnXPFloat('+' + xpEarned + ' XP');

  // Set overlay contents
  winBadge.textContent   = lvl.badge;
  winStars.textContent   = stars;
  winXPGain.textContent  = '+' + xpEarned + ' XP';
  winMessage.textContent = WIN_MESSAGES[currentIndex] || 'Amazing work!';
  btnNext.textContent    = currentIndex >= LEVELS.length - 1 ? 'Finish! 🏆' : 'Next Level ▶';

  winOverlay.style.display = 'flex';
  updateHUD();
  updateProgress();
  renderDots();
  launchConfetti();
}

const WIN_MESSAGES = [
  "You typed your first HTML tag — the journey begins! 🚀",
  "Paragraphs are the backbone of every web page. Nailed it!",
  "Bold moves! You're getting the hang of HTML.",
  "Links connect the whole internet. You just made one!",
  "A picture is worth a thousand words — and you coded it!",
  "Lists are everywhere on the web. You've mastered them!",
  "Buttons make the web interactive. You're dangerous now 😄",
  "Inputs let users talk to your pages. Power move!",
  "Combining elements is what real web dev looks like!",
  "YOU BEAT HTML! You are officially a web developer! 🎓"
];

function nextLevel() {
  winOverlay.style.display = 'none';
  const next = currentIndex + 1;
  if (next >= LEVELS.length) {
    finalXPEl.textContent = 'Total XP: ' + totalXP.toLocaleString();
    completeOverlay.style.display = 'flex';
  } else {
    loadLevel(next);
    renderDots();
  }
}

/* exposed to inline onclick */
window.nextLevel = nextLevel;


/* ════════════════════════════════════════════
   HINT & RESET
   ════════════════════════════════════════════ */

function showHint() {
  hintUsed = true;
  hintBox.style.display   = 'block';
  btnHint.textContent     = '💡 Hint shown (−30% XP)';
  btnHint.style.opacity   = '0.55';
  btnHint.disabled        = true;
}

function resetCode() {
  editor.value   = LEVELS[currentIndex].startCode || '';
  winTriggered   = false;
  updateLineNumbers();
  updatePreview();
  setStatus('waiting', 'Start typing…');
  editor.focus();
}

/* exposed to inline onclick */
window.showHint  = showHint;
window.resetCode = resetCode;


/* ════════════════════════════════════════════
   HUD + PROGRESS
   ════════════════════════════════════════════ */

function updateHUD() {
  hudLevel.textContent  = (currentIndex + 1) + ' / ' + LEVELS.length;
  hudXP.textContent     = totalXP.toLocaleString();
  hudStreak.textContent = streak + ' 🔥';
}

function updateProgress() {
  const done = completedSet.size;
  const pct  = (done / LEVELS.length) * 100;
  cpFill.style.width    = pct + '%';
  cpLabel.textContent   = done + ' / ' + LEVELS.length + ' complete';
}

function renderDots() {
  levelDots.innerHTML = '';
  LEVELS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'level-dot';
    if (completedSet.has(i))    dot.classList.add('done');
    else if (i === currentIndex) dot.classList.add('active');
    levelDots.appendChild(dot);
  });
}


/* ════════════════════════════════════════════
   XP FLOAT ANIMATION
   ════════════════════════════════════════════ */

function spawnXPFloat(text) {
  const el   = document.createElement('div');
  el.className     = 'xp-float';
  el.textContent   = text;
  const ref        = document.getElementById('hud-xp');
  const rect       = ref.getBoundingClientRect();
  el.style.left    = rect.left + 'px';
  el.style.top     = rect.top  + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}


/* ════════════════════════════════════════════
   CONFETTI
   ════════════════════════════════════════════ */

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth  || 480;
  canvas.height = canvas.offsetHeight || 300;

  const COLORS = ['#00ff88','#00d4ff','#ffd700','#ff9500','#ff4757','#c678dd','#ffffff'];

  const pieces = Array.from({ length: 90 }, () => ({
    x:        Math.random() * canvas.width,
    y:        -10 - Math.random() * 40,
    w:        Math.random() * 7 + 3,
    h:        Math.random() * 4 + 2,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    vx:       (Math.random() - 0.5) * 5,
    vy:       Math.random() * 5 + 2,
    rot:      Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8,
    opacity:  1
  }));

  let frame = 0;
  const MAX  = 130;

  (function draw() {
    if (frame++ > MAX) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.12;           // gravity
      p.rot += p.rotSpeed;
      if (frame > MAX * 0.65) p.opacity -= 0.025;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    requestAnimationFrame(draw);
  })();
}


/* ════════════════════════════════════════════
   PERSISTENCE
   ════════════════════════════════════════════ */

function saveProgress() {
  const prev    = JSON.parse(localStorage.getItem('codequest') || '{}');
  const best    = Math.max(streak, prev.bestStreak || 0);
  localStorage.setItem('codequest', JSON.stringify({
    totalXP,
    streak,
    bestStreak: best,
    completed:  [...completedSet]
  }));
}

function loadProgress() {
  const data   = JSON.parse(localStorage.getItem('codequest') || '{}');
  totalXP      = data.totalXP  || 0;
  streak       = data.streak   || 0;
  completedSet = new Set(data.completed || []);
}


/* ════════════════════════════════════════════
   START
   ════════════════════════════════════════════ */
initGame();
