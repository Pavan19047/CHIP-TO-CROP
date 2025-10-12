# 🔑 API Keys Setup Guide for Chip to Crop

## Required API Keys

### 1. **Google AI API Key** (REQUIRED for AI Advisor) 🤖

**What it's for:** Powers the AI Advisor chat feature using Google's Gemini model

**How to get it:**
1. Go to **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the key

**Add to `.env`:**
```bash
GOOGLE_GENAI_API_KEY=AIzaSy...your_actual_key_here
GENKIT_ENV=dev
```

**Cost:** 
- Free tier: 60 requests per minute
- Gemini 1.5 Flash is free for most use cases

---

## Optional API Keys (For Production Features)

### 2. **Cloud Storage API Keys** (For Real File Uploads) ☁️

#### Option A: AWS S3
**How to get it:**
1. Go to **https://console.aws.amazon.com**
2. Navigate to IAM → Users → Create User
3. Give permissions: `AmazonS3FullAccess`
4. Create Access Key

**Add to `.env`:**
```bash
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=chip-to-crop-uploads
```

#### Option B: Google Cloud Storage
**How to get it:**
1. Go to **https://console.cloud.google.com**
2. Create a project
3. Enable Cloud Storage API
4. Create Service Account with Storage Admin role
5. Download JSON key file

**Add to `.env`:**
```bash
GCS_PROJECT_ID=your-project-id
GCS_BUCKET=chip-to-crop-uploads
GOOGLE_APPLICATION_CREDENTIALS=./path-to-service-account-key.json
```

#### Option C: Azure Blob Storage
**How to get it:**
1. Go to **https://portal.azure.com**
2. Create Storage Account
3. Get Connection String

**Add to `.env`:**
```bash
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;...
AZURE_STORAGE_CONTAINER=uploads
```

---

### 3. **Database Connection** (For Storing Real Data) 💾

#### Option A: Supabase (Easiest - Free Tier)
**How to get it:**
1. Go to **https://supabase.com**
2. Create new project
3. Copy the connection string

**Add to `.env`:**
```bash
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

#### Option B: Vercel Postgres
**How to get it:**
1. Go to **https://vercel.com/dashboard**
2. Create new Postgres database
3. Copy connection string

**Add to `.env`:**
```bash
POSTGRES_URL=postgres://default:...@...postgres.vercel-storage.com/verceldb
POSTGRES_PRISMA_URL=postgres://default:...@...postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15
```

---

### 4. **Email Service** (For Notifications) 📧

#### Option A: SendGrid (Recommended)
**How to get it:**
1. Go to **https://sendgrid.com**
2. Create account (Free: 100 emails/day)
3. Settings → API Keys → Create API Key

**Add to `.env`:**
```bash
SENDGRID_API_KEY=SG.xxx...
EMAIL_FROM=noreply@yourdomain.com
```

#### Option B: Resend (Modern Alternative)
**How to get it:**
1. Go to **https://resend.com**
2. Create account (Free: 100 emails/day)
3. Generate API key

**Add to `.env`:**
```bash
RESEND_API_KEY=re_xxx...
EMAIL_FROM=noreply@yourdomain.com
```

---

### 5. **Redis** (For Job Queue & Caching) 🚀

#### Option A: Upstash Redis (Free Tier)
**How to get it:**
1. Go to **https://upstash.com**
2. Create database
3. Copy REST URL

**Add to `.env`:**
```bash
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

#### Option B: Redis Cloud
**How to get it:**
1. Go to **https://redis.com/try-free**
2. Create database
3. Copy connection string

**Add to `.env`:**
```bash
REDIS_URL=redis://default:[password]@[host]:12345
```

---

## 📋 Complete `.env` Template

Here's what your complete `.env` file should look like:

```bash
# ============================================
# REQUIRED - AI Features
# ============================================
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
GENKIT_ENV=dev

# ============================================
# OPTIONAL - Cloud Storage (Choose one)
# ============================================
# AWS S3
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=us-east-1
# AWS_S3_BUCKET=chip-to-crop-uploads

# OR Google Cloud Storage
# GCS_PROJECT_ID=
# GCS_BUCKET=chip-to-crop-uploads
# GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

# OR Azure Blob Storage
# AZURE_STORAGE_CONNECTION_STRING=
# AZURE_STORAGE_CONTAINER=uploads

# ============================================
# OPTIONAL - Database (Choose one)
# ============================================
# Supabase
# DATABASE_URL=postgresql://...
# NEXT_PUBLIC_SUPABASE_URL=https://...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# OR Vercel Postgres
# POSTGRES_URL=
# POSTGRES_PRISMA_URL=

# ============================================
# OPTIONAL - Email Service (Choose one)
# ============================================
# SendGrid
# SENDGRID_API_KEY=
# EMAIL_FROM=noreply@yourdomain.com

# OR Resend
# RESEND_API_KEY=
# EMAIL_FROM=noreply@yourdomain.com

# ============================================
# OPTIONAL - Redis/Cache
# ============================================
# Upstash Redis
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=

# OR Redis Cloud
# REDIS_URL=

# ============================================
# Application Settings
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# File Upload Settings
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/heic
```

---

## 🚀 Quick Start - Minimum Setup

**To get the AI Advisor working RIGHT NOW, you only need:**

1. **Google AI API Key** (Free)
   - Get it here: https://makersuite.google.com/app/apikey
   - Add to `.env`: `GOOGLE_GENAI_API_KEY=your_key`

2. **Restart your dev server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. **Test it!**
   - Go to http://localhost:3000/dashboard/advisor
   - Click "Chat Advisor" tab
   - Ask: "How do I upload images?"

---

## 💰 Cost Breakdown

### Free Tier Options
- ✅ **Google AI (Gemini)**: Free (60 req/min)
- ✅ **Supabase**: Free (500MB database, 2GB storage)
- ✅ **Upstash Redis**: Free (10k commands/day)
- ✅ **SendGrid**: Free (100 emails/day)
- ✅ **Vercel Hosting**: Free (100GB bandwidth)

### Total Cost to Run Everything: **$0** (using free tiers)

---

## 🔒 Security Best Practices

1. **Never commit `.env` to git**
   - Already in `.gitignore`
   - Use `.env.example` for templates

2. **Use different keys for dev/production**
   - `.env.local` for local development
   - Vercel/hosting dashboard for production

3. **Rotate keys regularly**
   - Every 90 days for production
   - Immediately if compromised

4. **Set proper permissions**
   ```bash
   chmod 600 .env
   ```

---

## ❓ Need Help?

### Google AI API Key Issues
- **Error: "Invalid API key"** → Make sure you copied the full key
- **Error: "Quota exceeded"** → You've hit the free tier limit (60 req/min)
- **Can't generate key** → Make sure you're signed into Google

### Other Issues
- Check the IMPLEMENTATION_GUIDE.md for detailed setup
- Look at console errors in browser (F12)
- Check terminal logs for server errors

---

## 📝 Next Steps

1. ✅ Get Google AI API key (5 minutes)
2. ✅ Add to `.env` file
3. ✅ Restart server
4. ✅ Test AI Advisor
5. 🔜 Add other services as needed

**Start with just the Google AI key - everything else is optional for later!**
