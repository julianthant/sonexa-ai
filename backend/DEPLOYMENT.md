# DigitalOcean Deployment Guide

This guide explains how to deploy the Sonexa AI backend to DigitalOcean using Docker.

## Prerequisites

1. **DigitalOcean Droplet**: Ubuntu 20.04+ with at least 2GB RAM
2. **Docker & Docker Compose**: Installed on the droplet
3. **Domain Name**: Configured to point to your droplet's IP
4. **SSL Certificate**: For HTTPS (optional but recommended)
5. **GitHub Container Registry**: Access token with package read permissions

## Initial Server Setup

### 1. Create DigitalOcean Droplet

```bash
# Create a droplet with at least 2GB RAM
# Ubuntu 20.04+ recommended
```

### 2. Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 3. Clone Repository

```bash
# Create deployment directory
sudo mkdir -p /opt/sonexa-ai
sudo chown $USER:$USER /opt/sonexa-ai

# Clone repository
cd /opt/sonexa-ai
git clone https://github.com/julianthant/sonexa-ai.git .
```

## Configuration

### 1. Environment Variables

```bash
# Copy and edit production environment file
cd /opt/sonexa-ai/backend
cp .env.production.template .env.production

# Edit the file with your actual values
nano .env.production
```

Required variables:

- `DATABASE_PASSWORD`: Strong database password
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `JWT_SECRET`: Long, secure JWT secret
- `CORS_ALLOWED_ORIGINS`: Your frontend domains

### 2. GitHub Container Registry

```bash
# Login to GitHub Container Registry
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### 3. SSL Certificate (Optional)

```bash
# Create SSL directory
mkdir -p /opt/sonexa-ai/backend/ssl

# Copy your SSL certificate files
# cert.pem and key.pem
```

## Deployment Methods

### Method 1: Automated CI/CD (Recommended)

1. **Setup GitHub Secrets** in your repository:

   - `DO_HOST`: Your droplet's IP address
   - `DO_USERNAME`: SSH username (usually 'root' or your user)
   - `DO_SSH_KEY`: Private SSH key for authentication
   - `DO_PORT`: SSH port (usually 22)
   - `DATABASE_NAME`: Production database name
   - `DATABASE_USERNAME`: Database username
   - `DATABASE_PASSWORD`: Database password
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
   - `CORS_ALLOWED_ORIGINS`: Allowed frontend origins
   - `JWT_SECRET`: JWT signing secret

2. **Push to main branch** - deployment will happen automatically

### Method 2: Manual Deployment

```bash
# Navigate to backend directory
cd /opt/sonexa-ai/backend

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh production
```

### Method 3: Direct Docker Compose

```bash
# Navigate to backend directory
cd /opt/sonexa-ai/backend

# Load environment variables
source .env.production

# Pull and start services
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring and Maintenance

### Health Checks

```bash
# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Health check endpoint
curl http://localhost:8080/actuator/health
```

### Database Backup

```bash
# Backup database
docker exec sonexa-postgres-prod pg_dump -U $DATABASE_USERNAME $DATABASE_NAME > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i sonexa-postgres-prod psql -U $DATABASE_USERNAME $DATABASE_NAME < backup_file.sql
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Redeploy
./deploy.sh production
```

### Resource Monitoring

```bash
# View resource usage
docker stats

# View disk usage
df -h
docker system df
```

## Security Considerations

1. **Firewall Configuration**:

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

2. **Database Security**:

   - Use strong passwords
   - Limit database connections
   - Regular backups

3. **Application Security**:
   - Use HTTPS in production
   - Secure JWT secrets
   - Validate CORS origins

## Troubleshooting

### Common Issues

1. **Container won't start**:

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs backend

# Check if ports are available
sudo netstat -tlnp | grep :8080
```

2. **Database connection issues**:

```bash
# Check database container
docker-compose -f docker-compose.prod.yml logs postgres

# Test database connection
docker exec -it sonexa-postgres-prod psql -U $DATABASE_USERNAME $DATABASE_NAME
```

3. **Memory issues**:

```bash
# Check memory usage
free -h
docker stats

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

### Logs Location

- Application logs: `./logs/`
- Docker logs: `docker-compose logs`
- System logs: `/var/log/`

## Scaling Considerations

For production with high load:

1. **Multiple Application Instances**:

```yaml
# In docker-compose.prod.yml
services:
  backend:
    deploy:
      replicas: 3
```

2. **Load Balancer**: Use DigitalOcean Load Balancer

3. **Database**: Consider DigitalOcean Managed Database

4. **Monitoring**: Set up monitoring with Prometheus/Grafana

## Support

For issues with deployment:

1. Check the logs first
2. Verify all environment variables
3. Ensure all services are healthy
4. Check GitHub Actions for CI/CD issues
