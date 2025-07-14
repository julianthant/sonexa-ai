@echo off
echo.
echo 🔄 Restarting Sonexa AI Backend with H2 Database...
echo =================================================
echo.

cd "c:\Users\Julian\Work\Web Apps\sonexa-ai\backend"

echo 📦 Building application...
.\mvnw.cmd clean compile -q

echo.
echo 🚀 Starting Spring Boot application...
echo ✅ H2 in-memory database configured
echo ✅ Database will be created automatically
echo ✅ No PostgreSQL installation required
echo.
echo 🌐 Application will start on: http://localhost:8080
echo 📊 H2 Database Console: http://localhost:8080/h2-console
echo.
echo Press Ctrl+C to stop the server
echo.

.\mvnw.cmd spring-boot:run
