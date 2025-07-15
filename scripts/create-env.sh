#!/bin/bash

# Check if required environment variables are set
if [ -z "$DO_DB_HOST" ]; then
    echo "Error: DO_DB_HOST environment variable is not set"
    exit 1
fi

# Create the production environment file with actual values
cat > .env.prod << EOF
# Database Configuration (External DigitalOcean Database)
DB_HOST=${DO_DB_HOST}
DB_PORT=${DO_DB_PORT}
DB_NAME=${DATABASE_NAME}
DB_USERNAME=${DATABASE_USERNAME}
DB_PASSWORD=${DATABASE_PASSWORD}

# Keycloak Configuration
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=${KEYCLOAK_ADMIN_PASSWORD:-admin123}
KEYCLOAK_DB_HOST=${DO_DB_HOST}
KEYCLOAK_DB_PORT=${DO_DB_PORT}
KEYCLOAK_DB_NAME=${KEYCLOAK_DATABASE_NAME}
KEYCLOAK_DB_USERNAME=${KEYCLOAK_DATABASE_USERNAME}
KEYCLOAK_DB_PASSWORD=${KEYCLOAK_DATABASE_PASSWORD}

# API URLs  
API_URL=http://64.23.225.59:8080
FRONTEND_URL=http://64.23.225.59:3000
KEYCLOAK_URL=http://64.23.225.59:8080/auth

# Keycloak Client Settings (temporary - will be updated after setup)
KEYCLOAK_CLIENT_ID=sonexa-app
KEYCLOAK_CLIENT_SECRET=temporary-secret

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://64.23.225.59:3000,http://localhost:3000

# SSL Configuration
SSL_EMAIL=${SSL_EMAIL:-admin@sonexa.ai}
EOF

echo "Environment file created successfully!" 