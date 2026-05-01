# 🚀 Render.com Backend Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Create Render Account
Go to https://render.com and sign up with GitHub

### Step 3: Create New Web Service
1. Click **"New"** → **"Web Service"**
2. Select your GitHub repository
3. Choose **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Click **"Create Web Service"**

### Step 4: Add Environment Variables
In Render dashboard → Your service → **Environment**:

```
MONGO_URI=mongodb+srv://skg270323_db_user:141213@cluster0.iwlglia.mongodb.net/
JWT_SECRET=welcomebuddy147
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NODE_ENV=production
```

### Step 5: Deploy
Click **"Manual Deploy"** or wait for auto-deploy from GitHub

---

## Get Your Backend URL

After deployment completes:
- Render gives you URL: `https://innovate-jharkhand-backend.onrender.com`
- This is your `VITE_API_URL`

---

## Update Frontend

In `frontend/.env`:
```
VITE_API_URL=https://innovate-jharkhand-backend.onrender.com
```

Then redeploy frontend on Vercel (auto-redeploy or manual trigger).

---

## ✅ Deployment Complete

| Service | URL | Status |
|---------|-----|--------|
| Frontend | https://innovate-jharkhand.vercel.app | Vercel |
| Backend | https://innovate-jharkhand-backend.onrender.com | Render |

---

## Testing

1. Visit frontend URL
2. Fill contact form
3. Try payment (online or counter)
4. Check backend logs in Render dashboard

---

## Free Tier Details

**Render Free:**
- ✅ Free tier available
- ⚠️ Spins down after 15 min inactivity (cold start)
- ✅ Unlimited restarts
- ✅ 750 build hours/month

To keep warm: Add `curl` job every 10 min (external monitoring)

---

## Troubleshooting

**Build failed?**
- Check Build Logs in Render
- Ensure backend dependencies install: `npm install`

**Backend not responding?**
- Check backend logs: `Console` tab
- Verify environment variables are set
- Check MONGO_URI connection

**Frontend can't reach backend?**
- Update VITE_API_URL in frontend/.env
- Redeploy frontend after update
