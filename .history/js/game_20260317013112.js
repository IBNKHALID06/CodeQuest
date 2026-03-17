'use strict';

// ══ MULTI-TRACK GAME ENGINE ═══════════════════════════════════════════════
let currentLanguage = 'html';  // default
let LEVELS = [];  // will be set based on language

// Detect language from URL
function detectLanguage() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') || 'html';
  return lang.toLowerCase();
}

currentLanguage = detectLanguage();

// Load appropriate level set
function loadLevels() {
  if (typeof CSS_LEVELS !== 'undefined') {
    if (currentLanguage === 'css') LEVELS = CSS_LEVELS;
    else if (currentLanguage === 'js') LEVELS = JS_LEVELS;
    else LEVELS = LESSONS;  // HTML (LESSONS renamed from original)
  } else {
    LEVELS = LESSONS || [];
  }
  console.log(`Loaded ${currentLanguage.toUpperCase()} track with ${LEVELS.length} levels`);
}

// Game state ─────────────────────────────────────
let currentIndex   = 0;
let totalXP        = 0;
let streak         = 0;
let completedSet   = new Set();
let hintStage      = 0;
let levelFailed    = false;
let winTriggered   = false;
let validateTimer  = null;

// DOM references ─────────────────────────────────
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
const langBadge    = document.querySelector('.editor-lang-badge');

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

// Win messages for each track
const WIN_MESSAGES = {
  html: [
    "You're building structures!",
    "Semantic HTML mastery!",
    "Tags are your tools!",
    "Linking worlds together!",
    "Media embeds like a pro!",
    "Images worth 1000 words!",
    "Lists organized perfectly!",
    "Forms collect data now!",
    "Inputs and buttons working!",
    "Divs structured beautifully!",
    "Classes and IDs mastered!",
    "Complex layouts handled!",
    "Complete pages built!",
    "Attributes under control!",
    "Footer is everything!",
    "Forms flow perfectly!",
    "Advanced forms conquered!",
    "Tables organize data!",
    "Master of HTML!"
  ],
  css: [
    "Color brings it to life!",
    "Typography set in stone!",
    "Classes = power!",
    "IDs for precision!",
    "Box model mastered!",
    "Borders frame nicely!",
    "Flexbox flows smoothly!",
    "Content centered perfectly!",
    "Flex direction unlocked!",
    "Grid creates layouts!",
    "Absolute positioning locked!",
    "Transitions smooth as butter!",
    "Responsive at any size!",
    "Animations bring magic!",
    "Complete styling mastery!"
  ],
  js: [
    "Variables store knowledge!",
    "Types stay consistent!",
    "Math powers your logic!",
    "Comparisons make sense!",
    "Conditionals control flow!",
    "Loops repeat with purpose!",
    "While loops in sync!",
    "Functions = reusable code!",
    "Arrow functions are elegant!",
    "Arrays organize data!",
    "Methods transform arrays!",
    "Objects model reality!",
    "DOM is your canvas!",
    "Content changes dynamically!",
    "Interactive mastery achieved!"
  ]
};

// ════════════════════════════════════════════════════════════════════════════

function initGame() {
  loadLevels();
  loadProgress();
  updateLanguageBadge();
  renderDots();

  let start = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (!completedSet.has(i)) { start = i; break; }
    if (i === LEVELS.length - 1) start = 0;
  }
  loadLevel(start);
}

function updateLanguageBadge() {
  if (langBadge) {
    langBadge.textContent = currentLanguage.toUpperCase();
  }
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

function updateLineNumbers() {
  const lines = (editor.value.match(/\n/g) || []).length + 1;
  lineNums.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
}

function updatePreview() {
  const code = editor.value;

  if (currentLanguage === 'html') {
    // HTML: render directly
    previewFrame.srcdoc = code || '<!-- Start typing HTML -->';
  } else if (currentLanguage === 'css') {
    // CSS: apply to HTML target
    const lvl = LEVELS[currentIndex];
    const html = lvl.htmlTarget || '<div>Preview</div>';
    previewFrame.srcdoc = `
      <style>
        body { font-family: Arial, sans-serif; padding: 10px; }
        ${code}
      </style>
      ${html}
    `;
  } else if (currentLanguage === 'js') {
    // JS: show output and DOM
    const html = `
      <pre id="output" style="background: #222; color: #0f0; padding: 10px; font-family: monospace; overflow: auto;"></pre>
      <div id="dom-output" style="padding: 10px;"></div>
      <script>
        try {
          ${code}
          const output = document.getElementById('output');
          output.textContent = 'Code executed successfully! ✓';
        } catch(e) {
          const output = document.getElementById('output');
          output.textContent = 'Error: ' + e.message;
        }
      </script>
    `;
    previewFrame.srcdoc = html;
  }
}

function runValidation() {
  previewPulse.style.opacity = '1';
  const code = editor.value;
  const lvl = LEVELS[currentIndex];

  if (!code.trim()) {
    setStatus('empty', 'Write some code…');
    return;
  }

  try {
    let isValid = false;

    if (currentLanguage === 'html') {
      // HTML validation
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, 'text/html');
        isValid = lvl.validate(doc, code);
      } catch (e) {
        isValid = false;
      }
    } else if (currentLanguage === 'css') {
      // CSS validation - simplified approach
      try {
        isValid = lvl.validate(null, code);
      } catch (e) {
        isValid = false;
      }
    } else if (currentLanguage === 'js') {
      // JS validation
      try {
        isValid = lvl.validate(code);
      } catch (e) {
        isValid = false;
      }
    }

    if (isValid && !winTriggered) {
      winLevel();
    } else if (!isValid) {
      setStatus('invalid', 'Not quite right…');
    }
  } catch (e) {
    setStatus('error', 'Error detected');
  }
}

