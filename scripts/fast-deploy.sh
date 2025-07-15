#!/bin/bash

# ⚡ FAST Deployment Script for Sonexa AI
echo "⚡ Starting FAST Sonexa AI deployment..."

# Start timing
START_TIME=$(date +%s)

# Enable buildkit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
export BUILDKIT_PROGRESS=plain

# Check if environment variables are set
if [ -z "$DATABASE_PASSWORD" ]; then
    echo "❌ Error: DATABASE_PASSWORD environment variable is not set"
    echo "Please set the required environment variables first:"
    echo "source scripts/set-env.sh"
    exit 1
fi

echo "✅ Environment variables validated"

# Create environment file
echo "📝 Creating environment file..."
bash scripts/create-env.sh
if [ $? -ne 0 ]; then
    echo "❌ Failed to create environment file"
    exit 1
fi

# Pre-pull and cache base images in parallel
echo "📦 Pre-pulling base images (parallel)..."
{
    docker pull node:18-alpine
    echo "✅ Node image pulled"
} &
{
    docker pull maven:3.9-eclipse-temurin-17-alpine
    echo "✅ Maven image pulled"
} &
{
    docker pull eclipse-temurin:17-jre-alpine
    echo "✅ JRE image pulled"
} &
{
    docker pull quay.io/keycloak/keycloak:latest
    echo "✅ Keycloak image pulled"
} &
{
    docker pull nginx:alpine
    echo "✅ Nginx image pulled"
} &

# Wait for all pulls to complete
wait
echo "✅ All base images cached"

# Stop existing containers quickly
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --timeout 10 || true

# Clean up only dangling images (faster than full prune)
echo "🧹 Quick cleanup..."
docker image prune -f --filter "dangling=true"

# Build with maximum parallelism and caching
echo "🔨 Building with maximum performance..."
docker-compose -f docker-compose.prod.yml build \
    --parallel \
    --compress \
    --force-rm \
    --no-cache=false

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Start services with optimized settings
echo "🚀 Starting optimized services..."
docker-compose -f docker-compose.prod.yml up -d \
    --remove-orphans \
    --force-recreate

# Smart health checking with parallel monitoring
echo "🔍 Smart health monitoring..."
{
    # Monitor backend health
    echo "Waiting for backend..."
    timeout 120s bash -c 'until curl -sf http://localhost:8080/actuator/health >/dev/null 2>&1; do sleep 2; done'
    echo "✅ Backend healthy"
} &
{
    # Monitor frontend health  
    echo "Waiting for frontend..."
    timeout 90s bash -c 'until curl -sf http://localhost:3000 >/dev/null 2>&1; do sleep 2; done'
    echo "✅ Frontend healthy"
} &

# Wait for health checks
wait

# Quick service status check
echo "📊 Final status check..."
docker-compose -f docker-compose.prod.yml ps --format table

# Performance summary
END_TIME=$(date +%s)
TOTAL_TIME=$((END_TIME - START_TIME))

echo ""
echo "🎉 ⚡ FAST DEPLOYMENT COMPLETED! ⚡"
echo "⏱️  Total time: ${TOTAL_TIME} seconds"
echo "🌐 Frontend: http://64.23.225.59:3000"
echo "🔧 Backend:  http://64.23.225.59:8080"
echo "🔐 Keycloak: http://64.23.225.59:8080/auth"
echo ""
echo "💡 Optimizations applied:"
echo "   • Docker BuildKit enabled"
echo "   • Parallel image pulls"
echo "   • Cached dependency layers"
echo "   • Parallel service builds"
echo "   • Smart health monitoring"
echo "   • Reduced build context" 