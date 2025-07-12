@echo off
echo Starting Sonexa AI Backend Development Server...
echo.

echo Checking Java version...
java -version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java not found! Please install Java 17 or higher.
    pause
    exit /b 1
)

echo.
echo Loading development environment...
cd backend

echo.
echo Starting Spring Boot application with development profile...
echo Backend will be available at: http://localhost:8080
echo H2 Console available at: http://localhost:8080/h2-console
echo Swagger UI available at: http://localhost:8080/swagger-ui.html
echo.

mvn spring-boot:run -Dspring-boot.run.profiles=dev

pause
