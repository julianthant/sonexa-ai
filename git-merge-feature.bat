@echo off
echo ================================================
echo      SONEXA AI - Feature Merge Script
echo ================================================
echo.

REM Get current branch name
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

echo Current branch: %CURRENT_BRANCH%
echo.

REM Check if we're on a feature branch
echo %CURRENT_BRANCH% | findstr /C:"feature/" >nul
if errorlevel 1 (
    echo ERROR: You must be on a feature branch to use this script
    echo Current branch: %CURRENT_BRANCH%
    echo Expected: feature/branch-name
    pause
    exit /b 1
)

echo [1/7] Ensuring all changes are committed...
git status --porcelain > temp_status.txt
set /p status_check=<temp_status.txt
del temp_status.txt

if not "%status_check%"=="" (
    echo WARNING: You have uncommitted changes!
    git status
    echo.
    set /p commit_confirm="Commit these changes first? (y/n): "
    if /i "%commit_confirm%"=="y" (
        set /p commit_message="Enter commit message: "
        git add .
        git commit -m "!commit_message!"
    ) else (
        echo Please commit or stash changes before merging.
        pause
        exit /b 1
    )
)

echo.
echo [2/7] Switching to develop branch...
git checkout develop

echo.
echo [3/7] Pulling latest changes from remote...
git pull origin develop

echo.
echo [4/7] Merging %CURRENT_BRANCH% into develop...
git merge %CURRENT_BRANCH% --no-ff -m "feat: Merge %CURRENT_BRANCH% into develop

✨ Feature completed and integrated
🔄 Ready for testing in develop environment"

if errorlevel 1 (
    echo.
    echo ❌ MERGE CONFLICT DETECTED!
    echo Please resolve conflicts manually:
    echo   1. Fix conflicts in affected files
    echo   2. git add [resolved-files]
    echo   3. git commit
    echo   4. Run this script again
    pause
    exit /b 1
)

echo.
echo [5/7] Pushing updated develop branch...
git push origin develop

echo.
echo [6/7] Cleaning up: Deleting merged feature branch...
set /p delete_confirm="Delete feature branch %CURRENT_BRANCH%? (y/n): "
if /i "%delete_confirm%"=="y" (
    git branch -d %CURRENT_BRANCH%
    git push origin --delete %CURRENT_BRANCH%
    echo ✅ Feature branch deleted locally and remotely
) else (
    echo Feature branch kept for reference
)

echo.
echo [7/7] Creating next feature branch (optional)...
set /p next_feature="Create new feature branch? Enter name (or press Enter to skip): "
if not "%next_feature%"=="" (
    git checkout -b feature/%next_feature%
    echo ✅ Created and switched to feature/%next_feature%
) else (
    echo Staying on develop branch
)

echo.
echo ================================================
echo        FEATURE MERGE COMPLETED SUCCESSFULLY!
echo ================================================
echo.
echo 📋 What happened:
echo   ✅ Feature branch merged into develop
echo   ✅ Changes pushed to GitHub
echo   ✅ Branch cleanup completed
echo.
echo 🔄 Current status:
git branch --show-current
git log --oneline -3
echo.
pause
