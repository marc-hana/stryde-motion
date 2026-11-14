# STRYDE — Sneaker Culture. No Limits.

A React + Vite + TypeScript sneaker storefront starter with a custom editorial design system, product catalog, product detail, persistent cart and wishlist, Supabase schema/RLS foundation, and Vercel-ready routing.

## Motion upgrade included\n\n- Cinematic hero text and image entrance with staggered timing.\n- Scroll-triggered reveal animations for editorial sections and featured products.\n- Smooth route transitions, animated navigation/search, and product-card hover/tap feedback.\n- Subtle image sheen and animated hover underline, with reduced-motion accessibility support.\n- Uses the existing Framer Motion dependency; no additional animation package required.\n\n## Included in this build

- Responsive STRYDE storefront and brand system (Obsidian, Graphite, Electric Blue, Ice White, Steel Gray).
- Homepage, shop/catalog, product detail, brands, collections, journal preview, wishlist, cart, checkout placeholder, account placeholder and admin access placeholder.
- Product search, brand/category filters, price sorting and product cards.
- Size selection, size-aware cart lines, quantity updates, remove item and persistent local cart/wishlist (Zustand).
- React Router, TanStack Query provider, Supabase client bootstrap, TypeScript and Tailwind configuration.
- Supabase SQL migration with customer-scoped RLS, admin role checks, product/catalog schema, order schema and inventory reservation primitive.
- Seed data, environment template and Vercel SPA rewrite.

## Requirements

- Node.js 20+
- npm
- Supabase project (optional for local visual preview; required for production data/auth)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The storefront currently uses local demonstration product data in `src/data/products.ts`. It can be previewed without Supabase credentials. Supabase client setup is in `src/lib/supabase.ts`.

## Checks

```bash
npm run typecheck
npm run build
npm run lint
```

## Supabase setup

1. Create a Supabase project.
2. Install Supabase CLI and authenticate.
3. Link the project: `supabase link --project-ref YOUR_PROJECT_REF`.
4. Apply the schema: `supabase db push` (or run `supabase/migrations/0001_initial_schema.sql` in the SQL editor).
5. Run `supabase/seed.sql`.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.
7. Configure Storage buckets and policies for product media before enabling image upload.

### Security notes

- Never place Supabase `service_role`, payment secrets, webhook secrets or provider private keys in browser-exposed `VITE_` variables.
- The `user_roles` table is intentionally not self-editable. Provision the first admin from a trusted SQL/admin process, not from the client.
- `is_admin()` checks the role table server-side through RLS policies.
- Customer addresses, wishlists and order records are scoped to `auth.uid()`.
- The `reserve_inventory` function is a safe atomic stock decrement primitive, but the production checkout flow still needs a trusted Supabase Edge Function that validates product state/current prices, reserves all requested variants in a database transaction, creates order records, creates a payment intent with the provider, and handles rollback/expiry.
- Do not mark orders paid based on browser redirects. Verify provider signatures in a server-side webhook and make webhook handling idempotent.
- Checkout, payment integration, auth UI, order history and full admin CRUD are deliberately not faked in this starter. They need provider credentials and server-side functions/policies before launch.

## Architecture

```text
src/
  components/       Shared storefront UI
  data/             Local catalog seed for preview
  lib/              Supabase client
  pages/            Route-level screens
  store/            Zustand cart/wishlist state
  types/             Shared TypeScript models
supabase/
  migrations/       PostgreSQL schema and RLS
  seed.sql           Base brand/category data
```

## Deployment to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel project environment variables.
7. Deploy. `vercel.json` rewrites client-side routes to the SPA entry point.

## Before production launch

- Replace demonstration image URLs with optimized, licensed product imagery in Supabase Storage/CDN.
- Load catalog data from Supabase via service modules and TanStack Query.
- Add Supabase Auth screens, profile/address forms and protected account routes.
- Implement trusted Edge Functions for checkout, stock reservation, payment intent creation and webhook verification.
- Add transactional multi-item inventory reservation and idempotent order/payment processing.
- Build admin CRUD screens and server-verified role provisioning.
- Add tests, monitoring, analytics, privacy/returns/shipping pages, tax/shipping rules and SEO metadata per route.
- Connect the newsletter form to a real email marketing provider; the current form is a visual interaction only.
