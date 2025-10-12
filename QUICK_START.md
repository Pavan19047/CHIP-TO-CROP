# 🎯 Quick Setup - Get Started in 5 Minutes!

## Step 1: Get Your Google AI API Key (FREE) 🔑

### Option 1: Google AI Studio (Easiest)
1. **Visit**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. Click **"Create API Key"** button
4. Click **"Create API Key in new project"**
5. **Copy** the key (starts with `AIzaSy...`)

### Option 2: Google Cloud Console
1. **Visit**: https://console.cloud.google.com
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **"Create Credentials"** → **API Key**
5. **Enable** the **Generative Language API**
6. **Copy** your API key

---

## Step 2: Add the Key to Your Project

### Open your `.env` file
Located at: `c:\Users\pavan\Downloads\CHIP TO CROP\.env`

### Replace this line:
```bash
GOOGLE_GENAI_API_KEY=your_api_key_here
```

### With your actual key:
```bash
GOOGLE_GENAI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Important:** 
- Don't add quotes around the key
- Don't share this key publicly
- Don't commit it to GitHub

---

## Step 3: Restart Your Server

### Stop the current server:
Press `Ctrl + C` in your terminal

### Start it again:
```bash
npm run dev
```

---

## Step 4: Test the AI Advisor! 🤖

1. **Open**: http://localhost:3000/dashboard/advisor
2. Click the **"Chat Advisor"** tab
3. Try asking:
   - "How do I upload images?"
   - "What crops can you analyze?"
   - "How do I export reports?"

You should get AI-powered responses! 🎉

---

## ✅ Checklist

- [ ] Got Google AI API key from makersuite.google.com
- [ ] Copied the key (starts with `AIzaSy`)
- [ ] Pasted it in `.env` file
- [ ] Saved the file
- [ ] Restarted the dev server (`npm run dev`)
- [ ] Tested AI Advisor at `/dashboard/advisor`

---

## 🐛 Troubleshooting

### "Invalid API Key" Error
- ✅ Make sure you copied the entire key
- ✅ No extra spaces before/after the key
- ✅ No quotes around the key
- ✅ Saved the `.env` file
- ✅ Restarted the server

### "Quota Exceeded" Error
- You've hit the free tier limit (60 requests/minute)
- Wait a minute and try again
- Or upgrade to paid tier (very cheap)

### AI Advisor Not Responding
- Check browser console for errors (F12)
- Check terminal for server errors
- Make sure you're on the "Chat Advisor" tab
- Try refreshing the page

---

## 💰 Cost

**Google AI (Gemini 1.5 Flash):**
- ✅ **FREE** for development
- ✅ 60 requests per minute
- ✅ No credit card required
- ✅ Enough for testing and small projects

**For production** (when you have many users):
- Very cheap: ~$0.35 per 1M characters
- You can stay on free tier for a long time!

---

## 🎯 What Works After This Setup

✅ **AI Advisor Chat** - Ask questions, get answers  
✅ **Follow-up Questions** - Suggested related questions  
✅ **FAQ System** - Instant answers to common questions  
✅ **Confidence Scores** - See how confident the AI is  

---

## 🚀 All Other Features Work Without API Keys!

These features work with mock data (no keys needed):
- ✅ Dashboard Overview
- ✅ Upload Data (simulated)
- ✅ Results Table
- ✅ Report Generation
- ✅ All charts and stats
- ✅ **Image Generation** (placeholder images - FREE)

---

## 🎨 Note About Image Generation

The **Image Generation** feature currently uses **placeholder images** (FREE, unlimited).

**Real AI image generation requires billing:**
- See `IMAGEN_BILLING_INFO.md` for details
- Imagen costs ~$0.02-$0.08 per image
- Not needed for development/testing
- Optional for production

---

## 📚 Need More Help?

- **Full Guide**: See `API_KEYS_GUIDE.md` for all optional keys
- **Implementation**: See `IMPLEMENTATION_GUIDE.md` for backend setup
- **Features**: See `FEATURES_LIVE.md` for what's working

---

## 🎉 You're All Set!

Once you've added the Google AI key, your AI Advisor will be fully functional! All other features are already working with mock data. 

**Ready to test?** → http://localhost:3000/dashboard/advisor 🚀
