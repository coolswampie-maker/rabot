# Deploy + connect a GoDaddy domain

The app is **Next.js + PostgreSQL (Prisma)** with an admin CMS and image uploads.
That means a host needs three things: run the Node app, a Postgres database, and
(for uploads) a persistent disk or S3. Below is the fastest path with a custom
GoDaddy domain.

---

## Option A — Railway (recommended: app + Postgres + disk in one)

1. Create an account at <https://railway.app> and a new **Empty Project**.
2. **Add Postgres**: in the project, *New → Database → PostgreSQL*. Railway sets
   `DATABASE_URL` automatically and exposes it to the app.
3. **Add the app**: *New → GitHub Repo* (connect this repo) — Railway detects the
   `Dockerfile` and builds it. (Or `railway up` from the CLI in this folder.)
4. **Environment variables** on the app service:
   ```
   AUTH_SECRET            = <openssl rand -base64 48>
   ADMIN_EMAIL            = you@rudn-business.example
   ADMIN_PASSWORD         = <strong password>
   ADMIN_NAME             = Site Administrator
   NEXT_PUBLIC_SITE_URL   = https://your-domain.ru
   MEDIA_DRIVER           = local
   ```
   (`DATABASE_URL` is provided by the Postgres plugin — reference it.)
5. **Persist uploads**: add a **Volume** mounted at `/app/public/uploads` so
   admin-uploaded images survive redeploys.
6. **Migrate + seed** once (Railway → app → *Settings → Deploy → Run command*, or
   a one-off shell):
   ```
   npx prisma migrate deploy && npm run db:seed
   ```
7. **Custom domain**: app service → *Settings → Networking → Custom Domain* →
   enter `mba.your-domain.ru` (a subdomain is easiest). Railway shows a **CNAME
   target** like `xxxx.up.railway.app`.

### GoDaddy DNS for Railway
In GoDaddy → *My Products → DNS* for the domain:
- **Subdomain (recommended)** — add a record:
  - Type `CNAME`, Name `mba` (or `www`), Value `xxxx.up.railway.app`, TTL 1 hour.
- **Root/apex domain** (`your-domain.ru` without prefix): GoDaddy can't CNAME the
  apex. Either use a subdomain, or use GoDaddy **Domain Forwarding** from the apex
  to `https://mba.your-domain.ru`.

DNS propagation: usually minutes, up to a few hours. Railway issues HTTPS
automatically once DNS resolves.

---

## Option B — Vercel + Neon (great CDN, free; uploads need S3)

1. Postgres: create a free DB at <https://neon.tech> → copy its connection string.
2. Import this repo at <https://vercel.com> → set env vars (same as above, with
   `DATABASE_URL` from Neon).
3. Build runs `prisma generate && next build`. After the first deploy, run
   `prisma migrate deploy` and `db:seed` once (locally pointed at the Neon URL, or
   via a Vercel one-off).
4. **Uploads**: Vercel's filesystem is read-only/ephemeral, so set `MEDIA_DRIVER=s3`
   and implement `putS3()` in `src/lib/storage.ts` against any S3-compatible bucket
   (AWS S3, Cloudflare R2, Selectel, Yandex Object Storage). Until then, admin
   image upload won't persist on Vercel — Railway/Render avoid this with a disk.
5. **Custom domain**: Vercel → Project → *Domains* → add `mba.your-domain.ru`.
   Vercel shows the exact DNS record.

### GoDaddy DNS for Vercel
- Subdomain: `CNAME` `mba` → `cname.vercel-dns.com`.
- Apex: `A` `@` → `76.76.21.21` (Vercel shows the current value).

---

## Russian production note (152-ФЗ)
The forms collect **personal data**. For real production, host in Russia
(Timeweb Cloud / Selectel / Yandex Cloud) using `docker-compose.yml` +
`Dockerfile`, and keep the database in-country. Vercel/Railway/Neon are fine for a
**staging/demo**.

## Pre-deploy checklist
- [ ] `AUTH_SECRET` and admin credentials are strong, set as env (never committed).
- [ ] `NEXT_PUBLIC_SITE_URL` = the final domain (for canonical URLs, sitemap, OG).
- [ ] `prisma migrate deploy` + `npm run db:seed` run once against the prod DB.
- [ ] Uploads: Railway/Render volume **or** `MEDIA_DRIVER=s3` + `putS3()`.
- [ ] Domain DNS pointed; HTTPS active.
