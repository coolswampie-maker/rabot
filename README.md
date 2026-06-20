# RUDN Business School — unified platform

One web platform for RUDN's business education: **MBA programs**, the **Master of
Business Acceleration** accelerator, and the **ICEMR** research center. It replaces
three separate sites with a single design system, navigation and content model.

Consolidated sources:

- [mba.rudn.ru](https://mba.rudn.ru) — MBA programs hub
- [mba-accelerator.rudn.ru](https://mba-accelerator.rudn.ru) — accelerator
- [icemr.ru](https://icemr.ru) — International Center for Emerging Markets Research

> Built from the brief in `Website redesign for RUDN.pdf`. Reference level: Warwick
> Business School, CU Boulder / Crown Institute, University of Wollongong in Dubai.

---

## 1. What this is

A managed university platform, not a static landing page:

- Public bilingual site (RU / EN) with programs, accelerator, research center,
  news/blog, publications catalogue, faculty, partners, contacts and legal pages.
- A built-in **admin CMS** for editors: news, articles, events, expert comments,
  publications, media uploads, SEO fields, draft/publish.
- Lead forms (program / accelerator / contact / subscribe) that store submissions
  in the database and **cannot be sent without consent to personal-data processing**.
- SEO baked in: SSR/SSG, per-page metadata, sitemap, robots, JSON-LD, hreflang.

## 2. Architecture: domains & subdomains

All three brands share one codebase and design. In production each can run on its
own subdomain; locally they are path-based.

| Brand              | Production host (example)   | Local / fallback route |
| ------------------ | --------------------------- | ---------------------- |
| MBA / main hub     | `rudn-business.example`     | `/`                    |
| Accelerator        | `accelerator.<domain>`      | `/accelerator`         |
| ICEMR research     | `research.<domain>`         | `/research`            |

`src/middleware.ts` maps a brand subdomain's root onto its section
(`accelerator.<domain>/ru` → `/ru/accelerator`). Set the hosts via
`NEXT_PUBLIC_ACCELERATOR_HOST` / `NEXT_PUBLIC_RESEARCH_HOST`. Locally just open
`/accelerator` and `/research` directly — no DNS needed.

## 3. Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** design system (brand tokens from the official logo `#417DB7`)
- **PostgreSQL** + **Prisma** ORM (migrations + seed)
- **Auth**: signed JWT session cookie (`jose`) + `bcryptjs` password hashing
- **i18n**: `[locale]` route segments (`/ru`, `/en`) + typed dictionaries
- **Markdown** content with server-side sanitization (`marked` + DOMPurify)
- **Docker Compose** for local Postgres

Why this stack: it is the one requested in the brief and gives SSR/SSG for SEO, a
single deployable app for all three brands, and an in-repo CMS so editors don't
need a separate service.

## 4. Run locally

Prerequisites: Node.js 18.18+ and Docker (for Postgres), or your own Postgres.

```bash
# 1. install deps
npm install

# 2. configure environment
cp .env.example .env
#   then edit .env — at minimum set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
#   generate a secret:  openssl rand -base64 48

# 3. start Postgres
docker compose up -d

# 4. create schema + seed content and the first admin
npm run db:migrate      # creates tables (dev migration)
npm run db:seed         # seeds programs, faculty, news, publications, legal + admin

# 5. run
npm run dev             # http://localhost:3000  (redirects to /ru)
```

Admin panel: <http://localhost:3000/admin> → sign in with `ADMIN_EMAIL` /
`ADMIN_PASSWORD`.

## 5. Environment (`.env`)

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | signs admin session JWTs (≥ 32 chars) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | first admin user |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG/sitemap base URL |
| `NEXT_PUBLIC_ACCELERATOR_HOST` / `NEXT_PUBLIC_RESEARCH_HOST` | brand subdomains |
| `MEDIA_DRIVER` | `local` (dev) or `s3` (prod) |
| `S3_*` | S3-compatible storage for production media |

No secrets are committed — `.env` is git-ignored.

## 6. Migrations

```bash
npm run db:migrate      # dev: create & apply a migration
npm run db:deploy       # prod: apply existing migrations
npm run db:push         # push schema without a migration (prototyping)
npm run db:studio       # Prisma Studio GUI
```

## 7. Create the first admin

`npm run db:seed` creates it from env. To (re)create or reset later:

```bash
npm run admin:create    # upserts ADMIN_EMAIL with ADMIN_PASSWORD as ADMIN role
```

Roles: `ADMIN` and `EDITOR`. Add more editors directly in the DB / Prisma Studio
(a user-management screen can be added later).

## 8. Adding news & publications

In **/admin**:

- **Новости и статьи** → *Новый материал*: title, excerpt, markdown body (with a
  live preview + image/PDF upload), type (news/article/event/expert comment),
  language, section, category, SEO fields, cover image, featured. Save as draft or
  publish; publish/unpublish from the list.
- **Публикации** → *Новая публикация*: title, authors, abstract, year, type, venue,
  field, DOI, attached PDF, external link.
- **Заявки**: every form submission with its consent flags and a status workflow.

Content model fields per record: title, slug, language, excerpt, content, cover
image, author, category, tags, published/updated dates, SEO title/description, OG
image, status (draft/published), featured.

## 9. SEO

- SSR/SSG via the App Router; dynamic pages render on the server.
- `src/lib/seo.ts` builds unique title + meta description, canonical URL, `hreflang`
  alternates (ru/en/x-default), Open Graph and Twitter cards for every page.
- JSON-LD: `EducationalOrganization`, `Course`, `Article`/`NewsArticle`,
  `ScholarlyArticle`, `Person`, `BreadcrumbList`.
- `src/app/sitemap.ts` (static + DB-driven) and `src/app/robots.ts`.
- Clean human-readable URLs, breadcrumbs, H1/H2/H3 hierarchy, image `alt`s, lazy
  loading and `next/image` optimization, a generated default OG image.

## 10. Multilingual

- Routes are locale-prefixed: `/ru/...`, `/en/...`. `defaultLocale` is `ru`.
- UI strings live in `src/i18n/dictionaries/{ru,en}.ts` (typed, hand-written — not
  machine-translated). Add a key to `ru.ts` and the `en.ts` type enforces a match.
- Entity content: `Program`, `Faculty`, `Partner`, `LegalPage` carry `*Ru`/`*En`
  columns; `Post` and `Publication` are per-locale rows (a `locale` field). To add a
  language, extend `locales` in `src/i18n/config.ts` and add a dictionary.

## 11. Logo & brand assets

- The logo is `public/logo.svg` (copied from the provided `logo_new.svg`, RUDN blue
  `#417DB7`). Header and footer use it; the footer renders it inverted on dark.
- Favicon: `public/favicon.svg` (placeholder mark derived from the brand colour —
  replace with the official favicon when available).
- To swap the logo, replace `public/logo.svg` (keep roughly a 3:1 ratio).

## 12. For the lawyer / owner to review

- Legal pages (`/legal/privacy`, `/consent`, `/cookie`, `/terms`) are **templates**.
  Each body opens with a notice that the text must be reviewed and finalized by the
  university's legal team and is **not** legally binding as-is. Edit them in /admin.
  Russian texts reference 152-ФЗ "О персональных данных".
- The **ICEMR** section content (`src/content/research.ts`) was written from the
  center's stated scope because `icemr.ru` was unreachable during the build —
  verify it against the official site before launch.
- Seeded **publications** are illustrative samples (marked in `prisma/seed.ts`) —
  replace with the center's real catalogue.
- Confirm contact details, phone extension and partner list are current.

## 13. Security

- Admin behind a signed httpOnly session cookie; passwords hashed with bcrypt.
- Server-side validation (Zod) on all forms; consent strictly required server-side.
- Rate limiting + honeypot on public forms and on login (in-memory; see §14).
- Markdown sanitized (DOMPurify) before render — defends against XSS from the editor.
- Upload type/size limits (images + PDF, 15 MB) in `src/lib/storage.ts`.
- Security headers in `next.config.mjs`; `/admin` and `/api` disallowed in robots.

## 14. Before production

- [ ] Replace `AUTH_SECRET` and admin credentials with strong values.
- [ ] Point `NEXT_PUBLIC_SITE_URL` and brand hosts at real domains; configure DNS +
      HTTPS (the app is HTTPS-ready; terminate TLS at your proxy/host).
- [ ] Switch `MEDIA_DRIVER=s3` and implement `putS3()` in `src/lib/storage.ts`
      against your S3-compatible / university object storage.
- [ ] Replace the in-memory rate limiter with Redis/Upstash if running >1 instance.
- [ ] Finalize legal pages with the university's lawyer; verify ICEMR content.
- [ ] Wire form notifications (email / CRM) in `src/app/api/forms/submit/route.ts`.
- [ ] Replace `public/favicon.svg` and add real faculty/partner imagery.
- [ ] Run `npm run build` and review Lighthouse / metadata.

## Project structure

```
prisma/                 schema, seed, create-admin
public/                 logo.svg, favicon.svg, uploads/
src/
  app/
    [locale]/            public localized pages (home, programs, accelerator,
                         research, news, publications, faculty, partners, contacts,
                         legal) + opengraph-image
    admin/               login + (dash) protected CMS (posts, publications,
                         submissions)
    api/                 auth, forms/submit, media/upload
    sitemap.ts, robots.ts
  components/            Header, Footer, Hero, cards, FormWithConsent, admin/*
  content/               structural bilingual page copy (home, accelerator, research)
  i18n/                  config + dictionaries
  lib/                   prisma, auth, seo, queries, storage, markdown, validation…
  middleware.ts          locale + subdomain routing
docs/
```
