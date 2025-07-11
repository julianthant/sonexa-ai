@echo off
echo ================================================
echo      SONEXA AI - README Update Script
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "README.md" (
    echo ERROR: README.md not found. Please run from project root.
    pause
    exit /b 1
)

echo [1/5] Analyzing current codebase...

REM Count files and lines of code
for /f %%a in ('dir /s /b *.java ^| find /c /v ""') do set JAVA_FILES=%%a
for /f %%a in ('dir /s /b *.md ^| find /c /v ""') do set DOC_FILES=%%a
for /f %%a in ('dir /s /b *.yml *.yaml ^| find /c /v ""') do set CONFIG_FILES=%%a

REM Get current date
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set DATE=%datetime:~6,2%/%datetime:~4,2%/%datetime:~0,4%

echo Found %JAVA_FILES% Java files, %DOC_FILES% documentation files, %CONFIG_FILES% config files

echo.
echo [2/5] Checking Git status...
git status --porcelain > temp_git_status.txt

echo.
echo [3/5] Generating feature list from codebase...
(
echo ### 📊 **Current Codebase Statistics** ^(Updated: %DATE%^)
echo.
echo - **Java Files**: %JAVA_FILES%
echo - **Documentation**: %DOC_FILES% 
echo - **Configuration**: %CONFIG_FILES%
echo - **Total Commits**: 
git rev-list --count HEAD 2>nul || echo "No commits yet"
echo - **Current Branch**: 
git branch --show-current 2>nul || echo "No branch"
echo - **Last Updated**: %DATE%
echo.
) > codebase_stats.tmp

echo.
echo [4/5] Scanning for completed features...
(
echo ### ✅ **Implemented Features** ^(Auto-detected^)
echo.
echo **Backend Core:**
findstr /S /I "class.*Controller" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ REST API Controllers || echo - ❌ REST API Controllers
findstr /S /I "class.*Service" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Business Logic Services || echo - ❌ Business Logic Services  
findstr /S /I "interface.*Repository" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Data Access Layer || echo - ❌ Data Access Layer
findstr /S /I "@Entity" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ JPA Entities || echo - ❌ JPA Entities
echo.
echo **Security & Authentication:**
findstr /S /I "JWT\|@Secured\|SecurityConfig" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ JWT Authentication || echo - ❌ JWT Authentication
findstr /S /I "PasswordEncoder\|BCrypt" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Password Encryption || echo - ❌ Password Encryption
findstr /S /I "Role\|@PreAuthorize" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Role-Based Access Control || echo - ❌ Role-Based Access Control
echo.
echo **Voice Processing:**
findstr /S /I "VoiceFile\|EmailVoice\|Transcription" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Voice File Processing || echo - ❌ Voice File Processing
findstr /S /I "AI\|Azure\|OpenAI" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ AI Integration Framework || echo - ❌ AI Integration Framework
findstr /S /I "Rejection\|Spam\|Duplicate" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Intelligent Filtering || echo - ❌ Intelligent Filtering
echo.
echo **Subscription & Billing:**
findstr /S /I "Subscription\|Stripe\|Payment" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Subscription Management || echo - ❌ Subscription Management
findstr /S /I "Tier\|Usage\|Limit" backend\src\main\java\*.java >nul 2>&1 && echo - ✅ Usage Tracking || echo - ❌ Usage Tracking
echo.
echo **DevOps & Infrastructure:**
if exist "docker-compose.yml" echo - ✅ Docker Containerization || echo - ❌ Docker Containerization
if exist "Dockerfile" echo - ✅ Container Configuration || echo - ❌ Container Configuration
if exist ".github\workflows\*.yml" echo - ✅ CI/CD Pipeline || echo - ❌ CI/CD Pipeline
echo.
) > features_status.tmp

echo.
echo [5/5] Updating README.md sections...

REM Create backup
copy README.md README.md.bak >nul

REM Create the updated sections
(
type codebase_stats.tmp
echo.
type features_status.tmp
) > readme_update.tmp

REM Use PowerShell to update the README with new statistics
powershell -Command "& {$content = Get-Content 'README.md' -Raw; $stats = Get-Content 'readme_update.tmp' -Raw; if ($content -match '### 📊.*?(?=###|\z)') { $content = $content -replace '### 📊.*?(?=###)', ($stats + '### ') } else { $content = $content -replace '(## 🎯 Overview)', ('### 📊 **Current Status**' + \"`n`n\" + $stats + \"`n`n\" + '$1') }; Set-Content 'README.md' -Value $content -NoNewline}"

echo Backup created: README.md.bak
echo README.md updated with current statistics!
echo.
echo ================================================
echo        README UPDATE COMPLETED!
echo ================================================
echo.
echo 📊 Current Status:
type codebase_stats.tmp
echo.
echo ✅ Features Detected:
type features_status.tmp
echo.
echo 📝 What to do next:
echo   1. Review the updated statistics above
echo   2. Manually update any specific sections in README.md
echo   3. Commit changes: git add README.md && git commit -m "docs: update README with current codebase status"
echo.
echo 💡 Pro tip: Run this script before every commit to keep README current!
echo.

REM Cleanup temp files
del temp_git_status.txt 2>nul
del codebase_stats.tmp 2>nul  
del features_status.tmp 2>nul
del readme_update.tmp 2>nul

pause
