#!/bin/bash

# Sonexa AI Deployment Troubleshooting Script
# Run this on your DigitalOcean droplet to diagnose issues

echo "🔍 Sonexa AI Deployment Troubleshooting"
echo "======================================"

# Check system info
echo "📊 System Information:"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "Memory: $(free -h | grep Mem | awk '{print $2}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $4}' | cut -d'G' -f1)GB free"
echo ""

# Check Docker installation
echo "🐳 Docker Status:"
if command -v docker &> /dev/null; then
    echo "✅ Docker installed: $(docker --version)"
    
    if docker ps &> /dev/null; then
        echo "✅ Docker daemon running"
        echo "Running containers:"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        echo "❌ Docker daemon not accessible (try: sudo usermod -aG docker $USER && logout/login)"
    fi
else
    echo "❌ Docker not installed"
fi

if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose installed: $(docker-compose --version)"
else
    echo "❌ Docker Compose not installed"
fi
echo ""

# Check directory structure
echo "📁 Project Structure:"
if [ -d "/opt/sonexa-ai" ]; then
    echo "✅ Project directory exists"
    echo "Owner: $(ls -ld /opt/sonexa-ai | awk '{print $3":"$4}')"
    echo "Permissions: $(ls -ld /opt/sonexa-ai | awk '{print $1}')"
    
    if [ -f "/opt/sonexa-ai/backend/docker-compose.prod.yml" ]; then
        echo "✅ Production compose file exists"
    else
        echo "❌ Production compose file missing"
    fi
    
    if [ -f "/opt/sonexa-ai/backend/.env.production" ]; then
        echo "✅ Production environment file exists"
    else
        echo "❌ Production environment file missing"
    fi
else
    echo "❌ Project directory missing"
fi
echo ""

# Check network connectivity
echo "🌐 Network Connectivity:"
if curl -s --connect-timeout 5 https://google.com > /dev/null; then
    echo "✅ Internet connectivity working"
else
    echo "❌ No internet connectivity"
fi

if curl -s --connect-timeout 5 https://ghcr.io > /dev/null; then
    echo "✅ GitHub Container Registry accessible"
else
    echo "❌ Cannot reach GitHub Container Registry"
fi
echo ""

# Check firewall
echo "🔥 Firewall Status:"
if command -v ufw &> /dev/null; then
    echo "UFW Status: $(sudo ufw status | head -1)"
    echo "Open ports:"
    sudo ufw status | grep ALLOW || echo "No explicitly allowed ports"
else
    echo "UFW not installed"
fi
echo ""

# Check ports
echo "🔌 Port Usage:"
echo "Ports in use:"
sudo netstat -tlnp | grep :80 && echo "Port 80: In use" || echo "Port 80: Available"
sudo netstat -tlnp | grep :443 && echo "Port 443: In use" || echo "Port 443: Available"
sudo netstat -tlnp | grep :8080 && echo "Port 8080: In use" || echo "Port 8080: Available"
sudo netstat -tlnp | grep :5432 && echo "Port 5432: In use" || echo "Port 5432: Available"
echo ""

# Check GitHub Container Registry login
echo "📦 GitHub Container Registry:"
if docker info | grep -q "ghcr.io"; then
    echo "✅ Logged into GitHub Container Registry"
else
    echo "❌ Not logged into GitHub Container Registry"
    echo "Run: echo 'YOUR_GITHUB_TOKEN' | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin"
fi
echo ""

# Check environment variables
echo "🔧 Environment Check:"
if [ -f "/opt/sonexa-ai/backend/.env.production" ]; then
    echo "Environment variables set:"
    grep -E "^[A-Z_]+" /opt/sonexa-ai/backend/.env.production | cut -d'=' -f1 | while read var; do
        if grep -q "^${var}=.\+$" /opt/sonexa-ai/backend/.env.production; then
            echo "✅ $var"
        else
            echo "❌ $var (empty or missing value)"
        fi
    done
else
    echo "❌ Environment file not found"
fi
echo ""

# Check logs if containers exist
echo "📋 Container Logs (last 10 lines):"
if docker ps -q --filter "name=sonexa" > /dev/null; then
    echo "=== Backend Logs ==="
    docker logs --tail 10 sonexa-backend-prod 2>/dev/null || echo "No backend container running"
    echo ""
    echo "=== Database Logs ==="
    docker logs --tail 10 sonexa-postgres-prod 2>/dev/null || echo "No database container running"
else
    echo "No Sonexa containers running"
fi
echo ""

echo "🎯 Recommendations:"
echo "1. Ensure you're logged into GitHub Container Registry"
echo "2. Check that .env.production has all required values"
echo "3. Verify Docker daemon is running and accessible"
echo "4. Check firewall allows necessary ports"
echo "5. Ensure sufficient disk space and memory"
echo ""
echo "For detailed logs, run: docker-compose -f /opt/sonexa-ai/backend/docker-compose.prod.yml logs"
