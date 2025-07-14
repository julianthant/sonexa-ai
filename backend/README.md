# 🎤 Sonexa AI - Backend Documentation

## 📋 Project Overview
Sonexa AI Backend - Spring Boot application for voice message processing and authentication.

**Version:** 1.0.0  
**Java Version:** 17  
**Spring Boot Version:** 3.3.13  
**Database:** PostgreSQL  
**Cloud Storage:** Azure Blob Storage  

---

## 🏗️ Architecture Overview

### **Technology Stack**
- **Framework:** Spring Boot 3.3.13
- **Language:** Java 17
- **Database:** PostgreSQL with JPA/Hibernate
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Azure Blob Storage
- **Testing:** JUnit 5, Mockito, TestContainers
- **Build Tool:** Maven
- **Deployment:** Docker, Digital Ocean

### **Project Structure**
```
backend/
├── src/main/java/com/sonexa/
│   ├── SonexaApplication.java          # Main application class
│   ├── config/                         # Configuration classes
│   │   ├── SecurityConfig.java         # Spring Security configuration
│   │   ├── JwtConfig.java             # JWT configuration
│   │   └── DatabaseConfig.java        # Database configuration
│   ├── controller/                     # REST Controllers
│   │   ├── AuthController.java         # Authentication endpoints
│   │   └── VoiceController.java        # Voice message endpoints
│   ├── entity/                         # JPA Entities
│   │   ├── User.java                   # User entity
│   │   └── VoiceMessage.java           # Voice message entity
│   ├── service/                        # Business Logic
│   │   ├── AuthService.java            # Authentication service
│   │   ├── JwtService.java             # JWT token service
│   │   └── VoiceService.java           # Voice message service
│   ├── repository/                     # Data Access Layer
│   │   ├── UserRepository.java         # User repository
│   │   └── VoiceMessageRepository.java # Voice message repository
│   ├── dto/                           # Data Transfer Objects
│   │   ├── AuthRequest.java           # Login/Register requests
│   │   ├── AuthResponse.java          # Authentication responses
│   │   └── VoiceMessageDto.java       # Voice message DTOs
│   ├── exception/                     # Custom Exceptions
│   │   ├── GlobalExceptionHandler.java # Global exception handler
│   │   └── CustomExceptions.java      # Custom exception classes
│   └── util/                          # Utility Classes
│       ├── FileUtil.java              # File handling utilities
│       └── ValidationUtil.java        # Validation utilities
├── src/main/resources/
│   ├── application.properties          # Main configuration
│   ├── application-dev.properties      # Development configuration
│   ├── application-prod.properties     # Production configuration
│   └── db/migration/                   # Database migrations (Flyway)
├── src/test/java/                      # Test classes
├── Dockerfile                          # Docker configuration
├── docker-compose.yml                 # Docker Compose for local development
└── pom.xml                            # Maven dependencies
```

---

## 🔧 Configuration

### **Environment Variables**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sonexa_ai
DB_USERNAME=sonexa_user
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=your_connection_string
AZURE_STORAGE_CONTAINER=voice-messages

# Server
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
```

### **Database Schema**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Voice messages table
CREATE TABLE voice_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    duration INTEGER,
    status VARCHAR(50) DEFAULT 'RECEIVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 API Endpoints

### **Authentication Endpoints**
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/refresh     # Refresh JWT token
POST /api/auth/logout      # Logout user
```

### **Voice Message Endpoints**
```http
GET    /api/voice-messages          # List voice messages
POST   /api/voice-messages/upload   # Upload voice message
GET    /api/voice-messages/{id}     # Get specific voice message
DELETE /api/voice-messages/{id}     # Delete voice message
GET    /api/voice-messages/{id}/audio # Get audio file
```

---

## 🧪 Testing Strategy

### **Test Categories**
1. **Unit Tests** - Individual component testing
2. **Integration Tests** - API endpoint testing
3. **Repository Tests** - Database operation testing
4. **Security Tests** - Authentication and authorization testing

### **Test Structure**
```
src/test/java/
├── unit/
│   ├── service/
│   ├── controller/
│   └── util/
├── integration/
│   ├── api/
│   └── repository/
└── security/
    └── AuthenticationTest.java
```

---

## 🔒 Security Implementation

### **Authentication Flow**
1. User submits credentials
2. Server validates credentials
3. JWT token generated and returned
4. Client includes token in subsequent requests
5. Server validates token for protected endpoints

### **Security Features**
- Password hashing with BCrypt
- JWT token-based authentication
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection

---

## 📦 Dependencies

### **Core Dependencies**
```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
    </dependency>
    
    <!-- Azure Storage -->
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
    
    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
</dependencies>
```

---

## 🐳 Docker Configuration

### **Dockerfile**
```dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/sonexa-backend-*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### **Docker Compose**
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on:
      - postgres
      
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: sonexa_ai
      POSTGRES_USER: sonexa_user
      POSTGRES_PASSWORD: your_password
```

---

