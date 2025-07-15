#!/bin/bash

# Environment setup script for Sonexa AI
echo "🔧 Setting up environment variables..."

# Database Configuration - UPDATE THESE VALUES
export DO_DB_HOST="your-database-host"
export DO_DB_PORT="25060"
export DATABASE_NAME="your-database-name"
export DATABASE_USERNAME="your-database-username"
export DATABASE_PASSWORD="your-database-password"

# Keycloak Database Configuration - UPDATE THESE VALUES
export KEYCLOAK_DATABASE_NAME="keycloak_db"
export KEYCLOAK_DATABASE_USERNAME="your-keycloak-db-username"
export KEYCLOAK_DATABASE_PASSWORD="your-keycloak-db-password"

# Keycloak Admin Configuration
export KEYCLOAK_ADMIN_PASSWORD="admin123"

# SSL Configuration
export SSL_EMAIL="admin@sonexa.ai"

echo ""
echo "⚠️  IMPORTANT: Update the placeholder values above with your actual credentials!"
echo ""

echo "✅ Environment variables set successfully!"
echo ""
echo "🚀 You can now run:"
echo "   bash scripts/fast-deploy.sh"
echo "   bash scripts/deploy.sh" 