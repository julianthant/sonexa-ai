#!/bin/bash

# Backend API Testing Script for Sonexa AI Authentication System
# This script tests all authentication endpoints manually

echo "🧪 Testing Sonexa AI Backend Authentication System"
echo "================================================="

# Configuration
BASE_URL="http://localhost:8080"
API_BASE="$BASE_URL/api/auth"

echo ""
echo "🔧 Configuration:"
echo "Base URL: $BASE_URL"
echo "API Base: $API_BASE"
echo ""

# Health Check
echo "1️⃣  Testing Health Check..."
curl -s -X GET "$API_BASE/health" \
  -H "Content-Type: application/json" | jq '.' 2>/dev/null || echo "Health check response received"
echo ""

# Email Check (should return false for new email)
echo "2️⃣  Testing Email Check (new email)..."
curl -s -X GET "$API_BASE/check-email?email=test@example.com" \
  -H "Content-Type: application/json"
echo ""

# User Registration
echo "3️⃣  Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }')

echo "$REGISTER_RESPONSE" | jq '.' 2>/dev/null || echo "$REGISTER_RESPONSE"

# Extract access token from registration response
ACCESS_TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.accessToken' 2>/dev/null)
REFRESH_TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.refreshToken' 2>/dev/null)

echo ""

# Email Check (should return true for existing email)
echo "4️⃣  Testing Email Check (existing email)..."
curl -s -X GET "$API_BASE/check-email?email=john.doe@example.com" \
  -H "Content-Type: application/json"
echo ""

# User Login
echo "5️⃣  Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"
echo ""

# Token Refresh (if we have a refresh token)
if [ "$REFRESH_TOKEN" != "null" ] && [ "$REFRESH_TOKEN" != "" ]; then
  echo "6️⃣  Testing Token Refresh..."
  REFRESH_RESPONSE=$(curl -s -X POST "$API_BASE/refresh" \
    -H "Content-Type: application/json" \
    -d "\"$REFRESH_TOKEN\"")
  
  echo "$REFRESH_RESPONSE" | jq '.' 2>/dev/null || echo "$REFRESH_RESPONSE"
  echo ""
fi

# Test Invalid Login
echo "7️⃣  Testing Invalid Login..."
INVALID_LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }')

echo "Response Code: $(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_BASE/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }')"
echo ""

# Test Duplicate Registration
echo "8️⃣  Testing Duplicate Registration..."
DUPLICATE_RESPONSE=$(curl -s -X POST "$API_BASE/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john.doe@example.com",
    "password": "password456"
  }')

echo "Response Code: $(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_BASE/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john.doe@example.com",
    "password": "password456"
  }')"
echo ""

# Summary
echo "✅ Testing Complete!"
echo "================================================="
echo ""
echo "Expected Results:"
echo "1️⃣  Health Check: Should return 'Authentication service is running'"
echo "2️⃣  Email Check (new): Should return 'false'"
echo "3️⃣  Registration: Should return 201 with JWT tokens and user data"
echo "4️⃣  Email Check (existing): Should return 'true'"
echo "5️⃣  Login: Should return 200 with JWT tokens and user data"
echo "6️⃣  Token Refresh: Should return 200 with new access token"
echo "7️⃣  Invalid Login: Should return 401 Unauthorized"
echo "8️⃣  Duplicate Registration: Should return 409 Conflict"
echo ""
echo "🔍 Manual verification steps:"
echo "- Check that JWT tokens are valid Base64 strings"
echo "- Verify user data structure in responses"
echo "- Confirm proper HTTP status codes"
echo "- Test token expiration (after 24 hours for access token)"
