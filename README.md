# website

My portfolio website as a developer.

## Production Environment

Configure these variables in Vercel before building production:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_UMAMI_SCRIPT_URL`
- `VITE_UMAMI_WEBSITE_ID`

After changing any `VITE_*` value in Vercel, trigger a new production deployment so Vite can include the value in the static build.
