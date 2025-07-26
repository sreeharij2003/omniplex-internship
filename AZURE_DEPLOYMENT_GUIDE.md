# Azure Deployment Guide for Omniplex

## Prerequisites
1. ✅ Azure account created at https://azure.microsoft.com/en-us/free/
2. ✅ Stripe test account with API keys
3. ✅ Application tested locally

## Step 1: Create Azure App Service

### Option A: Using Azure Portal (Recommended)
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Web App" and select it
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Your free trial subscription
   - **Resource Group**: Create new (e.g., "omniplex-rg")
   - **Name**: Choose unique name (e.g., "omniplex-yourname")
   - **Publish**: Code
   - **Runtime stack**: Node 18 LTS
   - **Operating System**: Linux
   - **Region**: Choose closest to you
   - **Pricing plan**: Free F1 (included in free trial)
6. Click "Review + create" then "Create"

### Option B: Using Azure CLI
```bash
# Login to Azure
az login

# Create resource group
az group create --name omniplex-rg --location "East US"

# Create App Service plan
az appservice plan create --name omniplex-plan --resource-group omniplex-rg --sku F1 --is-linux

# Create web app
az webapp create --resource-group omniplex-rg --plan omniplex-plan --name omniplex-yourname --runtime "NODE|18-lts"
```

## Step 2: Configure Environment Variables

1. Go to your App Service in Azure Portal
2. Navigate to **Settings > Configuration**
3. Click **"+ New application setting"** for each variable:

### Required Environment Variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_51RoSp13yvuI3HNhvvhjcMGVOS5tY4RaYTtnlNqubNNT7EsRAhasKoTXXkKMJAorsAk1ibBdkZU45e2Tq6SbGmpY300P9x1xsas
STRIPE_SECRET_KEY = sk_test_51RoSp13yvuI3HNhvEAWy8AeB7ABZ4pNXgFPimE0O7Tv0LtLj8nRwAahim7wjPrMJNQz896KUVhX969fUQgEiEgEE00domyPuGj
NODE_ENV = production
```

4. Click **"Save"** after adding all variables

## Step 3: Deploy the Application

### Option A: GitHub Deployment (Recommended)
1. Push your code to GitHub repository
2. In Azure Portal, go to your App Service
3. Navigate to **Deployment > Deployment Center**
4. Choose **GitHub** as source
5. Authorize Azure to access your GitHub
6. Select your repository and branch
7. Click **Save**

### Option B: ZIP Deployment
1. Create a ZIP file of your project (exclude node_modules, .git)
2. Use Azure CLI:
```bash
az webapp deployment source config-zip --resource-group omniplex-rg --name omniplex-yourname --src omniplex.zip
```

### Option C: Local Git Deployment
1. In Azure Portal, go to **Deployment > Deployment Center**
2. Choose **Local Git**
3. Copy the Git clone URL
4. Add Azure as remote:
```bash
git remote add azure <your-git-clone-url>
git push azure main
```

## Step 4: Verify Deployment

1. Wait for deployment to complete (5-10 minutes)
2. Go to your App Service URL: `https://omniplex-yourname.azurewebsites.net`
3. Test the application:
   - ✅ Page loads without errors
   - ✅ Click "Upgrade to Pro" button
   - ✅ Test Stripe payment with 4242 4242 4242 4242
   - ✅ Verify success page

## Step 5: Configure Custom Domain (Optional)

1. In Azure Portal, go to **Settings > Custom domains**
2. Click **"+ Add custom domain"**
3. Follow the verification steps

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version in App Service
2. **Environment variables not working**: Restart the App Service
3. **Stripe not working**: Verify environment variables are set correctly

### Logs:
- View logs in **Monitoring > Log stream**
- Or use Azure CLI: `az webapp log tail --name omniplex-yourname --resource-group omniplex-rg`

## Final Checklist:
- ✅ App Service created
- ✅ Environment variables configured
- ✅ Application deployed
- ✅ Stripe payment tested
- ✅ Public URL accessible

## Your Deployment URL:
`https://omniplex-yourname.azurewebsites.net`

Replace "yourname" with your chosen app name.
