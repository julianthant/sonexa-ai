#!/bin/bash

# Create the production environment file
cat > .env.prod << EOF
# Database Configuration (External DigitalOcean Database)
DB_HOST=\${DO_DB_HOST}
DB_PORT=\${DO_DB_PORT}
DB_NAME=\${DATABASE_NAME}
DB_USERNAME=\${DATABASE_USERNAME}
DB_PASSWORD=\${DATABASE_PASSWORD}

# Keycloak Configuration
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=\${KEYCLOAK_ADMIN_PASSWORD:-admin123}
KEYCLOAK_DB_HOST=\${DO_DB_HOST}
KEYCLOAK_DB_PORT=\${DO_DB_PORT}
KEYCLOAK_DB_NAME=\${KEYCLOAK_DATABASE_NAME}
KEYCLOAK_DB_USERNAME=\${KEYCLOAK_DATABASE_USERNAME}
KEYCLOAK_DB_PASSWORD=\${KEYCLOAK_DATABASE_PASSWORD}

# API URLs
API_URL=https://api.sonexa-ai.vercel.app
FRONTEND_URL=https://sonexa-ai.vercel.app
KEYCLOAK_URL=https://auth.sonexa-ai.vercel.app

# Keycloak Client Settings (temporary - will be updated after setup)
KEYCLOAK_CLIENT_ID=sonexa-app
KEYCLOAK_CLIENT_SECRET=temporary-secret

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://sonexa-ai.vercel.app,https://www.sonexa-ai.vercel.app

# SSL Configuration
SSL_EMAIL=\${SSL_EMAIL}
EOF

echo "Environment file created successfully!" 