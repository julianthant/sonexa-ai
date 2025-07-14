# Sonexa AI Backend

Spring Boot backend application for the Sonexa AI voice messaging platform.

## Quick Start

### Local Development

1. **Prerequisites**:

   - Java 17+
   - Docker & Docker Compose
   - PostgreSQL (or use Docker)

2. **Run with Docker**:

```bash
# Copy environment template
cp .env.development.template .env.development

# Edit with your values
nano .env.development

# Start services
docker-compose up -d
```

3. **Run without Docker**:

```bash
# Start PostgreSQL database
docker run --name postgres -e POSTGRES_DB=sonexa_ai -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine

# Run application
./mvnw spring-boot:run
```

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed DigitalOcean deployment instructions.

## API Endpoints

- **Health Check**: `GET /actuator/health`
- **API Base**: `/api/v1/`

## Environment Variables

| Variable               | Description                | Required |
| ---------------------- | -------------------------- | -------- |
| `DATABASE_URL`         | PostgreSQL connection URL  | Yes      |
| `DATABASE_USERNAME`    | Database username          | Yes      |
| `DATABASE_PASSWORD`    | Database password          | Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID     | Yes      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes      |
| `JWT_SECRET`           | JWT signing secret         | Yes      |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins   | Yes      |

## Development

### Building

```bash
# Compile and test
./mvnw clean test

# Build JAR
./mvnw clean package

# Build Docker image
docker build -t sonexa-ai-backend .
```

### Testing

```bash
# Run tests
./mvnw test

# Run with coverage
./mvnw test jacoco:report
```

## Architecture

- **Framework**: Spring Boot 3.3
- **Database**: PostgreSQL 15
- **Authentication**: OAuth2 + JWT
- **Build Tool**: Maven
- **Java Version**: 17

## Security

- OAuth2 authentication with Google
- JWT tokens for API access
- CORS protection
- SQL injection prevention with JPA
- Input validation with Bean Validation

## Monitoring

- Spring Boot Actuator endpoints
- Health checks at `/actuator/health`
- Metrics available at `/actuator/metrics`
- Application info at `/actuator/info`
