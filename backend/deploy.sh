#!/bin/bash

# Sonexa AI Backend Deployment Script for DigitalOcean
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Load environment variables
if [ -f "$SCRIPT_DIR/.env.$ENVIRONMENT" ]; then
    source "$SCRIPT_DIR/.env.$ENVIRONMENT"
    echo "✅ Loaded environment variables from .env.$ENVIRONMENT"
else
    echo "❌ Environment file .env.$ENVIRONMENT not found!"
    exit 1
fi

# Validate required environment variables
required_vars=(
    "DOCKER_IMAGE"
    "IMAGE_TAG"
    "DATABASE_NAME"
    "DATABASE_USERNAME"
    "DATABASE_PASSWORD"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set!"
        exit 1
    fi
done

echo "✅ All required environment variables are set"

# Build Docker image locally (optional)
if [ "$BUILD_LOCAL" = "true" ]; then
    echo "🏗️ Building Docker image locally..."
    docker build -t "$DOCKER_IMAGE:$IMAGE_TAG" .
    echo "✅ Docker image built successfully"
fi

# Push to registry (if building locally)
if [ "$BUILD_LOCAL" = "true" ] && [ "$PUSH_IMAGE" = "true" ]; then
    echo "📤 Pushing image to registry..."
    docker push "$DOCKER_IMAGE:$IMAGE_TAG"
    echo "✅ Image pushed successfully"
fi

# Deploy to DigitalOcean
echo "🌊 Deploying to DigitalOcean..."

if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
else
    COMPOSE_FILE="docker-compose.yml"
fi

# Pull latest image
echo "📥 Pulling latest image..."
docker pull "$DOCKER_IMAGE:$IMAGE_TAG"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f "$COMPOSE_FILE" down

# Start new containers
echo "▶️ Starting new containers..."
docker-compose -f "$COMPOSE_FILE" up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:8080/actuator/health; then
    echo "✅ Deployment successful! Services are healthy."
else
    echo "❌ Health check failed! Rolling back..."
    docker-compose -f "$COMPOSE_FILE" down
    exit 1
fi

# Clean up old images
echo "🧹 Cleaning up old images..."
docker image prune -af

echo "🎉 Deployment completed successfully!"
echo "📊 You can check the logs with: docker-compose -f $COMPOSE_FILE logs -f"
echo "🔍 Monitor the application at: http://localhost:8080/actuator/health"
