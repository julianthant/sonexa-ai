# Azure Setup Guide for Sonexa AI

## Prerequisites

- Azure for Students account (get $100 credit)
- GitHub Student Developer Pack access
- Student email address

## 1. Azure for Students Setup

### Step 1: Sign Up

1. Go to https://azure.microsoft.com/en-us/free/students/
2. Click "Start free"
3. Sign in with your Microsoft account or create one
4. Verify your student status
5. You'll get $100 in Azure credits

### Step 2: Create Resource Group

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Create resource group
az group create --name sonexa-ai-rg --location eastus
```

## 2. Create Azure Services

### Speech Services

```bash
# Create Speech Service
az cognitiveservices account create \
  --name sonexa-ai-speech \
  --resource-group sonexa-ai-rg \
  --kind SpeechServices \
  --sku S0 \
  --location eastus

# Get Speech Service key
az cognitiveservices account keys list \
  --name sonexa-ai-speech \
  --resource-group sonexa-ai-rg
```

**Save these values:**

- `AZURE_SPEECH_KEY`: One of the keys from above command
- `AZURE_SPEECH_REGION`: eastus

### Azure Storage Account

```bash
# Create storage account
az storage account create \
  --name sonexaaistorage \
  --resource-group sonexa-ai-rg \
  --location eastus \
  --sku Standard_LRS

# Get storage account key
az storage account keys list \
  --account-name sonexaaistorage \
  --resource-group sonexa-ai-rg

# Create blob container
az storage container create \
  --name voice-files \
  --account-name sonexaaistorage
```

**Save these values:**

- `AZURE_STORAGE_ACCOUNT_NAME`: sonexaaistorage
- `AZURE_STORAGE_ACCOUNT_KEY`: Key from above command
- `AZURE_STORAGE_CONTAINER_NAME`: voice-files

### Azure Key Vault

```bash
# Create Key Vault
az keyvault create \
  --name sonexa-ai-keyvault \
  --resource-group sonexa-ai-rg \
  --location eastus

# Get Key Vault URI
az keyvault show \
  --name sonexa-ai-keyvault \
  --resource-group sonexa-ai-rg \
  --query properties.vaultUri
```

**Save this value:**

- `AZURE_KEYVAULT_URI`: URI from above command

### Azure Container Registry

```bash
# Create container registry
az acr create \
  --resource-group sonexa-ai-rg \
  --name sonexaairegistry \
  --sku Basic \
  --admin-enabled true

# Get ACR credentials
az acr credential show --name sonexaairegistry
```

**Save these values:**

- `AZURE_CONTAINER_REGISTRY_LOGIN_SERVER`: sonexaairegistry.azurecr.io
- `AZURE_CONTAINER_REGISTRY_USERNAME`: sonexaairegistry
- `AZURE_CONTAINER_REGISTRY_PASSWORD`: Password from above command

### Azure App Service

```bash
# Create App Service Plan
az appservice plan create \
  --name sonexa-ai-plan \
  --resource-group sonexa-ai-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group sonexa-ai-rg \
  --plan sonexa-ai-plan \
  --name sonexa-ai-backend \
  --deployment-container-image-name sonexaairegistry.azurecr.io/sonexa-ai-backend:latest
```

### Azure Database for PostgreSQL

```bash
# Create PostgreSQL server
az postgres flexible-server create \
  --resource-group sonexa-ai-rg \
  --name sonexa-ai-db \
  --location eastus \
  --admin-user sonexaadmin \
  --admin-password YourSecurePassword123! \
  --sku-name Standard_B1ms \
  --storage-size 32 \
  --version 14

# Create database
az postgres flexible-server db create \
  --resource-group sonexa-ai-rg \
  --server-name sonexa-ai-db \
  --database-name sonexaai
