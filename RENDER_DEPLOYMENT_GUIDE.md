# 🚀 Deploy Omniplex to Render

## Prerequisites
- GitHub account
- Render account (free at https://render.com)
- Stripe test account with API keys

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
```bash
git remote add origin https://github.com/yourusername/omniplex.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect GitHub** and select your omniplex repository
4. **Configure the service**:
   - **Name**: `omniplex-app`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (for testing)

## Step 3: Set Environment Variables

In Render dashboard, go to **Environment** tab and add:

### Required for Stripe:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RoSp13yvuI3HNhvvhjcMGVOS5tY4RaYTtnlNqubNNT7EsRAhasKoTXXkKMJAorsAk1ibBdkZU45e2Tq6SbGmpY300P9x1xsas
STRIPE_SECRET_KEY=sk_test_51RoSp13yvuI3HNhvEAWy8AeB7ABZ4pNXgFPimE0O7Tv0LtLj8nRwAahim7wjPrMJNQz896KUVhX969fUQgEiEgEE00domyPuGj
```

### Optional (for full functionality):
```
OPENAI_API_KEY=your_openai_key
BING_API_KEY=your_bing_key
OPENWEATHERMAP_API_KEY=your_weather_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
FINNHUB_API_KEY=your_finnhub_key
```

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your app will be available at: `https://your-app-name.onrender.com`

## Step 5: Test Stripe Integration

1. Visit your deployed app
2. Click "⭐ Upgrade to Pro"
3. Test with card: `4242 4242 4242 4242`
4. Verify success page works

## Troubleshooting

- **Build fails**: Check Node.js version in package.json
- **Stripe errors**: Verify environment variables are set correctly
- **404 errors**: Ensure all API routes are properly deployed

## Features Working:
✅ Stripe payment integration
✅ Success/cancel pages
✅ API routes
✅ Static assets
✅ Environment variables
