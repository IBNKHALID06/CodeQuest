# Contributing to CodeQuest

Thanks for your interest in contributing! 🎉 CodeQuest is built by the community, and we love pull requests.

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive. We're here to learn and build together.

---

## 🚀 How to Contribute

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR-USERNAME/CodeQuest.git
cd CodeQuest
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- **Bug Fix?** Create a branch like `fix/bug-name`
- **New Feature?** Create a branch like `feature/feature-name`
- **CSS/JS Track?** Create a branch like `feature/css-track`

### 3. Code Style
Keep it clean and readable:
- **JavaScript:** Use ES6+ syntax, descriptive variable names
- **HTML:** Semantic markup, proper indentation (2 spaces)
- **CSS:** Use CSS variables, organize by component
- Comment your code where logic isn't obvious

### 4. Test Your Changes
- Test all 19 HTML levels manually
- Ensure no validation regressions
- Check responsiveness on different screen sizes
- Verify localStorage persistence works

### 5. Commit & Push
```bash
git add .
git commit -m "Clear, descriptive message"
# Examples:
# "Fix: Prevent premature wins on Level 6"
# "Feature: Add CSS track (15 levels)"
# "Docs: Update README with screenshots"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request
- Link any related GitHub issues
- Describe what you changed and why
- Include before/after behavior if applicable
- Request review from maintainers

---

## 🎯 Contribution Ideas

### High Impact
- ✅ **CSS Track** — 15 levels teaching selectors, layouts, Flexbox, Grid
- ✅ **JavaScript Track** — 15 levels on syntax, DOM, events, functions
- ✅ **Python Track** — 15 levels on fundamentals (requires backend)
- ✅ **Bug Fixes** — Found an issue? Report or fix it!

### Medium Impact
- ✅ Improve existing level lessons for clarity
- ✅ Add more test cases or edge cases
- ✅ Enhance UI/UX (animations, accessibility, dark mode variants)
- ✅ Add keyboard shortcuts (Enter to validate, Esc to menu, etc.)

### Documentation
- ✅ Improve README with better examples
- ✅ Add troubleshooting guide
- ✅ Create video tutorials
- ✅ Write blog post about CodeQuest

---

## 📋 Commit Message Guidelines

Use clear, imperative commit messages:

```
[Type]: Brief description

Longer explanation if needed.

Type: fix|feature|docs|style|refactor|test|chore
```

### Examples
```
Feature: Add CSS selector validation for Level 1
Fix: Prevent empty input from triggering premature win
Docs: Add GitHub Pages deployment guide
Refactor: Organize level validation logic into helpers
Test: Add edge case tests for table validation
```

---

## 🧪 Testing Checklist

Before submitting a PR:

- [ ] All 19 HTML levels still work
- [ ] New levels validate correctly
- [ ] No console errors
- [ ] localStorage persists progress
- [ ] Hint system works (2-tier)
- [ ] Win animations trigger properly
- [ ] UI responsive on mobile/tablet
- [ ] Accessibility check (keyboard navigation, screen readers)

---

## ❓ Questions or Issues?

- **Bug Report?** Open a GitHub Issue with reproduction steps
- **Feature Request?** Open a GitHub Discussion
- **Question?** Ask in Discussions or comment on related Issues

---

## 📜 License

By contributing, you agree your work is licensed under GPLv3. See LICENSE file.

This means:
- Your contribution stays free (non-commercial)
- Others can modify and learn from it
- Credit remains in the codebase

---

## 🙌 Thanks!

Every contribution — code, docs, ideas, feedback — makes CodeQuest better. Welcome to the community! 🚀
