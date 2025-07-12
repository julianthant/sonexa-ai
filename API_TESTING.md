# API Testing Guide for Sonexa AI

## Health Check

curl -X GET http://localhost:8080/actuator/health

## Register User

curl -X POST http://localhost:8080/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{
"username": "testuser",
"email": "test@example.com",
"password": "Test123!"
}'

## Login User

curl -X POST http://localhost:8080/api/auth/authenticate \
 -H "Content-Type: application/json" \
 -d '{
"email": "test@example.com",
"password": "Test123!"
}'

## Test Azure Speech Service

curl -X POST http://localhost:8080/api/voice/test-azure-speech \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{
"text": "Hello, this is a test of Azure Speech Services."
}'

## Test Stripe Integration

curl -X GET http://localhost:8080/api/subscription/tiers \
 -H "Authorization: Bearer YOUR_JWT_TOKEN"

## Test Email Service

curl -X POST http://localhost:8080/api/email/test \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{
"to": "test@testmail.app",
"subject": "Test Email",
"body": "This is a test email from Sonexa AI"
}'
