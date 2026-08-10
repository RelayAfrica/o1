# Relay

Relay is a merchant operations platform for small and medium businesses in Nigeria. The codebase contains the web dashboard/storefront and an API that owns tenant authorization, catalogue, inventory, orders, customers, delivery, notifications, WhatsApp orchestration, social distribution, and campaigns.

## Current architecture decisions

- WhatsApp uses Meta Cloud API directly; n8n orchestrates workflows and is not a source of truth.
- Customer checkout is isolated behind the backs.io payment-provider interface.
- Delivery supports merchant-defined zones, prices, timeframes, scheduled batches, pickup, and optional Uber Direct express delivery.
- Firestore is the persistence layer and Admin SDK access stays server-side.
- Environment values are never committed. See [.env.example](.env.example) and [docs/production-context.md](docs/production-context.md).

## Local development

Install dependencies in both packages, copy `.env.example` to local environment files, start Firebase emulators, then run the web and API dev servers.

```text
cd web && npm install && npm run dev
cd api && npm install && npm run dev
firebase emulators:start
```

The API validates production environment requirements at startup. Development may use the Firebase Auth/Firestore emulator variables.

## Repository structure

- `web/` — React/Vite dashboard, onboarding, public storefront, PWA shell, push opt-in
- `api/` — Express API, Firebase Admin, commerce, delivery, CRM, WhatsApp, social, campaigns
- `shared/` — shared domain types
- `firestore.rules`, `storage.rules`, `firebase.json` — Firebase infrastructure configuration
- `render.yaml` — separate Render web/API service definitions

## Build and tests

```text
npm run build --prefix web
npm run build --prefix api
npm test --prefix api
```

The test command currently performs strict API type checking. Emulator-backed rules, concurrency, and provider contract tests should run in CI once the Firebase CLI is provisioned in the runner.

## Deployment

Use separate Development, Staging, and Production Firebase projects, Render services, and external credentials. Configure the environment variables in Render and deploy using [render.yaml](render.yaml). Production should expose `/health` for liveness and `/health/deep` for readiness diagnostics.
