# Production Configuration

Production runs on Vercel.

Configure these environment variables before building production:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_UMAMI_SCRIPT_URL=
VITE_UMAMI_WEBSITE_ID=
```

After changing any `VITE_*` value in Vercel, trigger a new deployment so Vite can include it in the static build.

The selected production domain is `saviogama.dev`.
