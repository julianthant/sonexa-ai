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

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Test endpoints
echo "🔍 Testing endpoints..."
curl -f http://localhost:3000 || echo "Frontend health check failed"
curl -f http://localhost:8080/actuator/health || echo "Backend health check failed"
curl -f http://localhost:8080/auth/realms/sonexa || echo "Keycloak health check failed"

echo "🎉 Deployment completed!" 