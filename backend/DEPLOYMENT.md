# Sonexa AI Backend Deployment

This directory contains the production deployment configuration for the Sonexa AI backend.

## Files Overview

- `docker-compose.prod.yml` - Production Docker Compose configuration
- `deploy-backend-new.yml` - GitHub Actions workflow for automated deployment
- `nginx.conf` - Production Nginx configuration
- `.env.example` - Example environment variables file
- `deploy.sh` - Manual deployment script

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

- Database credentials
- Google OAuth credentials
- JWT secret
- CORS origins
- Docker image name

### 2. GitHub Secrets

Configure the following secrets in your GitHub repository:

- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password
- `DO_HOST` - DigitalOcean server IP
- `DO_USERNAME` - DigitalOcean server username
- `DO_SSH_KEY` - Private SSH key for server access
- `DO_PORT` - SSH port (usually 22)
- `DATABASE_NAME` - Production database name
- `DATABASE_USERNAME` - Production database username
- `DATABASE_PASSWORD` - Production database password
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `CORS_ALLOWED_ORIGINS` - Allowed CORS origins
- `JWT_SECRET` - JWT signing secret
- `SSL_ENABLED` - Set to "true" if using SSL

### 3. Server Preparation

On your DigitalOcean server:

1. Install Docker and Docker Compose
2. Create the deployment directory: `mkdir -p /opt/sonexa-ai`
3. Clone your repository to `/opt/sonexa-ai`
4. Ensure proper permissions

### 4. SSL Setup (Optional)

If using SSL, place your certificate files in the `ssl/` directory:

- `ssl/cert.pem` - SSL certificate
- `ssl/key.pem` - SSL private key

### 5. Deployment

#### Automatic Deployment

Push to the `main` branch to trigger automatic deployment via GitHub Actions.

#### Manual Deployment

Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Services

The deployment includes:

1. **PostgreSQL Database** - Port 5432
2. **Backend Application** - Port 8080
3. **Nginx Reverse Proxy** - Ports 80/443

## Health Checks

- Backend: `http://localhost:8080/actuator/health`
- Nginx: `http://localhost:80/health`

## Monitoring

Check service status:

```bash
# View running containers
docker ps

# View logs
docker-compose -f docker-compose.prod.yml logs

# View specific service logs
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs postgres
docker-compose -f docker-compose.prod.yml logs nginx
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Ensure `.env` file exists and has correct format
2. **Database connection failed**: Check database credentials and network connectivity
3. **Health check failed**: Wait longer for services to start, check logs for errors
4. **SSL issues**: Verify certificate files exist and have correct permissions

### Useful Commands

```bash
# Restart services
docker-compose -f docker-compose.prod.yml restart

# Stop all services
docker-compose -f docker-compose.prod.yml down

# View service logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Execute commands in running container
docker exec -it sonexa-backend-prod bash

# Database backup
docker exec sonexa-postgres-prod pg_dump -U ${DATABASE_USERNAME} ${DATABASE_NAME} > backup/backup_$(date +%Y%m%d_%H%M%S).sql
```

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- Regularly update Docker images and dependencies
- Monitor logs for suspicious activity
- Use strong passwords and secrets
- Keep SSL certificates up to date