## 🚀 Deployment

### **Digital Ocean App Platform**
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy automatically on push

### **Manual Deployment**
```bash
# Build the application
mvn clean package

# Build Docker image
docker build -t sonexa-backend .

# Run with Docker
docker run -p 8080:8080 sonexa-backend
```

---

## 📊 Monitoring & Logging

### **Logging Configuration**
- **Framework:** Logback
- **Levels:** ERROR, WARN, INFO, DEBUG
- **Format:** JSON for production
- **Storage:** File rotation + External logging service

### **Health Checks**
```http
GET /actuator/health     # Application health
GET /actuator/metrics    # Application metrics
GET /actuator/info       # Application info
```

---

## 🔧 Development Setup

### **Prerequisites**
- Java 17+
- Maven 3.6+
- PostgreSQL 12+
- Docker (optional)

### **Setup Steps**
```bash
# Clone repository
git clone [repository-url]
cd sonexa-ai/backend

# Install dependencies
mvn clean install

# Run tests
mvn test

# Start application
mvn spring-boot:run
```

---

## 📝 Code Standards

### **Naming Conventions**
- **Classes:** PascalCase (UserService)
- **Methods:** camelCase (getUserById)
- **Variables:** camelCase (userName)
- **Constants:** UPPER_SNAKE_CASE (MAX_FILE_SIZE)

### **Documentation Requirements**
- All public methods must have JavaDoc
- Complex business logic must be commented
- API endpoints must be documented

---

## ✅ Implementation Status

### **Phase 1: Authentication System - COMPLETED** ✅
- **User Entity**: Complete with UserDetails integration
- **JWT Service**: Token generation, validation, and refresh functionality
- **Authentication Service**: Registration, login, and token management
- **Security Configuration**: Spring Security with JWT authentication
- **Authentication Controller**: REST endpoints for auth operations
- **Unit Tests**: Comprehensive test coverage for all components
- **Database Integration**: PostgreSQL with JPA/Hibernate

### **Phase 2: Voice Upload System - PENDING** ⏳
- Clean voice message upload endpoint
- File validation and storage
- Progress tracking
- Error handling

### **Phase 3: Digital Ocean Deployment - PENDING** ⏳
- Docker configuration
- Environment setup
- Database configuration
- CI/CD pipeline

---

## 🔐 Authentication System Documentation

### **✅ Completed Components**

#### **1. User Entity (`User.java`)**
```java
@Entity
@Table(name = "users")
public class User implements UserDetails {
    // Complete implementation with:
    // - JWT integration
    // - Role-based authorization
    // - Account status management
    // - Timestamp tracking
}
```

#### **2. JWT Service (`JwtService.java`)**
```java
@Service
public class JwtService {
    // Features:
    // - Token generation with custom claims
    // - Token validation and parsing
    // - Username and expiration extraction
    // - Secure key management with JJWT 0.12.3
}
```

#### **3. Authentication Service (`AuthenticationService.java`)**
```java
@Service
public class AuthenticationService {
    // Operations:
    // - User registration with validation
    // - User authentication with JWT tokens
    // - Token refresh functionality
    // - Password encryption with BCrypt
}
```

#### **4. Security Configuration (`SecurityConfiguration.java`)**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    // Setup:
    // - JWT authentication filter
    // - CORS configuration for frontend
    // - Method-level security
    // - Session management (stateless)
}
```

#### **5. Authentication Controller (`AuthenticationController.java`)**
```java
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    // Endpoints:
    // POST /api/auth/register - User registration
    // POST /api/auth/login - User authentication  
    // POST /api/auth/refresh - Token refresh
    // GET /api/auth/check-email - Email existence check
    // GET /api/auth/health - Service health check
}
```

### **✅ API Endpoints - READY FOR FRONTEND INTEGRATION**

#### **Registration**
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "password": "password123"
}

Response: 201 Created
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
    "createdAt": "2025-01-13T10:30:00"
  }
}
```

#### **Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": { /* user data */ }
}
```

#### **Token Refresh**
```http
POST /api/auth/refresh
Content-Type: application/json

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // refresh token

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // new token
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // same token
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": { /* user data */ }
}
```

### **✅ Unit Test Coverage**

#### **Authentication Service Tests (`AuthenticationServiceTest.java`)**
- ✅ User registration scenarios
- ✅ Authentication success and failure cases  
- ✅ Token refresh functionality
- ✅ Email validation
- ✅ Error handling

#### **JWT Service Tests (`JwtServiceTest.java`)**
- ✅ Token generation and validation
- ✅ Username extraction
- ✅ Expiration handling
- ✅ Custom claims
- ✅ Token structure validation

#### **Authentication Controller Tests (`AuthenticationControllerTest.java`)**
- ✅ All REST endpoints
- ✅ Validation and error handling
- ✅ Success and failure scenarios
- ✅ HTTP status codes
- ✅ JSON response validation

---

*Last Updated: July 13, 2025*
*Version: 1.0.0*
