'use strict';

let currentIndex   = 0;
let totalXP        = 0;
let streak         = 0;
let completedSet   = new Set();
let hintStage      = 0;  // 0 = no hint, 1 = small hint shown, 2 = full hint shown
let levelFailed    = false;  // true if they saw the full hint
let winTriggered   = false;
let validateTimer  = null;

// ── DOM ────────────────────────────────────
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
const lessonEl     = document.getElementById('lesson-content');
const descEl       = document.getElementById('challenge-desc');
const smallHintBox = document.getElementById('small-hint-box');
const smallHintEl  = document.getElementById('small-hint-text');
const fullHintBox  = document.getElementById('full-hint-box');
const fullHintEl   = document.getElementById('full-hint-text');
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


function initGame() {
  loadProgress();
  renderDots();
  let start = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (!completedSet.has(i)) { start = i; break; }
    if (i === LEVELS.length - 1) start = 0;
  }
  loadLevel(start);
}


function loadLevel(index) {
  currentIndex  = index;
  winTriggered  = false;
  hintStage     = 0;
  levelFailed   = false;

  const lvl = LEVELS[index];

  badge.textContent   = lvl.badge;
  chapter.textContent = lvl.chapter;
  xpLabel.textContent = `+${lvl.xp} XP`;
  titleEl.textContent = lvl.title;
  lessonEl.innerHTML  = lvl.lesson;
  descEl.innerHTML    = lvl.description;
  smallHintEl.textContent = lvl.smallHint;
  fullHintEl.innerHTML    = lvl.fullHint;

  smallHintBox.style.display = 'none';
  fullHintBox.style.display  = 'none';
  btnHint.textContent = '💡 Show Hint';
  btnHint.style.opacity = '1';
  btnHint.disabled = false;

  editor.value = lvl.startCode || '';
  updateLineNumbers();
  editor.focus();

  setStatus('waiting', 'Start typing…');
  updateHUD();
  updateProgress();
  updatePreview();

  document.querySelector('.challenge-panel').scrollTop = 0;
}


editor.addEventListener('input', () => {
  updateLineNumbers();
  updatePreview();
  setStatus('typing', 'Typing…');
  clearTimeout(validateTimer);
  validateTimer = setTimeout(runValidation, 420);
});

editor.addEventListener('keydown', (e) => {
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


function updatePreview() {
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


function runValidation() {
  if (winTriggered || levelFailed) return;

  const code = editor.value.trim();
  if (code.length === 0) {
    setStatus('waiting', 'Start typing…');
    return;
  }

  const lvl = LEVELS[currentIndex];

  try {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(editor.value, 'text/html');
    const passed = lvl.validate(doc, editor.value);

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


function winLevel() {
  const lvl      = LEVELS[currentIndex];
  const xpEarned = levelFailed ? 0 : lvl.xp;

  if (!levelFailed) {
    totalXP += xpEarned;
    streak++;
    completedSet.add(currentIndex);
    saveProgress();
    spawnXPFloat('+' + xpEarned + ' XP');
  }

  const stars = levelFailed ? '☆☆☆' : (hintStage === 1 ? '⭐⭐☆' : '⭐⭐⭐');

  winBadge.textContent   = lvl.badge;
  winStars.textContent   = stars;
  winXPGain.textContent  = levelFailed ? 'RETRY COMPLETED' : ('+' + xpEarned + ' XP');
  winMessage.textContent = levelFailed ? 'You got the answer but should try without hints next time!' : (WIN_MESSAGES[currentIndex] || 'Amazing work!');
  btnNext.textContent    = currentIndex >= LEVELS.length - 1 ? 'Finish! 🏆' : 'Next Level ▶';

  winOverlay.style.display = 'flex';
  updateHUD();
  updateProgress();
  renderDots();
  launchConfetti();
}

const WIN_MESSAGES = [
  "Headings are the foundation of web pages!",
  "Paragraphs organize text naturally.",
  "You understand semantic formatting!",
  "Emphasis makes writing more expressive!",
  "Links connect the entire web!",
  "Images bring pages to life!",
  "Lists organize information beautifully!",
  "Numbers tell a story sequentially!",
  "Buttons invite interaction!",
  "Forms collect user input!",
  "Semantic HTML guides browsers!",
  "Containers group content logically!",
  "You can structure real pages!",
  "Attributes unlock HTML's power!",
  "You are an HTML developer! 🎓",
  "Forms are essential for web applications!",
  "Textareas and dropdowns expand your forms!",
  "Tables organize data clearly!",
  "Comments document code, links and scripts complete the page! 🚀"
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

window.nextLevel = nextLevel;


function showSmallHint() {
  if (hintStage === 0) {
    hintStage = 1;
    smallHintBox.style.display = 'block';
    btnHint.textContent = '📖 Show Full Hint';
  } else if (hintStage === 1) {
    hintStage = 2;
    levelFailed = true;
    smallHintBox.style.display = 'none';
    fullHintBox.style.display = 'block';
    btnHint.disabled = true;
    btnHint.textContent = 'Full hint shown ⚠️';
  }
}

function resetCode() {
  editor.value   = LEVELS[currentIndex].startCode || '';
  winTriggered   = false;
  hintStage      = 0;
  levelFailed    = false;
  smallHintBox.style.display = 'none';
  fullHintBox.style.display  = 'none';
  btnHint.textContent = '💡 Show Hint';
  btnHint.disabled = false;
  updateLineNumbers();
  updatePreview();
  setStatus('waiting', 'Start typing…');
  editor.focus();
}

window.showSmallHint = showSmallHint;
window.resetCode = resetCode;


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
      p.vy  += 0.12;
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


initGame();
