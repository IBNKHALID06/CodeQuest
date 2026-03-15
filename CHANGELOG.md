# Changelog

All notable changes to CodeQuest are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

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

#### CSS Track (v1.1.0)
- 15 levels on selectors, properties, layout, Flexbox, Grid
- Pre-built HTML to style
- Validation via computed styles
- CSS-specific themes and challenges

#### JavaScript Track (v1.2.0)
- 15 levels on syntax, DOM, events, functions
- Console output validation
- DOM manipulation challenges
- Real mini-projects (to-do app, calculator, etc.)

#### Python Track (v1.3.0)
- 15 levels on fundamentals, data structures, algorithms
- Browser-based Python execution (PyScript)
- Console output validation
- Interactive problem-solving

#### General Improvements (v1.x.x)
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
| 1.0.0 | 2026-03-15 | ✅ Released |
| 1.1.0 | TBD | 🔜 CSS Track |
| 1.2.0 | TBD | 🔜 JS Track |
| 1.3.0 | TBD | 🔜 Python Track |

---

## 🙏 Contributors

- **IBNKHALID06** — Creator & maintainer

Special thanks to early testers and feedback providers.

---

## 📞 How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues, feature requests, and pull requests.
