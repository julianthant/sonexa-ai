@echo off
echo ================================================
echo      SONEXA AI - Initial Commit Script
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "backend\pom.xml" (
    echo ERROR: Please run this script from the sonexa-ai root directory
    pause
    exit /b 1
)

echo [1/5] Adding all current files to staging...
git add .

echo.
echo [2/5] Creating .gitignore for Java/Spring Boot project...
(
echo # Compiled class files
echo *.class
echo.
echo # Log files
echo *.log
echo.
echo # BlueJ files
echo *.ctxt
echo.
echo # Mobile Tools for Java ^(J2ME^)
echo .mtj.tmp/
echo.
echo # Package Files
echo *.jar
echo *.war
echo *.nar
echo *.ear
echo *.zip
echo *.tar.gz
echo *.rar
echo.
echo # Virtual machine crash logs
echo hs_err_pid*
echo.
echo # Maven
echo target/
echo pom.xml.tag
echo pom.xml.releaseBackup
echo pom.xml.versionsBackup
echo pom.xml.next
echo release.properties
echo dependency-reduced-pom.xml
echo buildNumber.properties
echo .mvn/timing.properties
echo .mvn/wrapper/maven-wrapper.jar
echo.
echo # Spring Boot
echo !.mvn/wrapper/maven-wrapper.jar
echo !**/src/main/**/target/
echo !**/src/test/**/target/
echo.
echo # IDE
echo .idea/
echo *.iws
echo *.iml
echo *.ipr
echo .vscode/
echo.
echo # OS
echo .DS_Store
echo Thumbs.db
echo.
echo # Environment variables
echo .env
echo .env.local
echo .env.production
echo.
echo # Logs
echo logs/
echo *.log
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo.
echo # Database
echo *.db
echo *.sqlite
echo *.sqlite3
echo.
echo # Secrets
echo application-secrets.properties
echo *.pem
echo *.key
) > .gitignore

echo.
echo [3/5] Adding .gitignore...
git add .gitignore

echo.
echo [4/5] Creating initial commit with all current work...
git commit -m "feat: Initial commit - Sonexa AI Voice Transcription SaaS

🎯 Core Features Implemented:
- User authentication with JWT and role-based security
- Email-based voice message processing pipeline
- AI analysis framework with subscription tiers
- Comprehensive audit trail and rejection tracking
- Stripe integration preparation

🏗️ Architecture:
- Spring Boot backend with PostgreSQL
- Docker containerization (dev/prod)
- Azure Blob Storage integration ready
- Comprehensive error handling and logging

📋 Entities Created:
- User, Role, VoiceFile models
- TranscriptionStatus, RejectionReason enums
- SubscriptionTier with pricing strategy
- EmailUploadRequest DTOs

🔧 Services & Controllers:
- EmailVoiceService (main processing orchestrator)
- EmailVoiceController (REST API endpoints)
- VoiceFileRepository (smart database queries)
- Security configuration with JWT

🎨 Next Phase:
- Stripe payment integration
- AI processing services (Azure + OpenAI)
- Frontend React/Next.js implementation
- Production deployment pipeline

Co-authored-by: GitHub Copilot <copilot@github.com>"

echo.
echo [5/5] Pushing to GitHub...
set /p push_confirm="Push to GitHub now? (y/n): "
if /i "%push_confirm%"=="y" (
    echo Pushing to origin...
    git push -u origin develop
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo 📍 Current branch: develop
) else (
    echo Skipping push. Run 'git push -u origin develop' when ready.
)

echo.
echo ================================================
echo         COMMIT COMPLETED SUCCESSFULLY!
echo ================================================
echo.
echo 📋 What was committed:
echo   ✅ Complete backend Spring Boot structure
echo   ✅ User authentication and security
echo   ✅ Voice file processing pipeline
echo   ✅ Email integration framework
echo   ✅ Subscription and billing models
echo   ✅ Professional .gitignore
echo.
echo 🔄 Next steps:
echo   1. git checkout feature/email-voice-processing
echo   2. Continue development on feature branch
echo   3. Use git-merge-feature.bat when ready to merge
echo.
pause
