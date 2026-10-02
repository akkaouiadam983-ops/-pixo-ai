# Pixo AI

A mobile-first AI image generator landing page + generator UI.

## Important
This package is **deployment-ready as a website UI**, but real AI generation, rewarded ads, authentication, payments, and server-side credits require backend/provider connections.

### Real AI
1. Create a secure backend endpoint such as `/api/generate`.
2. Put the AI provider secret key ONLY on the server.
3. Set `API_ENDPOINT` in `app.js` to your endpoint.
4. Your endpoint should accept `{prompt, ratio}` and return `{imageUrl}`.

### Ads
Connect an approved rewarded-ad provider. Only award credits after the provider confirms the ad was completed. Do not simulate ad views.

### Payments
Connect a payment provider from a secure backend. Do not put secret payment keys in the browser.

### Deploy
Upload the files to any static web host. `index.html` is the entry point.

## Minor / account note
If a provider requires the account holder to be 18+, use a parent/guardian's account with their permission and follow the provider's terms.
