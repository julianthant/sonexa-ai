# Sonexa AI Backend - Required API Keys and Services

## Free Services (Available with GitHub Student Developer Pack)

### 1. Azure for Students ($100 credit)

**What you need:**

- Azure Speech Services (Text-to-Speech, Speech-to-Text)
- Azure Blob Storage (File storage)
- Azure Key Vault (Secrets management)
- Azure App Service (Backend hosting with Docker)

**How to get:**

1. Go to https://azure.microsoft.com/en-us/free/students/
2. Sign up with your student email
3. Create these services in Azure Portal:
   - **Speech Services**: Create a "Speech" resource
   - **Storage Account**: Create for blob storage
   - **Key Vault**: Create for secrets management
   - **App Service**: Create for hosting with Docker support

**Environment Variables Needed:**

```
AZURE_SPEECH_KEY=your_speech_service_key
AZURE_SPEECH_REGION=your_region (e.g., eastus)
AZURE_STORAGE_ACCOUNT_NAME=your_storage_account_name
AZURE_STORAGE_ACCOUNT_KEY=your_storage_account_key
AZURE_STORAGE_CONTAINER_NAME=voice-files
AZURE_KEYVAULT_URI=https://your-keyvault.vault.azure.net/
```

### 2. GitHub Codespaces & Actions (Free for students)

**What you get:**

- Free Codespaces for development
- GitHub Actions for CI/CD
- GitHub Container Registry for Docker images

**How to use:**

- Already included in your GitHub account
- Use for development and deployment automation

### 3. Stripe (Free for development/testing)

**What you need:**

- Payment processing
- Subscription management

**How to get:**

1. Go to https://stripe.com/
2. Create an account
3. Get your test API keys from Dashboard > Developers > API keys

**Environment Variables Needed:**

```
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. TestMail.app (Free tier)

**What you get:**

- Email testing service
- SMTP server for development

**How to get:**

1. Go to https://testmail.app/
2. Create an account
3. Get SMTP credentials

**Environment Variables Needed:**

```
TESTMAIL_USERNAME=your_testmail_username
TESTMAIL_PASSWORD=your_testmail_password
```

## Additional Free Services (OAuth Integrations)

### 5. Google Cloud Platform (Free tier)

**For Gmail integration:**

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials

**Environment Variables:**

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 6. Microsoft Azure AD (Free)

**For Outlook integration:**

1. Go to https://portal.azure.com/
2. Navigate to Azure Active Directory > App registrations
3. Create new registration
4. Add Microsoft Graph API permissions

**Environment Variables:**

```
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

### 7. GitHub OAuth (Free)

**For GitHub integration:**

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App

**Environment Variables:**

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Security & Secrets

### JWT Secret

**Generate a secure JWT secret:**

```bash
# Generate a random 256-bit key
openssl rand -base64 32
```

**Environment Variable:**

```
JWT_SECRET=your_generated_jwt_secret
```

## Docker Deployment on Azure

### Container Registry

Use Azure Container Registry (included in your Azure credits):

1. Create Azure Container Registry
2. Build and push your Docker image
3. Deploy to Azure App Service

### Environment Setup

Create a `.env` file for local development:

```
# Azure Services
AZURE_SPEECH_KEY=your_key
AZURE_SPEECH_REGION=eastus
AZURE_STORAGE_ACCOUNT_NAME=your_account
AZURE_STORAGE_ACCOUNT_KEY=your_key
AZURE_STORAGE_CONTAINER_NAME=voice-files
AZURE_KEYVAULT_URI=https://your-keyvault.vault.azure.net/

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Email
TESTMAIL_USERNAME=your_username
TESTMAIL_PASSWORD=your_password

# OAuth
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
MICROSOFT_CLIENT_ID=your_microsoft_id
MICROSOFT_CLIENT_SECRET=your_microsoft_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret

# Security
JWT_SECRET=your_generated_secret
```

## Cost Breakdown (All Free/Student Credits)

1. **Azure for Students**: $100 credit (enough for development and initial deployment)
2. **Stripe**: Free for testing, 2.9% + 30¢ per transaction when live
3. **TestMail.app**: Free tier with limitations
4. **Google Cloud**: Free tier for OAuth
5. **Microsoft Azure AD**: Free for basic OAuth
6. **GitHub**: Free for students (already using)

## Next Steps

1. Set up Azure for Students account
2. Create all the Azure resources
3. Set up Stripe test account
4. Configure TestMail.app
5. Set up OAuth applications for email integrations
6. Configure all environment variables
7. Test locally with Docker
8. Deploy to Azure App Service

## Additional GitHub Student Benefits You Can Use

- **Heroku**: Alternative hosting (but Azure is better for your stack)
- **DigitalOcean**: $100 credit (alternative to Azure)
- **MongoDB Atlas**: Database hosting (if you want to switch from PostgreSQL)
- **Sentry**: Error monitoring
- **LogDNA**: Log management
- **Domain.com**: Free domain for one year

Would you like me to proceed with implementing the services and controllers for these integrations?
