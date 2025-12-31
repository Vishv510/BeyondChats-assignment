# Git Setup & Commit Strategy

This document outlines the Git workflow used for this project.

## Initial Setup

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "chore: initial project setup"

# Create GitHub repository (via GitHub web interface)

# Add remote
git remote add origin https://github.com/your-username/beyondchats-optimizer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Branch Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Development branch for integration

### Feature Branches
- `feature/phase-1-scraping`: Web scraping implementation
- `feature/phase-2-optimization`: AI optimization pipeline
- `feature/phase-3-frontend`: React UI development
- `fix/gemini-api`: Bug fixes
- `docs/readme`: Documentation updates

---

## Commit Message Convention

Following [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(backend): implement BeyondChats scraper
fix(llm): correct Gemini API response parsing
docs(readme): add architecture diagram
style(frontend): format ArticleViewer component
refactor(node): improve error handling in scrapeService
test(api): add unit tests for article endpoints
chore(deps): update dependencies
```

---

## Development Journey Commits

This project followed a structured commit history showing development phases:

### Phase 1: Foundation (Days 1-2)
```bash
git commit -m "chore: initialize project structure"
git commit -m "feat(backend): setup FastAPI with basic structure"
git commit -m "feat(backend): add MongoDB connection with Motor"
git commit -m "feat(scraper): implement BeyondChats blog scraper"
git commit -m "feat(api): create CRUD endpoints for articles"
git commit -m "feat(backend): add automatic scraping on startup"
git commit -m "test(backend): verify article fetching and storage"
```

### Phase 2: AI Pipeline (Days 3-5)
```bash
git commit -m "feat(node): initialize Node.js optimization script"
git commit -m "feat(node): integrate SerpAPI for Google Search"
git commit -m "feat(node): implement article content scraping"
git commit -m "feat(llm): add Google Gemini AI integration"
git commit -m "feat(node): create full optimization workflow"
git commit -m "fix(llm): correct API response parsing"
git commit -m "feat(node): add reference citation system"
git commit -m "refactor(node): improve error handling"
```

### Phase 3: Frontend (Days 6-7)
```bash
git commit -m "feat(frontend): initialize React + Vite + Tailwind"
git commit -m "feat(ui): create Header component"
git commit -m "feat(ui): implement ArticleList with selection"
git commit -m "feat(ui): build ArticleViewer with markdown rendering"
git commit -m "feat(ui): add toggle between original/optimized"
git commit -m "style(ui): design reference section with hover effects"
git commit -m "feat(ui): make responsive for mobile"
git commit -m "feat(ui): add loading states"
```

### Documentation & Polish (Day 8)
```bash
git commit -m "docs(readme): create comprehensive README"
git commit -m "docs: add architecture diagram"
git commit -m "docs(deploy): create deployment guide"
git commit -m "chore: add .gitignore for all environments"
git commit -m "chore(deps): add requirements.txt for Python"
git commit -m "feat(root): add concurrently for easy startup"
git commit -m "docs(contributing): add contribution guidelines"
git commit -m "ci: add GitHub Actions workflow"
git commit -m "docs(readme): add troubleshooting section"
git commit -m "chore: final cleanup and testing"
```

---

## How to Maintain Good Commit History

### DO:
- ✅ Commit frequently (every major change)
- ✅ Write clear, descriptive messages
- ✅ Use conventional commit format
- ✅ Keep commits focused (one feature/fix per commit)
- ✅ Test before committing

### DON'T:
- ❌ Make huge commits with multiple changes
- ❌ Use vague messages like "fix stuff" or "update"
- ❌ Commit broken code
- ❌ Mix multiple features in one commit

---

## Example Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... code changes ...

# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(component): add new feature description"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge after review

# Update main
git checkout main
git pull origin main
```

---

## Git Commands Cheatsheet

```bash
# Check status
git status

# View commit history
git log --oneline

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View remote URL
git remote -v

# Pull latest changes
git pull origin main

# Push changes
git push origin branch-name

# View branches
git branch -a

# Delete branch
git branch -d branch-name
```

---

## For Reviewers

To see the development journey:

```bash
# Clone repository
git clone https://github.com/your-username/beyondchats-optimizer.git

# View commit history
git log --oneline --graph --all

# See specific commit
git show <commit-hash>

# View changes over time
git log --stat

# See who changed what
git blame filename.py
```

---

## Recommended Git Tools

- **GitHub Desktop**: GUI for Git
- **GitKraken**: Visual Git client
- **VS Code Git**: Built-in Git support
- **Oh My Zsh**: Enhanced terminal with Git info

---

## Pre-commit Checklist

Before every commit:

- [ ] Code runs without errors
- [ ] No console.log/print statements (unless intentional)
- [ ] Formatted code (Prettier/Black)
- [ ] Updated relevant documentation
- [ ] Tested the specific change
- [ ] Meaningful commit message written

---

## Tags for Releases

```bash
# Create tag for submission
git tag -a v1.0.0 -m "Assignment submission version"

# Push tag
git push origin v1.0.0

# List tags
git tag -l
```

---

## GitHub Repository Best Practices

1. **Add Topics**: `react`, `fastapi`, `ai`, `web-scraping`, `mongodb`
2. **Add Description**: "AI-powered article optimizer using FastAPI, Node.js, and React"
3. **Add Website**: Link to deployed frontend
4. **Enable Issues**: For tracking bugs/features
5. **Add License**: MIT or similar
6. **Pin Important Repos**: Make this visible on your profile

---

## Final Submission Checklist

- [ ] All code committed and pushed
- [ ] README.md is comprehensive
- [ ] .gitignore is properly configured
- [ ] Frequent commits showing development journey
- [ ] Repository is public
- [ ] Deployment links added to README
- [ ] No sensitive data (API keys) in commits
- [ ] Clean commit history
- [ ] Documentation is complete