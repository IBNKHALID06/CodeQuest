# Changelog

All notable changes to CodeQuest are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [2.0.0] — 2026-03-17

### 🎉 CSS & JavaScript Tracks Released!

**CodeQuest now has 49 levels across 3 programming languages.**

Major expansion adding CSS and JavaScript tracks with multi-track game engine supporting independent progress tracking.

### ✨ Added

#### CSS Track (15 Levels)
- **Curriculum:** Selectors, properties, box model, Flexbox, Grid, positioning, animations, responsive design
- **Topics:** Classes/IDs, colors, fonts, margins, padding, borders, display properties, transitions, media queries, @keyframes
- **Validation:** Real-time CSS property checking
- **Progressive:** From basic selectors to complete styled cards

#### JavaScript Track (15 Levels)
- **Curriculum:** Variables, operators, control flow, functions, arrays, objects, DOM, events
- **Topics:** Data types, conditionals, loops, arrow functions, array methods, object manipulation, DOM selection
- **Validation:** Function execution and result checking
- **Progressive:** From simple variables to interactive functions

#### Multi-Track Engine
- URL parameter-based language routing (`?lang=html|css|js`)
- Independent progress saving per language (localStorage keys: `progress_html`, `progress_css`, `progress_js`)
- Dynamic UI updates (language badge, completion messages, progress bars)
- Separate XP pools and streak tracking per language
- Unified hint system across all tracks

#### New Game Files
- `js/css-levels.js` — 15 CSS level definitions with htmlTarget for styling
- `js/js-levels.js` — 15 JavaScript level definitions with validation functions
- Rewrote `js/game.js` — 400+ lines of multi-track engine code

#### Updated Files
- `index.html` — CSS and JS tracks now unlocked and playable
- `game.html` — Dynamic language badge and completion messages
- `js/levels.js` — Renamed `LEVELS` → `LESSONS` to avoid naming conflicts

### 🎮 How It Works (Updated)
- **HTML:** Parse and validate DOM structure
- **CSS:** Apply styles to pre-built HTML and validate computed styles  
- **JavaScript:** Execute code and validate return values/behavior

### 📊 Stats
- **Total Levels:** 49 (19 HTML + 15 CSS + 15 JS)
- **Total XP Available:** 5,200+ XP across all tracks (1,900 HTML + 2,650 CSS + 2,650 JS)
- **Code Size:** 600+ lines of multi-track engine logic

---

## [1.0.0] — 2026-03-15

### 🎉 Initial Release

**CodeQuest HTML Track is live!**

A complete, game-based HTML learning platform with 19 progressive levels, gamification mechanics, and real-time code validation.

### ✨ Added

#### Core Features
- **19 HTML Levels** across 6 chapters (HTML Basics → Advanced)
- **Real-time Live Preview** — iframe.srcdoc rendering
- **Structured Lessons** — Teaching content integrated into each level
- **Two-Tier Hint System** — Gentle guidance → full solution with penalty
- **Gamification**
  - XP system (100-300 points per level)
  - Streak tracking (consecutive completions)
  - Star ratings (⭐⭐⭐)
  - Progress persistence via localStorage

#### UI/UX
- **Dark Neon Theme** — Glassmorphic design with CSS variables
- **3-Panel Interface** — Challenge | Editor | Preview
- **Responsive Layout** — Desktop-first, mobile-friendly
- **Animations**
  - Fade-in/bounce effects
  - Confetti celebration on win
  - Floating XP indicators
  - Particle background on menu

#### Game Mechanics
- **Smart Validation**
  - DOMParser for HTML structure analysis
  - Tag closure enforcement (requires both `<tag>` and `</tag>`)
  - Content validation (non-empty attributes, meaningful text)
  - Prevents premature wins from incomplete code
- **Level Progression** — Linear unlocking system
- **Status Indicators** — Progress dots, XP/streak HUD, validation feedback

#### Content
- **Chapter 1:** HTML Basics (`<h1>`, `<p>`, structure)
- **Chapter 2:** Text Formatting (`<strong>`, `<em>`, `<img>`)
- **Chapter 3:** Links & Media (`<a>` tags, img attributes)
- **Chapter 4:** Lists (`<ul>`, `<ol>`, `<li>`)
- **Chapter 5:** Forms (`<form>`, `<input>`, `<label>`, `<button>`, `<textarea>`, `<select>`)
- **Chapter 6:** Advanced (`<table>`, HTML comments, meta-linking)

#### Developer Experience
- Zero dependencies (pure HTML/CSS/JavaScript)
- No build process required
- Modular level system (easy to add new levels)
- Clean code organization (game.js, levels.js, style.css)
- localStorage API for persistence

#### Documentation
- Comprehensive README with features, curriculum, structure
- LICENSE (GPLv3 — non-commercial, free to learn/modify)
- Project structure documentation

### 🐛 Known Issues

None in initial release — fully tested across all 19 levels.

### 📋 Testing

All features validated:
- ✅ All 19 levels playable and winnable
- ✅ Validation prevents premature wins
- ✅ Hint system works (gentle → full with penalty)
- ✅ Progress persists across sessions
- ✅ UI responsive on desktop/tablet/mobile
- ✅ No console errors
- ✅ Animations smooth and performant

---

## [Unreleased] — Roadmap

### 🎨 Planned Features

#### Python Track (v3.0.0)
- 15 levels on fundamentals, data structures, algorithms
- Browser-based Python execution (PyScript)
- Console output validation
- Interactive problem-solving

#### General Improvements (v2.x - v3.x)
- Difficulty stars (easy/medium/hard per level)
- Mini-projects (multi-level challenges)
- Achievement system (speedrun, perfect streak, etc.)
- Code review/submission system
- Leaderboard (optional backend)
- Accessibility audits (WCAG 2.1)
- Dark/Light theme toggle
- Code themes (Monokai, Dracula, One Dark, etc.)
- Social sharing (screenshots, scores)
- Multiplayer challenges (future)

### 🔄 Potential Backend Features
- User accounts & authentication
- Cloud progress sync
- Leaderboards & rankings
- Community code gallery
- Achievement tracking
- Analytics & learning insights

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| 2.0.0 | 2026-03-17 | ✅ Released (CSS + JS) |
| 1.0.0 | 2026-03-15 | ✅ Released (HTML) |
| 3.0.0 | TBD | 🔜 Python Track |

---

## 🙏 Contributors

- **IBNKHALID06** — Creator & maintainer

Special thanks to early testers and feedback providers.

---

## 📞 How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues, feature requests, and pull requests.