```

**Save these values:**

- `DATABASE_URL`: jdbc:postgresql://sonexa-ai-db.postgres.database.azure.com:5432/sonexaai?sslmode=require
- `DB_USERNAME`: sonexaadmin
- `DB_PASSWORD`: YourSecurePassword123!

## 3. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

### Azure Secrets

```
AZURE_CREDENTIALS={"clientId":"xxx","clientSecret":"xxx","subscriptionId":"xxx","tenantId":"xxx"}
AZURE_RESOURCE_GROUP=sonexa-ai-rg
AZURE_CONTAINER_REGISTRY_LOGIN_SERVER=sonexaairegistry.azurecr.io
AZURE_CONTAINER_REGISTRY_USERNAME=sonexaairegistry
AZURE_CONTAINER_REGISTRY_PASSWORD=your_acr_password

AZURE_SPEECH_KEY=your_speech_key
AZURE_SPEECH_REGION=eastus
AZURE_STORAGE_ACCOUNT_NAME=sonexaaistorage
AZURE_STORAGE_ACCOUNT_KEY=your_storage_key
AZURE_STORAGE_CONTAINER_NAME=voice-files
AZURE_KEYVAULT_URI=https://sonexa-ai-keyvault.vault.azure.net/

DATABASE_URL=jdbc:postgresql://sonexa-ai-db.postgres.database.azure.com:5432/sonexaai?sslmode=require
DB_USERNAME=sonexaadmin
DB_PASSWORD=YourSecurePassword123!
```

### Service Provider Secrets

```
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

TESTMAIL_USERNAME=your_testmail_username
TESTMAIL_PASSWORD=your_testmail_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

JWT_SECRET=your_generated_jwt_secret
```

## 4. Get Azure Credentials for GitHub Actions

```bash
# Create service principal
az ad sp create-for-rbac \
  --name "sonexa-ai-github" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/sonexa-ai-rg \
  --sdk-auth
```

Copy the entire JSON output and add it as `AZURE_CREDENTIALS` secret in GitHub.

## 5. Local Development Setup

Create `.env` file in your backend directory:

```bash
# Copy from the values you saved above
AZURE_SPEECH_KEY=your_key
AZURE_SPEECH_REGION=eastus
AZURE_STORAGE_ACCOUNT_NAME=sonexaaistorage
AZURE_STORAGE_ACCOUNT_KEY=your_key
AZURE_STORAGE_CONTAINER_NAME=voice-files
AZURE_KEYVAULT_URI=https://sonexa-ai-keyvault.vault.azure.net/

STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

TESTMAIL_USERNAME=your_username
TESTMAIL_PASSWORD=your_password

JWT_SECRET=your_generated_secret

# For local development, use H2 database
SPRING_PROFILES_ACTIVE=dev
```

## 6. Test Local Docker Build

```bash
cd backend

# Build Docker image
docker build -t sonexa-ai-backend .

# Run locally
docker run -p 8080:8080 --env-file .env sonexa-ai-backend
```

## 7. Deploy to Azure

Once you push to main branch, GitHub Actions will:

1. Build your Java application
2. Create Docker image
3. Push to Azure Container Registry
4. Deploy to Azure App Service
5. Configure environment variables

## 8. Monitor and Debug

### View logs

```bash
# Stream app service logs
az webapp log tail --name sonexa-ai-backend --resource-group sonexa-ai-rg
```

### Check app status

```bash
# Get app details
az webapp show --name sonexa-ai-backend --resource-group sonexa-ai-rg
```

### App Service URL

Your backend will be available at: `https://sonexa-ai-backend.azurewebsites.net`

## Cost Monitoring

Monitor your Azure credits:

1. Go to Azure Portal → Subscriptions
2. Click on your subscription
3. View "Cost Management" to track spending

The setup above should cost approximately:

- Speech Services: ~$10/month for moderate usage
- Storage Account: ~$1-2/month
- App Service B1: ~$13/month
- PostgreSQL Flexible Server: ~$15/month
- Container Registry: ~$5/month

Total: ~$45/month (well within your $100 student credit)

## Next Steps

1. Set up all the services above
2. Configure GitHub secrets
3. Push to main branch to trigger deployment
4. Test the deployed backend
5. Update your frontend to use the Azure backend URL

Need help with any specific step? Let me know!
