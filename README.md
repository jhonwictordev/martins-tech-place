# Martins Tech Place

[![CI](https://github.com/jhonwictordev/martins-tech-place/actions/workflows/ci.yml/badge.svg)](https://github.com/jhonwictordev/martins-tech-place/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-22c55e.svg)](LICENSE) [![Demo](https://img.shields.io/badge/demo-synthetic%20catalog-0ea5e9.svg)](https://jhonwictordev.github.io/martins-tech-place/) [![Integration](https://img.shields.io/badge/Mercado%20Livre-configurable-f59e0b.svg)](#overview)

> See the [portfolio overview](docs/portfolio-overview.md) for architecture, the safe public walkthrough and integration boundaries.

Martins Tech Place is a modern technology storefront connected to Mercado Livre, built with Next.js, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, and NextAuth.

## Overview

- Full landing experience with hero banner, category navigation, featured products, flash deals, best sellers, and trust highlights.
- Product catalog with search, category filters, price filters, condition filters, free shipping filters, stock filters, and sorting.
- Individual product pages with gallery, technical details, seller context, and a buy button that redirects to the official Mercado Livre listing.
- Blog section powered by Markdown content and SEO-ready pages.
- Protected admin area at `/admin`.
- Mercado Livre OAuth integration.
- Manual product and order synchronization.
- Webhook endpoint for catalog and order updates.
- Prisma schema covering products, images, attributes, orders, webhook logs, and store settings.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth credentials-based authentication
- API routes
- Zod
- React Hook Form
- Native `fetch`

## Project Structure

```txt
app/
  page.tsx
  produtos/
  categorias/
  ofertas/
  mais-vendidos/
  busca/
  blog/
  admin/
  api/
components/
lib/
  mercadolivre/
prisma/
content/blog/
public/
styles/
```

## Getting Started

Install dependencies, generate Prisma Client, run migrations, seed the database, and start the development server:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Local URLs:

- Storefront: `http://localhost:3000`
- Admin: `http://localhost:3000/login`

Administrative access should be configured locally with your own private credentials. Do not commit real secrets to the repository.

### Environment configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Live mode | PostgreSQL connection used by Prisma. |
| `NEXTAUTH_URL` | Yes | Canonical application URL and OAuth redirect base. |
| `NEXTAUTH_SECRET` | Yes | Signs sessions and the short-lived OAuth state. |
| `DEMO_ADMIN_EMAIL`, `DEMO_ADMIN_PASSWORD` | Demo seed only | Creates a local demonstrative administrator. Never reuse production credentials. |
| `MELI_CLIENT_ID`, `MELI_CLIENT_SECRET`, `MELI_REDIRECT_URI` | Real integration only | Mercado Livre OAuth application configuration. |
| `MELI_SITE_ID` | No | Marketplace site, default `MLB`. |

The application fails safely when an integration variable is missing. Use a different database and different credentials for every environment.

## Demo data versus real data

| Mode | Data source | External effects |
| --- | --- | --- |
| Demo fallback | Static records from `lib/demo-data.ts` | No seller account, OAuth token, order or webhook is real. Buying links are illustrative redirects. |
| Seeded development | PostgreSQL records created by `prisma/seed.ts` | Records are synthetic. OAuth remains disconnected until real credentials and explicit authorization are provided. |
| Connected integration | Mercado Livre API plus PostgreSQL | Products, orders and notifications belong to the authorized seller account. Protect this environment as production data. |

The admin integration screen identifies demo mode. Do not present seeded metrics, buyers or orders as real business results.

## Common Commands

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Additional commands:

```bash
npm run build
npm run start
npm run lint
```

## Mercado Livre Developer Setup

1. Open the Mercado Livre developer dashboard.
2. Create a new application.
3. Copy the application credentials from the developer portal.
4. Set the redirect URL to:

```txt
http://localhost:3000/api/mercadolivre/callback
```

5. Store your credentials and callback settings only in your local runtime configuration and deployment platform.

## Mercado Livre Connection Flow

1. Start the project locally.
2. Open `/login`.
3. Sign in with an administrative account.
4. Go to `/admin/integracao`.
5. Click the Mercado Livre connection action in the admin panel.
6. Authorize the application in Mercado Livre.
7. After the callback, tokens are saved in the database.

## Product Synchronization

There are two available paths:

- From the admin panel:
  - `/admin/integracao`
  - Use the product synchronization action
- From the API:

```bash
POST /api/mercadolivre/sync-products
```

The module:

- Fetches seller listings
- Retrieves item details
- Loads item descriptions
- Updates price, stock, images, and attributes
- Keeps local records synchronized

## Order Synchronization

From the admin panel:

- `/admin/integracao`
- Use the order synchronization action

From the API:

```bash
POST /api/mercadolivre/sync-orders
```

The module:

- Fetches seller orders
- Stores buyer info, status, totals, and timestamps
- Links order items to local products whenever possible

## Webhook Setup

Webhook URL:

```txt
POST https://your-domain.com/api/mercadolivre/webhook
```

Best practices:

- Use HTTPS in production
- Restrict access to the admin panel
- Never expose Mercado Livre application secrets
- Monitor `/admin/logs`
- Track token expiration in `/admin/integracao`

Webhook notifications receive a deterministic event key. Duplicate deliveries are acknowledged without running synchronization twice. Failures are stored with a `failed` status and a bounded error message for operational diagnosis.

## Reliability tests

`npm test` covers signed OAuth state, authorization-code exchange, refresh-token failure, duplicate notifications and synchronization failures. No test contacts Mercado Livre or uses a real seller account.

## SEO

- Default homepage metadata
- Dynamic metadata for products and blog posts
- Open Graph support
- Sitemap at `/sitemap.xml`
- Robots file at `/robots.txt`
- Schema.org Product markup on product pages

## Architecture Notes

- Checkout does not happen inside this website.
- The primary buy button always redirects to the official Mercado Livre permalink.
- The project includes a demo fallback so the storefront can render before the first live synchronization.
- The seed command populates categories, sample products, sample orders, and base store settings.

## Important Routes

Public routes:

- `/`
- `/produtos`
- `/produtos/[id]`
- `/categorias`
- `/categorias/[slug]`
- `/ofertas`
- `/mais-vendidos`
- `/busca`
- `/blog`
- `/blog/[slug]`

Admin routes:

- `/admin`
- `/admin/produtos`
- `/admin/pedidos`
- `/admin/integracao`
- `/admin/configuracoes`
- `/admin/logs`

API routes:

- `/api/auth/[...nextauth]`
- `/api/contact`
- `/api/store-settings`
- `/api/mercadolivre/auth`
- `/api/mercadolivre/callback`
- `/api/mercadolivre/webhook`
- `/api/mercadolivre/sync-products`
- `/api/mercadolivre/sync-orders`
- `/api/mercadolivre/disconnect`

## Recommended Next Steps

- Provision a production PostgreSQL database
- Configure a public domain with HTTPS
- Connect a real Mercado Livre seller account
- Update the production redirect URL
- Point the Mercado Livre webhook to the final domain
- Replace placeholder branding assets with final production assets
