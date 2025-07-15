#!/bin/bash

# Deployment script for Sonexa AI
echo "🚀 Starting Sonexa AI deployment..."

# Check if environment variables are set
if [ -z "$DATABASE_PASSWORD" ]; then
    echo "❌ Error: DATABASE_PASSWORD environment variable is not set"
    echo "Please set the required environment variables:"
    echo "export DO_DB_HOST='your-db-host'"
    echo "export DO_DB_PORT='25060'"
    echo "export DATABASE_NAME='your-db-name'"
    echo "export DATABASE_USERNAME='your-db-username'"
    echo "export DATABASE_PASSWORD='your-db-password'"
    echo "export KEYCLOAK_DATABASE_NAME='keycloak_db'"
    echo "export KEYCLOAK_DATABASE_USERNAME='your-keycloak-db-username'"
    echo "export KEYCLOAK_DATABASE_PASSWORD='your-keycloak-db-password'"
    echo "export KEYCLOAK_ADMIN_PASSWORD='admin123'"
    echo "export SSL_EMAIL='admin@sonexa.ai'"
    exit 1
fi

# Set default values for optional variables
export KEYCLOAK_ADMIN_PASSWORD="${KEYCLOAK_ADMIN_PASSWORD:-admin123}"
export SSL_EMAIL="${SSL_EMAIL:-admin@sonexa.ai}"

echo "✅ Environment variables set"

# Create environment file
echo "📝 Creating environment file..."
bash scripts/create-env.sh
if [ $? -ne 0 ]; then
    echo "❌ Failed to create environment file"
    exit 1
fi

echo "✅ Environment file created"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Remove old images to save space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Pre-pull base images for faster builds
echo "📦 Pre-pulling base images..."
docker pull node:18-alpine &
docker pull maven:3.9-eclipse-temurin-17-alpine &
docker pull eclipse-temurin:17-jre-alpine &
docker pull quay.io/keycloak/keycloak:latest &
docker pull nginx:alpine &
wait

# Build and start services with parallel builds
echo "🔨 Building and starting services..."
DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.prod.yml build --parallel

# Start services
echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
docker-compose -f docker-compose.prod.yml logs -f --tail=20 &
LOG_PID=$!

# Wait for backend health check
echo "🔍 Waiting for backend to be healthy..."
timeout 180s bash -c 'until curl -f http://localhost:8080/actuator/health; do sleep 5; done'

# Kill log process
kill $LOG_PID 2>/dev/null || true

# Check service status
echo "📊 Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Test endpoints
echo "🔍 Testing endpoints..."
curl -f http://localhost:3000 || echo "Frontend health check failed"
curl -f http://localhost:8080/actuator/health || echo "Backend health check failed"
curl -f http://localhost:8080/auth/realms/sonexa || echo "Keycloak health check failed"

echo "🎉 Deployment completed!" 