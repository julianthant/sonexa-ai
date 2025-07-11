# 🚀 Sonexa AI - Professional Git Workflow Guide

## 📋 Quick Start Commands

### Initial Setup (Run Once)

```bash
# 1. Set up branch structure
git-setup.bat

# 2. Commit all current work
git-commit-initial.bat
```

### Daily Development Workflow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Work on feature (commit often)
git add .
git commit -m "feat: add user authentication logic"

# 3. Merge completed feature
git-merge-feature.bat
```

### Production Release

```bash
# When develop is stable and ready
git-release.bat
```

---

## 🌳 Branch Structure

```
main (production)
├── develop (integration)
│   ├── feature/user-authentication
│   ├── feature/ai-processing
│   ├── feature/stripe-integration
│   └── feature/email-voice-processing
├── hotfix/critical-fixes
└── release/v1.0.0
```

---

## 📝 Branch Purposes

### `main`

- **Production-ready code only**
- **Direct commits forbidden**
- Only accepts merges from release branches
- Tagged with version numbers (v1.0.0, v1.1.0)

### `develop`

- **Integration branch for all features**
- Features merge here first for testing
- Should always be deployable to staging
- Source for creating release branches

### `feature/*`

- **Individual feature development**
- Branched from `develop`
- Merged back to `develop` when complete
- Naming: `feature/stripe-integration`, `feature/ai-processing`

### `release/*`

- **Preparation for production deployment**
- Final testing and bug fixes only
- Version bumping and release notes
- Merged to both `main` and `develop`

### `hotfix/*`

- **Critical production bug fixes**
- Branched from `main`
- Merged to both `main` and `develop`
- For urgent fixes that can't wait for next release

---

## 🔄 Workflow Examples

### Adding a New Feature

```bash
# 1. Start from latest develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-profile-management

# 3. Develop the feature (multiple commits)
git add src/components/UserProfile.js
git commit -m "feat: add user profile component"

git add src/api/userService.js
git commit -m "feat: add user profile API service"

git add tests/userProfile.test.js
git commit -m "test: add user profile component tests"

# 4. Merge when complete
git-merge-feature.bat
```

### Preparing a Release

```bash
# 1. Ensure develop is stable
git checkout develop
git pull origin develop

# 2. Run tests, check everything works
npm test
npm run build

# 3. Create release
git-release.bat
# Enter version: v1.2.0
```

### Emergency Hotfix

```bash
# 1. Branch from main
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-bug

# 2. Fix the critical issue
git add src/payments/stripeService.js
git commit -m "hotfix: fix payment processing timeout"

# 3. Merge to main and develop
git checkout main
git merge hotfix/fix-payment-bug
git tag -a v1.1.1 -m "Hotfix v1.1.1: Payment processing fix"
git push origin main --tags

git checkout develop
git merge hotfix/fix-payment-bug
git push origin develop

# 4. Cleanup
git branch -d hotfix/fix-payment-bug
```

---

## 📋 Commit Message Standards

### Format

```
type(scope): brief description

Detailed explanation if needed
- Bullet points for multiple changes
- Reference issue numbers: #123

Co-authored-by: Name <email@example.com>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic changes)
- **refactor**: Code restructuring (no feature changes)
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, etc.
- **perf**: Performance improvements
- **security**: Security-related changes

### Examples

```bash
feat(auth): add JWT token refresh mechanism

- Implement automatic token refresh
- Add refresh token storage
- Handle token expiration gracefully
- Fixes #42

fix(email): resolve attachment processing timeout

The email service was timing out on large audio files.
Added streaming processing and increased timeout limits.

chore(deps): update Spring Boot to 3.2.0

- Update all Spring dependencies
- Resolve security vulnerabilities
- Update documentation
```

---

## 🚨 Important Rules

### ❌ Never Do This

- Direct commits to `main`
- Force push to shared branches (`git push --force`)
- Merge unfinished features to `develop`
- Delete `main` or `develop` branches

### ✅ Always Do This

- Work in feature branches
- Write descriptive commit messages
- Test before merging
- Keep commits focused and atomic
- Pull before pushing

---

## 🛠️ Helpful Commands

### Check Status

```bash
git status                    # Current changes
git branch -a                 # All branches
git log --oneline -10         # Recent commits
```

### Sync with Remote

```bash
git fetch origin             # Get latest remote info
git pull origin develop      # Update current branch
```

### Cleanup

```bash
git branch -d feature/old-feature     # Delete local branch
git push origin --delete feature/old-feature  # Delete remote branch
git remote prune origin      # Clean up stale remote references
```

### Emergency Recovery

```bash
git reflog                   # See all recent actions
git reset --hard HEAD~1      # Undo last commit (careful!)
git checkout main -- file.js # Restore file from main
```

---

## 🎯 Benefits of This Workflow

### For Solo Development

- **Clean history**: Easy to track what changed when
- **Safe experimentation**: Features isolated until ready
- **Easy rollbacks**: Can revert specific features
- **Professional portfolio**: Shows proper Git skills

### For Team Collaboration

- **No conflicts**: Everyone works on separate features
- **Code review**: Features reviewed before merging
- **Stable main**: Production always deployable
- **Clear releases**: Tagged versions for deployment

### For Production

- **Reliable deployments**: Only tested code reaches production
- **Easy debugging**: Clear history of what was deployed when
- **Quick hotfixes**: Can fix critical issues without affecting development
- **Rollback capability**: Can quickly revert to previous versions

---

This workflow scales from solo projects to enterprise teams and is used by companies like GitHub, GitLab, and Microsoft!
