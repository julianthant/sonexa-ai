# 🧪 Manual Testing Guide for Sonexa AI Authentication System

## Quick Test Commands (Run these when backend is running)

### 1. Health Check
```bash
curl -X GET http://localhost:8080/api/auth/health
# Expected: "Authentication service is running"
```

### 2. User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

**Expected Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "createdAt": "2025-01-13T..."
  }
}
```

### 3. User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer", 
  "expiresIn": 86400000,
  "user": { /* user data */ }
}
```

### 4. Email Check
```bash
# Check if email exists
curl -X GET "http://localhost:8080/api/auth/check-email?email=john.doe@example.com"
# Expected: true

curl -X GET "http://localhost:8080/api/auth/check-email?email=nonexistent@example.com"  
# Expected: false
```

### 5. Token Refresh
```bash
# Use the refresh token from registration/login response
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '"YOUR_REFRESH_TOKEN_HERE"'
```

### 6. Test Invalid Scenarios

#### Invalid Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }'
# Expected: 401 Unauthorized
```

#### Duplicate Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john.doe@example.com",
    "password": "password456"
  }'
# Expected: 409 Conflict
```

#### Invalid Input Validation
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "",
    "lastName": "Doe",
    "email": "invalid-email",
    "password": "123"
  }'
# Expected: 400 Bad Request with validation errors
```

## 🔍 What to Look For

### ✅ Success Indicators:
- Server starts on port 8080 without errors
- Health check returns success message
- Registration returns JWT tokens and user data
- Login returns JWT tokens for valid credentials
- Email check returns correct boolean values
- Token refresh generates new access token
- Invalid requests return appropriate HTTP status codes

### ❌ Potential Issues:
- Database connection errors (need PostgreSQL running)
- Port 8080 already in use
- Missing environment variables
- Compilation errors

## 🛠️ Troubleshooting

### Database Issues:
If you see database connection errors, you have two options:

1. **Install PostgreSQL locally:**
   ```bash
   # Download and install PostgreSQL
   # Create database: sonexa_ai_dev
   # Update application-dev.properties with your credentials
   ```

2. **Use H2 in-memory database for testing:**
   Add to `pom.xml`:
   ```xml
   <dependency>
       <groupId>com.h2database</groupId>
       <artifactId>h2</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```
   
   Add to `application-dev.properties`:
   ```properties
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.h2.console.enabled=true
   ```

### Port Issues:
If port 8080 is in use:
```properties
# In application-dev.properties
server.port=8081
```

## 🧪 Unit Test Execution

Run the unit tests I created:
```bash
cd "c:\Users\Julian\Work\Web Apps\sonexa-ai\backend"
.\mvnw.cmd test
```

Expected test results:
- ✅ AuthenticationServiceTest: All tests pass
- ✅ JwtServiceTest: All tests pass  
- ✅ AuthenticationControllerTest: All tests pass

## 📊 Success Metrics

The authentication system is working correctly if:
- [x] Application starts without errors
- [x] All unit tests pass
- [x] Registration creates new users and returns JWT tokens
- [x] Login authenticates existing users
- [x] Token refresh generates new access tokens
- [x] Invalid requests return proper error codes
- [x] Email validation works correctly
- [x] Password encryption is working (passwords are hashed in database)

## 🚀 Next Steps After Testing

Once authentication is verified:
1. **Frontend Integration**: Connect Next.js frontend to these endpoints
2. **Voice Upload System**: Implement file upload endpoints
3. **Digital Ocean Deployment**: Deploy to production environment
