# 🚀 Sonexa AI Local Development Setup

Complete guide for setting up Sonexa AI development environment with organized file structure.

## 📁 Project Structure

```
sonexa-ai/
├── backend/
│   ├── .env.example           # Backend environment template
│   ├── .env.local            # Local development (create from example)
│   ├── docker-compose.yml    # Backend services only
│   └── Dockerfile            # Multi-stage backend container
├── frontend/
│   ├── .env.example          # Frontend environment template
│   ├── .env.local           # Local development (create from example)
│   ├── docker-compose.yml   # Frontend development server
│   └── Dockerfile           # Multi-stage frontend container
└── deploy/
    ├── docker-compose.local.yml     # Full local development stack
    ├── docker-compose.production.yml # Production deployment
    ├── nginx/local.conf             # Local reverse proxy config
    └── scripts/local-setup.sh       # Automated setup script
```

## 🏁 Quick Start

### 1. Prerequisites

- **Docker Desktop** (latest version)
- **Node.js 18+** (for frontend development)
- **Java 17+** (for backend development)

### 2. Setup Development Environment

```bash
# Clone repository
git clone https://github.com/julianthant/sonexa-ai.git
cd sonexa-ai

# Make setup script executable (Linux/Mac)
chmod +x deploy/scripts/local-setup.sh

# Run automated setup
./deploy/scripts/local-setup.sh
```

### 3. Configure API Keys

#### Backend Configuration (`backend/.env.local`)

```bash
# Copy and edit backend environment
cp backend/.env.example backend/.env.local

# Required: Update these keys
RESEND_API_KEY=re_your-resend-api-key
AZURE_SPEECH_KEY=your-azure-speech-service-key
OPENAI_API_KEY=sk-your-openai-api-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
```

#### Frontend Configuration (`frontend/.env.local`)

```bash
# Copy and edit frontend environment
cp frontend/.env.example frontend/.env.local

# Required: Update OAuth providers
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### 4. Start Development Services

```bash
# Start full development stack
./deploy/scripts/local-setup.sh start

# Or start individual components
cd backend && docker-compose up -d  # Backend services only
cd frontend && docker-compose up -d # Frontend services only
```

## 🌐 Development URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost | - |
| **Backend API** | http://localhost/api | - |
| **MailHog (Email)** | http://localhost:8025 | - |
| **MinIO (Storage)** | http://localhost:9001 | minioadmin / minioadmin123 |
| **pgAdmin** | http://localhost:5050 | admin@sonexa.tech / admin123 |
| **Redis Commander** | http://localhost:8081 | admin / admin123 |

## 🔧 API Keys Setup Guide

### 1. Resend (Email Processing) - $20/month

1. Sign up at [resend.com](https://resend.com)
2. Create API key: `re_xxxxxxxx`
3. Add to `backend/.env.local`:
   ```bash
   RESEND_API_KEY=re_your-resend-api-key
   EMAIL_DOMAIN=voice.sonexa.tech
   ```

### 2. Azure Speech Service - ~$1/1000 requests

1. Create Azure Cognitive Services resource
2. Copy key and region
3. Add to `backend/.env.local`:
   ```bash
   AZURE_SPEECH_KEY=your-32-character-key
   AZURE_SPEECH_REGION=eastus
   ```

### 3. OpenAI API - $0.002/1K tokens

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Add to `backend/.env.local`:
   ```bash
   OPENAI_API_KEY=sk-proj-your-api-key
   ```

### 4. Stripe (Payment) - Free for testing

1. Create account at [stripe.com](https://stripe.com)
2. Get test API keys from dashboard
3. Add to both environments:
   ```bash
   # Backend
   STRIPE_SECRET_KEY=sk_test_your-secret-key
   
   # Frontend
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
   ```

### 5. OAuth Providers (Free)

#### GitHub OAuth

1. Go to Settings → Developer settings → OAuth Apps
2. Create new app:
   - Homepage: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
3. Add to `frontend/.env.local`:
   ```bash
   GITHUB_CLIENT_ID=your-client-id
   GITHUB_CLIENT_SECRET=your-client-secret
   ```

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Add to `frontend/.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## 🐳 Docker Compose Structure

### Backend Services (`backend/docker-compose.yml`)

```yaml
Services:
  - PostgreSQL (database)
  - Redis (cache/sessions)
  - MailHog (email testing)
  - MinIO (S3-compatible storage)
  - pgAdmin (database UI)
  - Redis Commander (cache UI)
```

### Frontend Services (`frontend/docker-compose.yml`)

