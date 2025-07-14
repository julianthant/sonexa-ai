@echo off
REM Backend API Testing Script for Sonexa AI Authentication System
REM This script tests all authentication endpoints manually

echo.
echo 🧪 Testing Sonexa AI Backend Authentication System
echo =================================================
echo.

REM Configuration
set BASE_URL=http://localhost:8080
set API_BASE=%BASE_URL%/api/auth

echo 🔧 Configuration:
echo Base URL: %BASE_URL%
echo API Base: %API_BASE%
echo.

REM Check if curl is available
curl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: curl is not installed or not in PATH
    echo Please install curl or use Git Bash to run the .sh version
    pause
    exit /b 1
)

echo 1️⃣  Testing Health Check...
curl -s -X GET "%API_BASE%/health" -H "Content-Type: application/json"
echo.
echo.

echo 2️⃣  Testing Email Check (new email)...
curl -s -X GET "%API_BASE%/check-email?email=test@example.com" -H "Content-Type: application/json"
echo.
echo.

echo 3️⃣  Testing User Registration...
curl -s -X POST "%API_BASE%/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"password\":\"password123\"}"
echo.
echo.

echo 4️⃣  Testing Email Check (existing email)...
curl -s -X GET "%API_BASE%/check-email?email=john.doe@example.com" -H "Content-Type: application/json"
echo.
echo.

echo 5️⃣  Testing User Login...
curl -s -X POST "%API_BASE%/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john.doe@example.com\",\"password\":\"password123\"}"
echo.
echo.

echo 6️⃣  Testing Invalid Login...
echo Response Code for invalid login:
curl -s -o nul -w "%%{http_code}" -X POST "%API_BASE%/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john.doe@example.com\",\"password\":\"wrongpassword\"}"
echo.
echo.

echo 7️⃣  Testing Duplicate Registration...
echo Response Code for duplicate registration:
curl -s -o nul -w "%%{http_code}" -X POST "%API_BASE%/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Jane\",\"lastName\":\"Smith\",\"email\":\"john.doe@example.com\",\"password\":\"password456\"}"
echo.
echo.

echo ✅ Testing Complete!
echo =================================================
echo.
echo Expected Results:
echo 1️⃣  Health Check: Should return 'Authentication service is running'
echo 2️⃣  Email Check (new): Should return 'false'
echo 3️⃣  Registration: Should return JSON with JWT tokens and user data
echo 4️⃣  Email Check (existing): Should return 'true'  
echo 5️⃣  Login: Should return JSON with JWT tokens and user data
echo 6️⃣  Invalid Login: Should return 401
echo 7️⃣  Duplicate Registration: Should return 409
echo.
echo 🔍 If you see JSON responses with accessToken and refreshToken, the system is working!
echo.
pause
