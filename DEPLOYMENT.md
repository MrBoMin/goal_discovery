# Deployment Guide - Find Your Path

This guide covers everything you need to deploy the Find Your Path application to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Deploy to Netlify](#deploy-to-netlify)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Email Configuration](#email-configuration)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Monitoring & Analytics](#monitoring--analytics)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Valid OpenAI API key
- [ ] Valid Resend API key
- [ ] Verified domain in Resend (for email sending)
- [ ] GitHub repository with your code
- [ ] All environment variables documented

---

## Environment Variables Setup

### Required Environment Variables

Create these in your deployment platform:

```env
# OpenAI GPT AI (Required)
OPENAI_API_KEY=sk-...

# Resend Email Service (Required)
RESEND_API_KEY=re_...

# Email Configuration (Required)
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Application URL (Required)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Getting Your API Keys

#### OpenAI API Key

1. Go to [https://platform.openai.com/api-keys/](https://platform.openai.com/api-keys/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-`)
6. Note: OpenAI API usage is billed separately (pay-as-you-go)

#### Resend API Key

1. Go to [https://resend.com/](https://resend.com/)
2. Sign up for a free account (includes 100 emails/day)
3. Verify your sending domain
4. Navigate to API Keys
5. Create a new API key
6. Copy the key (starts with `re_`)

---

## Deploy to Vercel

Vercel is the recommended deployment platform (created by Next.js team).

### Step-by-Step Deployment

1. **Push Code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**

   In the Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add each variable listed above
   - Select "Production", "Preview", and "Development" for each

4. **Deploy**

   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at `your-project.vercel.app`

### Vercel CLI Deployment (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration

The app includes an optional `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## Deploy to Netlify

Alternative deployment option.

### Step-by-Step Deployment

1. **Push Code to GitHub** (same as above)

2. **Import to Netlify**

   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure Build Settings**

   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Configure Environment Variables**

   - Go to Site settings → Environment variables
   - Add each variable listed above

5. **Deploy**

   - Click "Deploy site"
   - Your app will be live at `your-project.netlify.app`

---

## Custom Domain Setup

### For Vercel

1. Go to your project → Settings → Domains
2. Add your domain (e.g., `findyourpath.com`)
3. Follow DNS configuration instructions:
   - Add A record: `76.76.21.21`
   - Or CNAME record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (5-60 minutes)

### For Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

### DNS Configuration Example

If using Cloudflare, Namecheap, or similar:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com (or your-app.netlify.app)

Type: CNAME
Name: www
Value: cname.vercel-dns.com (or your-app.netlify.app)
```

---

## Email Configuration

### Verify Your Domain in Resend

1. Log into [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records:

   ```
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]

   Type: TXT
   Name: @
   Value: [SPF record provided by Resend]
   ```

5. Wait for verification (usually 5-30 minutes)

### Update Environment Variables

After domain verification, update:

```env
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Testing Email

Test email sending with this curl command:

```bash
curl -X POST https://yourdomain.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "analysis": {
      "careerArchetype": "Knowledge Entrepreneur",
      "archetypeDescription": "Test description",
      "keyInsights": ["Insight 1", "Insight 2"],
      "blindSpots": ["Blind spot 1"],
      "actionPlan": [
        {"step": 1, "title": "Step 1", "description": "Description"}
      ]
    }
  }'
```

---

## Post-Deployment Testing

### Test Checklist

- [ ] Landing page loads correctly
- [ ] Navigation works (Home, FAQ)
- [ ] Question flow works (all 12 questions)
- [ ] Progress saves in localStorage
- [ ] Back/Next buttons work
- [ ] Skip button works
- [ ] Results page loads after question 12
- [ ] AI analysis completes successfully
- [ ] Email form submits
- [ ] Email delivery works
- [ ] Mobile responsive design
- [ ] All animations work smoothly
- [ ] Error states display properly

### Testing Commands

```bash
# Test build locally
npm run build
npm start

# Check for TypeScript errors
npm run build

# Check for lint errors
npm run lint
```

### Load Testing

For production, consider testing with:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit
- [WebPageTest](https://www.webpagetest.org/) - Speed test
- [GTmetrix](https://gtmetrix.com/) - Performance analysis

---

## Monitoring & Analytics

### Vercel Analytics (Built-in)

Enable in Vercel dashboard:
1. Go to Analytics tab
2. Enable Vercel Analytics
3. View real-time metrics

### Google Analytics (Optional)

Add to `app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Error Tracking

Consider adding [Sentry](https://sentry.io/) for error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## Troubleshooting

### Build Fails

**Error:** `Type error: ...`

**Solution:**
```bash
# Check TypeScript errors locally
npm run build

# Fix any type errors
# Common issues: missing types, incorrect imports
```

### API Routes Return 500

**Error:** `Failed to analyze responses`

**Solution:**
- Check `OPENAI_API_KEY` is set correctly
- Verify API key has sufficient credits
- Check Vercel function logs

### Email Not Sending

**Error:** `Failed to send email`

**Solution:**
- Verify `RESEND_API_KEY` is correct
- Check domain is verified in Resend
- Verify `FROM_EMAIL` uses verified domain
- Check Resend dashboard for error logs

### Environment Variables Not Working

**Solution:**
- Ensure variables are set in deployment platform
- Redeploy after adding variables
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Restart dev server after local changes

---

## Security Checklist

Before going to production:

- [ ] API keys are stored as environment variables (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] Rate limiting considered for API routes
- [ ] Input validation on all forms
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on Vercel/Netlify)

---

## Performance Optimization

### Image Optimization

Already handled by Next.js `<Image>` component.

### Caching

Vercel automatically caches static assets and API responses.

### Database (Future)

If adding a database:
- Consider Vercel Postgres
- Or Supabase for easy setup
- Or PlanetScale for MySQL

---

## Scaling Considerations

### Current Limits

- **OpenAI API**: Depends on your tier
- **Resend Free Tier**: 100 emails/day
- **Vercel Free Tier**: 100 GB bandwidth/month

### When to Upgrade

Upgrade when you reach:
- 3,000+ emails/month (Resend)
- 100 GB bandwidth/month (Vercel)
- Need for custom analytics

---

## Backup & Recovery

### Data Backup

Currently, user data is:
- Stored in browser localStorage (temporary)
- Sent via email (user's inbox as backup)

For production, consider:
- Adding database for user accounts
- Implementing data export feature
- Regular database backups

---

## Support & Maintenance

### Regular Tasks

- Monitor API usage (OpenAI console)
- Check email delivery rates (Resend dashboard)
- Review error logs (Vercel/Netlify)
- Update dependencies monthly

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Test after updates
npm run build
npm start
```

---

## Questions?

If you encounter issues not covered here:

1. Check [Next.js Documentation](https://nextjs.org/docs)
2. Check [Vercel Documentation](https://vercel.com/docs)
3. Open an issue on GitHub
4. Email: support@findyourpath.com

---

**Last Updated:** January 2024
**Version:** 1.0.0
