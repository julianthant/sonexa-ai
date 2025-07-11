@echo off
echo ================================================
echo      SONEXA AI - Professional Git Setup
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "backend\pom.xml" (
    echo ERROR: Please run this script from the sonexa-ai root directory
    pause
    exit /b 1
)

echo [1/6] Checking current Git status...
git status

echo.
echo [2/6] Creating develop branch (main integration branch)...
git checkout -b develop 2>nul || git checkout develop

echo.
echo [3/6] Creating feature branches for our components...
git checkout -b feature/user-authentication 2>nul || echo Branch feature/user-authentication already exists
git checkout -b feature/ai-processing 2>nul || echo Branch feature/ai-processing already exists  
git checkout -b feature/stripe-integration 2>nul || echo Branch feature/stripe-integration already exists
git checkout -b feature/email-voice-processing 2>nul || echo Branch feature/email-voice-processing already exists

echo.
echo [4/6] Switching back to develop branch...
git checkout develop

echo.
echo [5/6] Current branch structure:
git branch -a

echo.
echo [6/6] Ready for professional workflow!
echo.
echo ================================================
echo           WORKFLOW INSTRUCTIONS
echo ================================================
echo.
echo 1. Work on features in feature branches
echo 2. Merge completed features to develop
echo 3. Merge stable develop to main for releases
echo.
echo Next steps:
echo   1. Run: git-commit-initial.bat (to commit current work)
echo   2. Work on: feature/email-voice-processing branch
echo   3. Use: git-merge-feature.bat when ready
echo.
pause
