# 🎨 Image Generation with Imagen - Billing Required

## ⚠️ Current Status

The **Imagen API** (Google's image generation model) requires **billing to be enabled** on your Google Cloud account. It is **NOT available on the free tier**.

## What's Currently Working

✅ **AI Chat Advisor** - Uses Gemini 2.5 Flash (FREE)  
✅ **Dashboard Features** - All analytics, uploads, reports (FREE)  
✅ **Mock Image Generation** - Placeholder images using free services (FREE)  

❌ **Real Image Generation** - Requires Imagen billing

---

## 💰 Imagen Pricing

If you want to enable real image generation:

### Imagen 4 Models
- **imagen-4.0-generate-001** (Standard): ~$0.04 per image
- **imagen-4.0-fast-generate-001** (Fast): ~$0.02 per image  
- **imagen-4.0-ultra-generate-001** (Ultra): ~$0.08 per image

### What You Get
- High-quality AI-generated images
- 1K or 2K resolution
- Multiple aspect ratios (1:1, 4:3, 16:9, etc.)
- Text-to-image generation
- Up to 4 images per request

**Cost Example:**
- 100 images with Fast model = $2.00
- 500 images with Fast model = $10.00

---

## 🔧 How to Enable Billing (Optional)

### Step 1: Set Up Google Cloud Billing

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Select your project (or create a new one)
3. Go to **Billing** in the left menu
4. Click **"Link a billing account"**
5. Follow the prompts to add a credit/debit card

### Step 2: Enable Imagen API

1. In Google Cloud Console, go to **APIs & Services**
2. Click **"Enable APIs and Services"**
3. Search for **"Vertex AI API"** (Imagen is part of Vertex AI)
4. Click **Enable**

### Step 3: Update Your Code

Once billing is enabled, edit this file:
```
src/ai/flows/image-generation-advisor.ts
```

**Uncomment the Imagen code** at the bottom of the file:
```typescript
/* UNCOMMENT THIS WHEN BILLING IS ENABLED:
const fullPrompt = `An ultra-realistic, high-definition photograph...`;

const { media } = await ai.generate({
    model: 'googleai/imagen-4.0-fast-generate-001',
    prompt: fullPrompt,
});
...
*/
```

Remove the placeholder code and uncomment the real Imagen implementation.

### Step 4: Restart Your Server

```bash
npm run dev
```

---

## 🆓 Free Alternatives

If you don't want to enable billing, you can:

### Option 1: Use the Current Placeholder
The app currently uses **DiceBear API** (free, unlimited) to generate abstract placeholder images based on your prompt.

### Option 2: Use Other Free APIs
You can integrate free image generation services:

- **Unsplash API** - Free stock photos (https://unsplash.com/developers)
- **Pexels API** - Free stock photos (https://www.pexels.com/api/)
- **Lorem Picsum** - Random placeholder images (https://picsum.photos/)

### Option 3: Stable Diffusion (Self-Hosted)
For production without billing, consider self-hosting:
- **Stable Diffusion** - Open source, run locally
- **Replicate API** - Pay-as-you-go (cheaper than Google)
- **Hugging Face Inference API** - Free tier available

---

## 📋 Billing Safety Tips

If you decide to enable billing:

### Set Budget Alerts
1. Go to **Billing** > **Budgets & alerts**
2. Click **"Create Budget"**
3. Set a monthly limit (e.g., $10)
4. Enable email alerts at 50%, 90%, 100%

### Monitor Usage
- Check **Billing** > **Reports** regularly
- Review API usage in **APIs & Services** > **Dashboard**
- Set up cost tracking by service

### Rate Limiting
Add rate limiting to your image generation:
```typescript
// Limit to 10 images per user per day
const MAX_IMAGES_PER_DAY = 10;
```

---

## 🎯 Recommended Approach

**For Development/Testing:**
- ✅ Use the free placeholder images (current setup)
- ✅ Use Gemini 2.5 Flash for AI chat (FREE)
- ✅ Test all other features without billing

**For Production (if needed):**
- Enable billing only when you have real users
- Start with **imagen-4.0-fast-generate-001** (cheapest)
- Set a strict budget limit ($10-20/month)
- Add user rate limiting

---

## 🔗 Useful Links

- **Google Cloud Pricing**: https://cloud.google.com/vertex-ai/pricing
- **Imagen Documentation**: https://ai.google.dev/gemini-api/docs/imagen
- **Budget Setup Guide**: https://cloud.google.com/billing/docs/how-to/budgets
- **API Key Limits**: https://ai.google.dev/gemini-api/docs/rate-limits

---

## ❓ FAQ

**Q: Can I use Gemini for image generation?**  
A: Gemini can understand images but cannot generate them. You need Imagen for generation.

**Q: Is there a free trial?**  
A: Google Cloud offers $300 free credits for new accounts (90 days), which includes Imagen.

**Q: What happens if I hit my budget limit?**  
A: You can set alerts but APIs won't automatically stop. Consider implementing your own rate limits.

**Q: Are there cheaper alternatives?**  
A: Yes! Replicate, Stability AI, and Hugging Face offer competitive pricing.

---

## ✅ Summary

- **Current Setup**: Placeholder images (FREE, works now)
- **To Use Real Imagen**: Enable billing ($0.02-$0.08 per image)
- **Best Practice**: Keep placeholder for dev, enable billing only when needed

**You don't need to do anything right now!** All other features work perfectly without billing. 🎉
