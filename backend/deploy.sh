#!/bin/bash

# Sonexa AI Backend Deployment Script
# This script handles the deployment of the Sonexa AI backend to production

set -e

echo "🚀 Starting Sonexa AI Backend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found! Please create one based on .env.example"
    exit 1
fi

print_status "Found .env file ✓"

# Create necessary directories
mkdir -p logs ssl backup

# Set proper permissions
chmod 755 logs backup
if [ -d "ssl" ]; then
    chmod 600 ssl/*
fi

print_status "Created necessary directories ✓"

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Remove old images (optional, uncomment if needed)
# print_status "Cleaning up old images..."
# docker image prune -f

# Pull latest images
print_status "Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

# Start services
print_status "Starting services..."
docker-compose -f docker-compose.prod.yml --env-file .env up -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 30

# Check if services are running
print_status "Checking service status..."
docker ps

# Health check
print_status "Performing health checks..."
max_attempts=10
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -s -f http://localhost:8080/actuator/health | grep -q "UP"; then
        print_status "Backend health check successful! ✓"
        break
    else
        print_warning "Health check attempt $attempt/$max_attempts failed, retrying in 10 seconds..."
        sleep 10
        ((attempt++))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    print_error "Health check failed after $max_attempts attempts"
    print_error "Showing container logs:"
    docker-compose -f docker-compose.prod.yml logs --tail 50
    exit 1
fi

# Check nginx health
if curl -s -f http://localhost:80/health | grep -q "healthy"; then
    print_status "Nginx health check successful! ✓"
else
    print_warning "Nginx health check failed"
fi

print_status "🎉 Deployment completed successfully!"
print_status "Backend is running at: http://localhost:8080"
print_status "API endpoints available at: http://localhost:80/api/"

# Show running containers
print_status "Running containers:"
docker-compose -f docker-compose.prod.yml ps
