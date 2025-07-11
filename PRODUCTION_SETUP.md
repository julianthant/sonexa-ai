# 🚀 Sonexa AI Production Deployment Guide

## 📋 **Required API Keys & Environment Variables**

### **Backend Environment Variables (.env or application.properties)**

#### **Database Configuration**

```properties
# PostgreSQL Database
spring.datasource.url=jdbc:postgresql://localhost:5432/sonexa_ai
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

#### **AI Service API Keys**

```properties
# OpenAI Configuration (for paid tiers)
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o
OPENAI_BASE_URL=https://api.openai.com/v1

# Azure OpenAI Configuration (for free tier)
AZURE_AI_KEY=your-azure-openai-key-here
AZURE_AI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_AI_DEPLOYMENT_NAME=gpt-35-turbo
AZURE_AI_API_VERSION=2024-02-01

# Azure Speech Services
AZURE_SPEECH_KEY=your-azure-speech-key-here
AZURE_SPEECH_REGION=eastus
```

#### **Stripe Payment Configuration**

```properties
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key-here
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret-here

# Stripe Price IDs (create these in Stripe Dashboard)
STRIPE_BASIC_PRICE_ID=price_basic_monthly_live
STRIPE_PREMIUM_PRICE_ID=price_premium_monthly_live
STRIPE_ENTERPRISE_PRICE_ID=price_enterprise_monthly_live
```

#### **JWT & Security Configuration**

```properties
# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here-min-256-bits
JWT_EXPIRATION=86400000

# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### **Frontend Environment Variables (.env.local)**

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key-here

# OAuth Configuration (when implementing)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your-microsoft-oauth-client-id

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=GA-XXXXXXXXX
```

---

## 🔑 **How to Obtain API Keys**

### **1. OpenAI API Key**

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up/Login to your account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Set usage limits and billing

### **2. Azure OpenAI Service**

1. Go to [Azure Portal](https://portal.azure.com)
2. Create "Azure OpenAI" resource
3. Get the endpoint and keys from the resource
4. Deploy a model (gpt-35-turbo recommended for free tier)
5. Note the deployment name

### **3. Azure Speech Services**

1. In Azure Portal, create "Speech Services" resource
2. Get the key and region from the resource
3. Note the region (e.g., eastus, westus2)

### **4. Stripe Payment Processing**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API keys from Developers > API keys
3. Create products and prices for subscriptions:
   - Basic Plan: $19.99/month
   - Premium Plan: $79.99/month
   - Enterprise Plan: $299.99/month
4. Set up webhook endpoint for payment events
5. Get webhook secret from webhook settings

### **5. OAuth Providers (Optional)**

#### **Google OAuth**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized domains

#### **Microsoft OAuth**

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "App registrations"
3. Create new registration
4. Get Application (client) ID
5. Add redirect URIs

---

## 🗄️ **Database Setup**

### **PostgreSQL Production Setup**

```sql
-- Create database
CREATE DATABASE sonexa_ai;

-- Create user (replace with secure password)
CREATE USER sonexa_user WITH ENCRYPTED PASSWORD 'your_secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE sonexa_ai TO sonexa_user;

-- Connect to database and grant schema permissions
\c sonexa_ai;
GRANT ALL ON SCHEMA public TO sonexa_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sonexa_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sonexa_user;
```

### **Database Migration**

The Spring Boot application will automatically create tables on first run with `spring.jpa.hibernate.ddl-auto=update`.

---

## 🚀 **Deployment Instructions**

### **Backend Deployment (Spring Boot)**

#### **Option 1: Traditional Server (JAR)**

```bash
# Build the application
./mvnw clean package -DskipTests

# Run with production profile
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

#### **Option 2: Docker Deployment**

```dockerfile
# Dockerfile already exists in backend/
docker build -t sonexa-ai-backend .
docker run -p 8080:8080 --env-file .env sonexa-ai-backend
```

### **Frontend Deployment (Next.js)**

#### **Option 1: Vercel (Recommended)**

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

#### **Option 2: Traditional Server**

```bash
# Build the application
npm run build

# Start production server
npm start
```

#### **Option 3: Static Export**

```bash
# For static hosting (Netlify, etc.)
npm run build
npm run export
```

---

## 🔧 **Production Configuration**

### **Security Checklist**

- [ ] Use HTTPS for all endpoints
- [ ] Set secure CORS origins
- [ ] Use strong JWT secret (256+ bits)
- [ ] Enable rate limiting
- [ ] Set up API monitoring
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Set up backup procedures

### **Performance Optimizations**

- [ ] Enable database connection pooling
- [ ] Set up Redis for session storage
- [ ] Configure CDN for static assets
- [ ] Enable compression (gzip)
- [ ] Set up monitoring and logging
- [ ] Configure auto-scaling

### **Monitoring & Analytics**

- [ ] Set up application monitoring (New Relic, Datadog)
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Enable application logs
- [ ] Monitor API usage and costs

---

## 💳 **Stripe Webhook Configuration**

### **Webhook Endpoint Setup**

1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://your-api.com/api/stripe/webhook`
3. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### **Webhook Handler (Already Implemented)**

The backend already has webhook handlers for subscription events.

---

## 🌐 **Domain & SSL Setup**

### **Domain Configuration**

1. Purchase domain from registrar
2. Set up DNS records:
   - `A` record for backend API
   - `CNAME` or `A` record for frontend
3. Configure SSL certificates (Let's Encrypt recommended)

### **Example DNS Setup**

```
api.yourdomain.com -> Your backend server IP
app.yourdomain.com -> Your frontend server IP (or CNAME to Vercel)
```

---

## 📊 **Cost Estimation**

### **Monthly Costs (Approximate)**

- **Azure OpenAI (Free Tier)**: $0-50/month
- **OpenAI API (Paid Tiers)**: $100-1000/month (depending on usage)
- **Azure Speech Services**: $10-100/month
- **Stripe Processing**: 2.9% + $0.30 per transaction
- **Database Hosting**: $20-200/month
- **Server Hosting**: $50-500/month
- **Domain & SSL**: $10-50/year

### **Scaling Considerations**

- Start with basic hosting for MVP
- Monitor API usage and costs
- Scale infrastructure based on user growth
- Consider implementing usage limits per tier

---

## 🔍 **Testing Production Setup**

### **Pre-Launch Checklist**

- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Test payment processing (use Stripe test mode first)
- [ ] Verify AI routing (free vs paid tiers)
- [ ] Test webhook handling
- [ ] Verify email notifications
- [ ] Load test the application
- [ ] Test error handling and logging

### **Go-Live Process**

1. Deploy to staging environment first
2. Run full test suite
3. Test with real payment methods (small amounts)
4. Verify monitoring and alerts
5. Deploy to production
6. Monitor for 24-48 hours post-launch

---

## 📞 **Support & Maintenance**

### **Regular Maintenance Tasks**

- Monitor API usage and costs
- Update dependencies and security patches
- Review and rotate API keys quarterly
- Monitor database performance
- Review error logs and fix issues
- Update AI models when available

### **Backup Strategy**

- Daily database backups
- Code repository backups
- Environment variable documentation
- Recovery procedure documentation

---

## 🎯 **Success Metrics**

### **Key Performance Indicators**

- User registration rate
- Subscription conversion rate
- API response times
- Error rates
- Customer satisfaction scores
- Monthly recurring revenue (MRR)

This guide provides everything needed for a successful production deployment of Sonexa AI!
