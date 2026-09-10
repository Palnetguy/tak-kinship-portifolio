# TAK Kinship Portfolio

The public portfolio website for TAK Kinship, built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

1. Copy `env.example` to `.env.local` and provide the required values.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Contact-form security

Create a Cloudflare Turnstile widget restricted to `takkinship.com` and
`www.takkinship.com`. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the server-only
`TURNSTILE_SECRET_KEY` in Vercel. When the secret is configured, every contact
submission must pass server-side Turnstile validation before reaching Django.

## Checks

Run these commands before opening a pull request:

```bash
npm run lint
npm run build
```

The production build can be started locally with `npm start` after `npm run build` completes.
