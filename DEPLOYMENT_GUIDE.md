# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### ✅ Essential Tasks

- [ ] **Environment Variables**
  - [ ] Set `GOOGLE_GENAI_API_KEY` in production
  - [ ] Configure `NEXT_PUBLIC_APP_URL`
  - [ ] Set `NODE_ENV=production`
  - [ ] Remove development-only variables

- [ ] **Security**
  - [ ] Review security headers in `next.config.js`
  - [ ] Enable HTTPS/SSL
  - [ ] Configure CORS policies
  - [ ] Update CSP (Content Security Policy)
  - [ ] Set up rate limiting for API routes

- [ ] **Performance**
  - [ ] Run production build: `npm run build`
  - [ ] Test build locally: `npm run serve`
  - [ ] Optimize images
  - [ ] Enable compression
  - [ ] Configure CDN (if applicable)

- [ ] **Testing**
  - [ ] Run type checking: `npm run type-check`
  - [ ] Run linting: `npm run lint`
  - [ ] Test all critical paths
  - [ ] Verify mobile responsiveness
  - [ ] Check browser compatibility

- [ ] **SEO & Metadata**
  - [ ] Update `metadataBase` URL in `src/app/layout.tsx`
  - [ ] Verify `robots.txt`
  - [ ] Create `sitemap.xml`
  - [ ] Add Open Graph images
  - [ ] Test meta tags with validators

- [ ] **Monitoring**
  - [ ] Set up error tracking (Sentry/Rollbar)
  - [ ] Configure analytics (Google Analytics)
  - [ ] Set up uptime monitoring
  - [ ] Configure log aggregation
  - [ ] Set up performance monitoring

---

## Deployment Platforms

### 🔷 Vercel (Recommended)

**Pros:** Zero-config, automatic deployments, edge functions, best Next.js support

**Steps:**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod

# 4. Set environment variables
vercel env add GOOGLE_GENAI_API_KEY production
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

**Environment Variables:**
```
GOOGLE_GENAI_API_KEY=your_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

---

### 🟦 Netlify

**Pros:** Easy setup, form handling, serverless functions

**Steps:**
```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Deploy
netlify deploy --prod
```

**Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### ☁️ AWS Amplify

**Pros:** AWS integration, auto-scaling, good for enterprise

**Steps:**
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

**amplify.yml:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### 🔵 Azure Static Web Apps

**Pros:** Microsoft ecosystem, good pricing, global distribution

**Configuration:**
```yaml
app_location: "/"
api_location: "api"
output_location: ".next"
```

---

### 🐳 Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

**Build & Run:**
```bash
# Build
docker build -t agrograde-insights .

# Run
docker run -p 3000:3000 \
  -e GOOGLE_GENAI_API_KEY=your_key \
  agrograde-insights
```

---

### 🖥️ VPS/Self-Hosted (Ubuntu)

**Steps:**
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Clone repository
git clone https://github.com/your-repo/agrograde-insights.git
cd agrograde-insights

# 5. Install dependencies
npm ci --production

# 6. Build application
npm run build

# 7. Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'agrograde-insights',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      GOOGLE_GENAI_API_KEY: 'your_key'
    }
  }]
}
EOF

# 8. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 9. Set up Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/agrograde
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/agrograde /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Environment-Specific Configuration

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_DEBUG=true
```

### Staging
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.agrograde.com
NEXT_PUBLIC_DEBUG=false
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://agrograde.com
NEXT_PUBLIC_DEBUG=false
```

---

## Post-Deployment Tasks

### ✅ Verification

1. **Smoke Testing**
   - [ ] Homepage loads correctly
   - [ ] Login/authentication works
   - [ ] Dashboard displays properly
   - [ ] Tomato detection functional
   - [ ] API endpoints responding
   - [ ] Images loading correctly

2. **Performance Testing**
   - [ ] Run Lighthouse audit (aim for 90+ scores)
   - [ ] Check Core Web Vitals
   - [ ] Test load times from different locations
   - [ ] Verify mobile performance

3. **Security Testing**
   - [ ] Run security headers check: https://securityheaders.com
   - [ ] Test SSL configuration: https://www.ssllabs.com
   - [ ] Verify CORS settings
   - [ ] Check for exposed secrets

### 📊 Monitoring Setup

**1. Error Tracking (Sentry)**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**2. Analytics (Google Analytics)**
```typescript
// src/lib/analytics.ts
export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}
```

**3. Performance Monitoring**
```typescript
// next.config.js
experimental: {
  instrumentationHook: true,
}
```

### 🔄 Continuous Deployment

**GitHub Actions (.github/workflows/deploy.yml):**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Scaling Considerations

### 🚀 Performance Optimization

1. **Enable CDN**
   - Static assets served from edge locations
   - Reduced latency globally

2. **Database Caching**
   - Redis for session storage
   - Cache frequently accessed data

3. **API Rate Limiting**
   - Prevent abuse
   - Fair usage policies

4. **Image Optimization**
   - WebP/AVIF formats
   - Lazy loading
   - Responsive images

### 📈 Load Balancing

For high traffic:
- Use multiple server instances
- Configure load balancer (Nginx/HAProxy)
- Session sticky routing
- Health checks

---

## Backup & Recovery

### 🔐 Backup Strategy

1. **Database Backups**
   - Daily automated backups
   - Store in separate location
   - Test restore procedures

2. **Code Repository**
   - Use Git tags for releases
   - Maintain deployment history
   - Document rollback procedures

3. **Environment Variables**
   - Securely store in vault
   - Version control (encrypted)
   - Access audit logs

### ⚡ Rollback Plan

```bash
# Vercel rollback
vercel rollback [deployment-url]

# PM2 rollback
git checkout previous-release
npm ci
npm run build
pm2 restart agrograde-insights
```

---

## Common Issues & Solutions

### Issue: Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Environment Variables Not Working
- Verify `.env.production` file exists
- Check variable names start with `NEXT_PUBLIC_` for client-side
- Restart development server after changes

### Issue: Images Not Loading
- Check `next.config.js` image domains
- Verify image paths are correct
- Check CDN configuration

### Issue: API Routes Timeout
- Increase timeout in platform settings
- Check API route performance
- Implement caching

---

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Enable HTTPS** - Always use SSL in production
3. **Update dependencies** - Run `npm audit` regularly
4. **Input validation** - Sanitize all user inputs
5. **Rate limiting** - Prevent abuse of API endpoints
6. **Security headers** - Already configured in `next.config.js`
7. **CORS policy** - Restrict to trusted domains
8. **Authentication** - Implement proper auth flow

---

## Support & Maintenance

### 📞 Support Contacts
- Technical Support: support@agrograde.com
- Emergency: emergency@agrograde.com
- Documentation: https://docs.agrograde.com

### 🔧 Maintenance Schedule
- **Daily**: Monitor logs and metrics
- **Weekly**: Review error reports
- **Monthly**: Security updates, dependency updates
- **Quarterly**: Performance audits, backup tests

---

## Success Metrics

### KPIs to Track
- ✅ Uptime: >99.9%
- ✅ Response time: <500ms
- ✅ Error rate: <0.1%
- ✅ Lighthouse score: >90
- ✅ User satisfaction: >4.5/5

---

**🎉 Congratulations! Your AgroGrade Insights platform is ready for production deployment!**

For questions or issues, refer to the [troubleshooting guide](./TROUBLESHOOTING.md) or contact support.