function winLevel() {
  if (winTriggered) return;
  winTriggered = true;

  completedSet.add(currentIndex);
  const xpGain = levelFailed ? 0 : LEVELS[currentIndex].xp;
  totalXP += xpGain;
  streak = levelFailed ? 0 : streak + 1;

  showConfetti();

  const messages = WIN_MESSAGES[currentLanguage] || WIN_MESSAGES.html;
  const msg = messages[currentIndex] || 'Great job!';

  winMessage.textContent = msg;
  winXPGain.textContent = xpGain > 0 ? `+${xpGain} XP` : 'Retry (0 XP)';
  winBadge.textContent = LEVELS[currentIndex].badge;

  const stars = levelFailed ? '⭐' : '⭐⭐⭐';
  winStars.textContent = stars;

  saveProgress();
  winOverlay.style.display = 'flex';
  setTimeout(() => { winOverlay.style.animation = 'fadeIn 0.4s'; }, 10);

  if (currentIndex === LEVELS.length - 1) {
    btnNext.textContent = '👑 Beat ' + currentLanguage.toUpperCase() + '!';
    setTimeout(() => {
      btnNext.onclick = () => window.location.href = 'index.html';
    }, 500);
  }
}

function showSmallHint() {
  hintStage++;
  if (hintStage === 1) {
    smallHintBox.style.display = 'block';
    btnHint.textContent = '💡 Full Hint (Fails Level)';
  } else if (hintStage === 2) {
    smallHintBox.style.display = 'none';
    fullHintBox.style.display = 'block';
    btnHint.disabled = true;
    btnHint.style.opacity = '0.5';
    levelFailed = true;
    setStatus('hint', 'Full hint revealed!');
  }
}

function resetCode() {
  editor.value = LEVELS[currentIndex].startCode || '';
  updateLineNumbers();
  updatePreview();
  setStatus('waiting', 'Code reset');
}

function nextLevel() {
  if (currentIndex === LEVELS.length - 1) {
    showComplete();
  } else {
    winOverlay.style.display = 'none';
    loadLevel(currentIndex + 1);
  }
}

function showComplete() {
  completeOverlay.style.display = 'flex';
  finalXPEl.textContent = `Total XP: ${totalXP} | Streak: ${streak} 🔥`;

  setTimeout(() => {
    completeOverlay.style.animation = 'fadeIn 0.4s';
  }, 10);

  document.querySelector('.challenge-panel').scrollTop = 0;
}

function setStatus(type, text) {
  statusText.textContent = text;
  statusDot.className = `status-dot ${type}`;
}

function updateHUD() {
  hudLevel.textContent = `${currentIndex + 1} / ${LEVELS.length}`;
  hudXP.textContent = totalXP;
  hudStreak.textContent = `${streak} 🔥`;
}

function updateProgress() {
  const percent = (completedSet.size / LEVELS.length) * 100;
  cpFill.style.width = percent + '%';
  cpLabel.textContent = `${completedSet.size} / ${LEVELS.length} complete`;
}

function renderDots() {
  levelDots.innerHTML = '';
  for (let i = 0; i < LEVELS.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (completedSet.has(i)) dot.classList.add('done');
    if (i === currentIndex) dot.classList.add('active');
    dot.onclick = () => loadLevel(i);
    levelDots.appendChild(dot);
  }
}

function saveProgress() {
  const key = `progress_${currentLanguage}`;
  const state = {
    completedSet: Array.from(completedSet),
    totalXP,
    streak,
    currentIndex
  };
  localStorage.setItem(key, JSON.stringify(state));
}

function loadProgress() {
  const key = `progress_${currentLanguage}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    const state = JSON.parse(saved);
    completedSet = new Set(state.completedSet);
    totalXP = state.totalXP || 0;
    streak = state.streak || 0;
  }
}

function showConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 5 + 3,
      life: 1,
      color: ['#00ff88', '#00d4ff', '#ff006e', '#ffb700'][Math.floor(Math.random() * 4)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.015;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(p.x, p.y, 10, 10);
    });
    ctx.globalAlpha = 1;

    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

// Initialize on load
window.addEventListener('load', initGame);