```yaml
Services:
  - Next.js dev server
  - Nginx proxy
  - Storybook (component dev)
  - Chrome headless (testing)
```

### Full Stack (`deploy/docker-compose.local.yml`)

```yaml
Complete Development Environment:
  - All backend services
  - Frontend with hot reload
  - Nginx reverse proxy
  - Admin tools
  - Testing services
```

## 🛠️ Useful Commands

### Environment Management

```bash
# Start everything
./deploy/scripts/local-setup.sh start

# Stop everything
./deploy/scripts/local-setup.sh stop

# View logs
./deploy/scripts/local-setup.sh logs

# Reset environment (removes data)
./deploy/scripts/local-setup.sh reset

# Check service status
./deploy/scripts/local-setup.sh status
```

### Individual Service Control

```bash
# Backend only
cd backend
docker-compose up -d
docker-compose logs -f

# Frontend only
cd frontend  
docker-compose up -d
npm run dev  # Alternative: run outside Docker

# Specific service
docker-compose -f deploy/docker-compose.local.yml restart backend
```

### Development Debugging

```bash
# Execute commands in containers
docker exec -it sonexa-backend-local bash
docker exec -it sonexa-frontend-local sh

# View container logs
docker logs sonexa-backend-local -f
docker logs sonexa-postgres-local -f

# Check resource usage
docker stats

# Clean up
docker system prune -f
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using port 5432 (PostgreSQL)
netstat -an | grep 5432
lsof -i :5432

# Kill process
sudo pkill -f postgres
```

#### 2. Database Connection Failed

```bash
# Check PostgreSQL container
docker-compose -f deploy/docker-compose.local.yml ps postgres
docker-compose -f deploy/docker-compose.local.yml logs postgres

# Reset database
docker-compose -f deploy/docker-compose.local.yml down -v
docker-compose -f deploy/docker-compose.local.yml up -d postgres
```

#### 3. Email Testing Issues

```bash
# Check MailHog is running
curl -f http://localhost:8025 || echo "MailHog not accessible"

# Send test email
curl -X POST http://localhost:1025 \
  -H "Content-Type: text/plain" \
  -d "Subject: Test
From: test@example.com
To: test@voice.sonexa.tech

Test email body"
```

#### 4. Frontend Hot Reload Not Working

```bash
# Check if using polling
echo "WATCHPACK_POLLING=true" >> frontend/.env.local
echo "CHOKIDAR_USEPOLLING=true" >> frontend/.env.local

# Restart frontend container
docker-compose -f deploy/docker-compose.local.yml restart frontend
```

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Frontend health  
curl http://localhost:3000/api/health

# Database connection
curl http://localhost:8080/actuator/health/db

# All services status
./deploy/scripts/local-setup.sh status
```

## 📊 Development Features

### Hot Reload

- **Frontend**: Next.js automatic refresh on file changes
- **Backend**: Spring Boot DevTools (requires IDE restart)
- **Database**: Automatic schema updates via migrations

### Email Testing

- **MailHog**: Catches all outgoing emails at http://localhost:8025
- **Resend**: Switch to real email service by updating API key
- **Webhook Testing**: Use ngrok to expose localhost for webhooks

### File Storage

- **Local**: MinIO provides S3-compatible API at http://localhost:9001
- **Production**: Seamlessly switches to Digital Ocean Spaces
- **Testing**: All file operations work identically in both environments

### Database Management

- **pgAdmin**: Full PostgreSQL administration at http://localhost:5050
- **Migrations**: Automatic database schema updates
- **Seeding**: Test data loaded automatically

## 🚀 Next Steps

### 1. Test Core Features

```bash
# Register a new user
open http://localhost

# Test email processing
# Send email to any address ending with @voice.sonexa.tech
# Check MailHog to see received emails

# Test file upload
# Upload a voice file through the UI
# Check MinIO to see stored files
```

### 2. Develop New Features

```bash
# Backend development
cd backend/src/main/java/com/sonexa
# Edit controllers, services, models

# Frontend development  
cd frontend/src
# Edit pages, components, hooks
```

### 3. Prepare for Production

```bash
# Configure real API keys
# Set up Digital Ocean account
# Configure domain DNS
# Deploy using GitHub Actions
```

---

## 📚 Additional Resources

- [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-devtools)
- [Next.js Development](https://nextjs.org/docs/getting-started)
- [Docker Compose Development](https://docs.docker.com/compose/gettingstarted/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated**: July 13, 2025  
**Environment**: Local Development
