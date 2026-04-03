# Go-Live Checklist

Everything you need to do before launching buildzenstudio.com.

---

## 1. Domain & Hosting

- [ ] Purchase domain `buildzenstudio.com` (Namecheap, Google Domains, etc.)
- [ ] Connect your GitHub repo to Netlify (it will auto-deploy on push)
- [ ] Add your custom domain in Netlify: Site settings > Domain management > Add custom domain
- [ ] Enable HTTPS (Netlify does this automatically once DNS propagates)
- [ ] Update DNS: point your domain's nameservers to Netlify (or add A/CNAME records per Netlify's instructions)

---

## 2. Netlify Environment Variables

Go to: Netlify Dashboard > Site settings > Environment variables

Add each of these. The site works without them, but features will be disabled until they're set.

### Email Notifications (Resend)

- [ ] Sign up at <https://resend.com> (free: 100 emails/day)
- [ ] Verify your sending domain (or use their default)
- [ ] Create an API key
- [ ] Set `RESEND_API_KEY` = your Resend API key
- [ ] Set `FROM_EMAIL` = your verified sender email (e.g., `alex@buildzenstudio.com`)

### Slack/Discord Notifications

- [ ] Create a Slack incoming webhook (<https://api.slack.com/messaging/webhooks>) OR a Discord webhook (Server Settings > Integrations > Webhooks)
- [ ] Set `SLACK_WEBHOOK_URL` = the webhook URL

### Email Nurture Sequences (Mailchimp)

- [ ] Sign up at <https://mailchimp.com> (free: up to 500 contacts)
- [ ] Create an Audience (list) for leads
- [ ] Create an automation: 3-email drip sequence (Day 1: welcome, Day 3: social proof, Day 7: follow-up)
- [ ] Get your API key from Account > Extras > API keys
- [ ] Set `MAILCHIMP_API_KEY` = your Mailchimp API key
- [ ] Set `MAILCHIMP_LIST_ID` = your Audience ID (found in Audience > Settings > Audience name and defaults)

### Stripe Payments

- [ ] Sign up at <https://stripe.com>
- [ ] Complete account verification (business info, bank account)
- [ ] Get your Secret Key from Developers > API keys
- [ ] Set `STRIPE_SECRET_KEY` = `sk_live_...` (use `sk_test_...` for testing first)
- [ ] Create a webhook endpoint in Stripe: Developers > Webhooks > Add endpoint
  - URL: `https://buildzenstudio.com/.netlify/functions/stripe-webhook`
  - Events to listen for: `checkout.session.completed`
- [ ] Set `STRIPE_WEBHOOK_SECRET` = `whsec_...` (shown after creating the webhook)

### Admin Dashboard

- [ ] Set `ADMIN_PASSWORD` = a strong password you'll use to access `/admin`
- [ ] Set `NETLIFY_AUTH_TOKEN` = personal access token with `forms:read` scope so the admin function can read submissions
- [ ] (Optional) Set `SITE_ID` = your Netlify site ID if you want faster form listing
- [ ] Set `ADMIN_TOKEN_SECRET` = the secret used to sign admin session tokens (defaults to `ADMIN_PASSWORD`)
- [ ] Set `ADMIN_TOKEN_TTL_SECONDS` = how long tokens stay valid (default `600`)

---

## 3. Scheduling (Cal.com)

- [ ] Sign up at <https://cal.com> (free tier)
- [ ] Create a 15-minute event type called "Free Consultation" or similar
- [ ] Your booking URL will be something like `https://cal.com/your-username/15min`
- [ ] Update the Cal.com links in the code (search for `cal.com/contractor-web-studio/15min` and replace with your actual URL):
  - `src/pages/ContactPage.jsx`
  - `src/pages/ThankYouPage.jsx`
  - `netlify/functions/submission-created.js`

---

## 4. Analytics (Plausible)

- [ ] Sign up at <https://plausible.io> (free 30-day trial, then $9/mo) OR self-host for free
- [ ] Add your domain `buildzenstudio.com`
- [ ] The script tag is already in `index.html` -- no code changes needed

Alternative: If you prefer Google Analytics (free), replace the Plausible script in `index.html` with the GA4 gtag snippet and add route tracking in `App.jsx`.

---

## 5. Google Business Profile

- [ ] Create your profile at <https://business.google.com>
- [ ] Business name: "Contractor Web Studio" (or your preferred name)
- [ ] Category: Web Designer or Internet Marketing Service
- [ ] Service area: Winston-Salem, NC metro
- [ ] Add your website URL, phone, and email
- [ ] Get your Google Maps/review link
- [ ] Update the placeholder review link in the code (search for `g.page/contractor-web-studio` and replace):
  - `src/pages/ContactPage.jsx`
  - `index.html` (in the JSON-LD structured data `sameAs` array)

---

## 6. Content Updates

- [ ] Replace placeholder blog post content with final versions (in `src/data/blogPosts.js`)
- [ ] Update portfolio case study details if needed (in `src/data/portfolioData.js`)
- [ ] Review testimonial quotes -- ensure they're accurate/approved (in `src/data/testimonials.js`)
- [ ] Consider adding a real photo to the About page (replace the monogram in `src/pages/AboutPage.jsx`)
- [ ] Review Privacy Policy and Terms of Service for accuracy

---

## 7. Testing Before Launch

- [ ] Run `npm run build` locally -- should complete with 0 errors
- [ ] Run `npm run dev` and test every page on desktop and mobile
- [ ] Submit the contact form on the deployed Netlify site -- verify:
  - Redirect to /thank-you works
  - You receive an email notification (Resend)
  - You receive a Slack/Discord notification
  - The lead appears in Netlify Forms dashboard
  - The lead is added to Mailchimp
- [ ] Test Stripe checkout:
  - Use Stripe test mode first (`sk_test_...`)
  - Go to /services, use the pricing estimator, click "Pay Deposit Now"
  - Complete a test payment with card `4242 4242 4242 4242`
  - Verify redirect to /payment-success
  - Verify you receive payment notifications
- [ ] Test admin dashboard at /admin with your password
- [ ] Test Cal.com booking link opens correctly
- [ ] Check all phone numbers show (317) 590-1373
- [ ] Check all emails show <aolson078@gmail.com>
- [ ] Run Google's Rich Results Test on your URL (<https://search.google.com/test/rich-results>)
- [ ] Run PageSpeed Insights (<https://pagespeed.web.dev>)

---

## 8. Post-Launch

- [ ] Submit sitemap to Google Search Console: <https://search.google.com/search-console>
- [ ] Switch Stripe from test mode to live mode (swap `sk_test_` key for `sk_live_` in Netlify env vars)
- [ ] Set up Stripe webhook for live mode (new endpoint with live webhook secret)
- [ ] Ask your first clients for Google reviews
- [ ] Share the site on LinkedIn, local business groups, etc.
- [ ] Monitor Plausible analytics for traffic
- [ ] Check Netlify Forms dashboard weekly for leads

---

## Quick Reference: All Environment Variables

| Variable | Service | Where to Get It |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend | <https://resend.com/api-keys> |
| `FROM_EMAIL` | Resend | Your verified sender email |
| `SLACK_WEBHOOK_URL` | Slack/Discord | Slack: api.slack.com/webhooks, Discord: Server Settings |
| `MAILCHIMP_API_KEY` | Mailchimp | Account > Extras > API keys |
| `MAILCHIMP_LIST_ID` | Mailchimp | Audience > Settings > Audience name |
| `STRIPE_SECRET_KEY` | Stripe | Developers > API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe | Developers > Webhooks (after creating endpoint) |
| `ADMIN_PASSWORD` | Self-set | Any strong password you choose |
| `NETLIFY_AUTH_TOKEN` | Netlify API | Create a personal access token with `forms:read` scope |
| `SITE_ID` | Netlify | Optional site ID (speeds up form lookup) |
| `ADMIN_TOKEN_SECRET` | Any | Secret for signing admin session tokens (defaults to `ADMIN_PASSWORD`) |
| `ADMIN_TOKEN_TTL_SECONDS` | Any | TTL in seconds for admin session tokens (default `600`) |
