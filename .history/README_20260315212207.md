# CodeQuest 🎮

An interactive, game-based learning platform for programming languages. Type code and watch it come to life in real-time—level up as you learn!

![HTML Track](https://img.shields.io/badge/HTML-Complete-00FF88?style=flat-square)
![CSS Track](https://img.shields.io/badge/CSS-Coming%20Soon-808080?style=flat-square)
![JavaScript Track](https://img.shields.io/badge/JavaScript-Coming%20Soon-808080?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 🚀 Features

### Interactive Learning
- **19 HTML Levels** across 6 progressive chapters
- **Real-time Live Preview** — See your code rendered instantly
- **Structured Lessons** — Each level teaches one concept clearly
- **Two-Tier Hint System** — Gentle guidance then full solution (with penalty)

### Gamification
- **XP System** — Earn 100-300 XP per level (bonus for solving without hints)
- **Streak Counter** — Maintain your momentum
- **Progress Tracking** — Visual progress bar and level dots
- **Achievements** — Star ratings (⭐⭐⭐) and confetti celebrations
- **Persistent Progress** — Your game saves automatically to localStorage

### Clean UI/UX
- **Dark Neon Theme** — Sleek glassmorphic design
- **Responsive Layout** — Desktop-optimized 3-panel interface
- **Smooth Animations** — Fade-ins, bounces, confetti effects
- **Status Indicators** — Real-time validation feedback

---

## 📚 Curriculum

### HTML Mastery (19 Levels)

| Chapter | Levels | Topics |
|---------|--------|--------|
| **HTML Basics** | 1-3 | `<h1>`, `<p>`, structure |
| **Text Formatting** | 4-6 | `<strong>`, `<em>`, `<img>` |
| **Links & Media** | 7-9 | `<a>`, `<img>` attributes |
| **Lists** | 10-12 | `<ul>`, `<ol>`, `<li>` |
| **Forms** | 13-15 | `<form>`, `<input>`, `<label>`, `<button>` |
| **Data & Advanced** | 16-19 | `<table>`, `<textarea>`, comments, meta-linking |

**Key Features:**
- Gentle pedagogical progression from single tags to multi-element structures
- Lessons integrated into each level (not just descriptions)
- Strict validation preventing "premature wins" — ensures proper tag closure
- Real examples that teach patterns, not spoiler code

---

## 🎮 How to Play

1. **Start** → Open `index.html` in your browser
2. **Read** → Understand the lesson and challenge
3. **Code** → Write HTML in the editor
4. **Preview** → Watch your code render live
5. **Validate** → Click "Check" when confident
6. **Earn XP** → Progress to the next level!

**Hint Strategy:**
- 💡 **First hint click** → Shows gentle guidance
- 💡 **Second hint click** → Shows full solution (⚠️ level fails, but you still learn!)

---

## 📁 Project Structure

```
CodeQuest/
├── index.html          # Landing page with menu & stats
├── game.html           # Main game screen (challenge/editor/preview)
├── css/
│   └── style.css       # Complete styling (1000+ lines)
├── js/
│   ├── game.js         # Game engine (state, validation, UI)
│   └── levels.js       # 19 level definitions with lessons & hints
├── README.md
└── .gitignore
```

### Key Files

**index.html** — Menu page showing:
- Language selection (HTML unlocked, CSS/JS/Python locked)
- Player stats (Total XP, Best Streak, Current Level)
- Particle background animation

**game.html** — Three-panel game interface:
- **Left Panel:** Challenge description, lessons, two-tier hints, progress bar
- **Middle Panel:** Code editor with line numbers
- **Right Panel:** Live preview iframe

**css/style.css** — Designed with:
- CSS variables for theming (primary, secondary, danger colors)
- Grid layout system (responsive design)
- Custom animations (fadeIn, bounceIn, confetti, xpFloat)
- Dark neon aesthetic with glassmorphism

**js/levels.js** — Array of 19 level objects:
```javascript
{
  id: 1,
  xp: 100,
  badge: '📝',
  chapter: 'HTML Basics',
  title: 'Your First Heading',
  lesson: '<p>...</p>',        // Teaching content
  description: '...',           // Challenge prompt
  smallHint: '...',             // Gentle guidance
  fullHint: '...',              // Full solution
  startCode: '',                // Initial code
  validate(doc, code) { ... }   // Validation function
}
```

**js/game.js** — Game engine handling:
- State management (currentIndex, XP, streak, hints)
- Real-time validation using DOMParser
- localStorage persistence
- UI updates (HUD, progress, confetti)
- Win overlays and animations

---

## 🛠️ Getting Started

### Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- No dependencies, no build process — pure HTML/CSS/JavaScript

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/IBNKHALID06/CodeQuest.git
   cd CodeQuest
   ```

2. **Open locally:**
   - Option A: Double-click `index.html` to open in your default browser
   - Option B: Use a local server (better for development):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server
     ```

3. **Play:**
   - Visit `http://localhost:8000` or open `index.html` directly
   - Click "Play HTML Track" to start
   - Work through all 19 levels!

---

## 🎯 Game Mechanics

### Validation System
- **DOMParser Analysis** — Parses raw HTML to verify structure
- **Tag Closure Checking** — Requires proper `<tag>` + `</tag>` pairs
- **Content Validation** — Tags must contain meaningful content
- **Attribute Validation** — Required attributes (src, href, alt) checked for correctness

**Example:** Level 6 (Images) requires:
```
✓ <img> tag exists
✓ src attribute with valid URL
✓ alt attribute with non-empty text
```

### XP & Streaks
- **Base XP:** 100-300 points per level
- **Hint Penalty:** No XP if you view the full hint
- **Streak Tracking:** Consecutive levels completed without hints
- **Persistence:** Stats saved to localStorage (survives page refresh)

### Progress Tracking
- **Visual Dots:** One per level (🟢 completed, ⚪ locked, ⭕ current)
- **Progress Bar:** Dynamic percentage based on completed levels
- **Final Screen:** "YOU BEAT HTML!" with total XP earned

---

## 🚧 Future Roadmap

### CSS Track (Coming Soon)
- 15 levels covering selectors, properties, layouts, Flexbox, Grid
- Interactive styling challenges
- Pre-built HTML for styling practice

### JavaScript Track (Coming Soon)
- 15 levels on syntax, DOM manipulation, events, functions
- Console validation and DOM testing
- Interactive mini-projects

### Python Track (Coming Soon)
- 15 levels on fundamentals, data structures, algorithms
- Browser-based Python execution

---

## 💻 Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Storage** | localStorage for progress persistence |
| **Validation** | DOMParser API for HTML parsing |
| **Preview** | iframe.srcdoc for live rendering |
| **Fonts** | Google Fonts (Press Start 2P, Fira Code, Inter) |
| **Build** | No build process — static files |

---

## 🎨 Design Philosophy

CodeQuest follows these principles:

1. **Learn by Doing** — Code in the editor, see results instantly
2. **Progressive Complexity** — Start simple, build to multi-element challenges
3. **Pedagogical Integrity** — Hints teach, not spoil (two-tier system)
4. **Gamification** — XP, streaks, achievements to stay motivated
5. **Accessibility** — Clear lessons, helpful error messages, visual feedback
6. **Zero Friction** — No sign-ups, no servers, no build steps

---

## 📊 Statistics

- **19 Levels** in HTML track
- **1000+ Lines** of CSS (animations, layouts, themes)
- **350+ Lines** of game logic (state, validation, persistence)
- **6 Chapters** progressing from basics to advanced
- **2-Tier Hint System** (gentle → full solution)
- **100% Client-Side** (no backend, no external APIs)

---

## 🤝 Contributing

Have ideas? Found a bug? Want to build the CSS or JS tracks?

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

You're free to:
- ✅ Use CodeQuest for learning
- ✅ Fork and modify for your own projects
- ✅ Deploy to your own server
- ✅ Build on top of it (CSS/JS/Python tracks)

---

## 🙌 Acknowledgments

Built with ❤️ as an experiment in making programming education interactive and fun.

Special thanks to:
- DOMParser API for smart validation
- CSS Grid/Flexbox for responsive layouts
- localStorage for seamless persistence

---

## 📞 Contact & Support

- **Creator:** [@IBNKHALID06](https://github.com/IBNKHALID06)
- **Issues:** [GitHub Issues](https://github.com/IBNKHALID06/CodeQuest/issues)
- **Discussions:** [GitHub Discussions](https://github.com/IBNKHALID06/CodeQuest/discussions)

---

**Happy coding! Level up with CodeQuest.** 🚀
