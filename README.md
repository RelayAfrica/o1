# Relay

Relay is a merchant operations platform for small and medium businesses in Nigeria. This build covers Phases 1–4: engineering foundation, Firebase-ready configuration, authentication entry points, business onboarding, storefront setup, and genuine dashboard empty states.

## Local development

Copy `.env.example` to `.env`, fill Firebase values when available, then run `npm install` in `web` and `api` and `npm run dev` from the relevant package. Start Firebase emulators with `firebase emulators:start` after installing the Firebase CLI.

Environment variables are documented in [.env.example](.env.example). `web/` contains the React/Vite client; `api/` contains the Express service.

## Implemented phases

Phases 1–4 are represented. CRM, marketing distribution, and commerce data features are intentionally reserved for later phases.

## Stack and tests

React 18, TypeScript, Vite, React Router, Zustand, TanStack Query, Firebase, Express, and Zod. Run `npm run build` in both packages for production builds and `npm test` in `api` for type checks.

## Deployment

Configure the variables in `.env.example` in your deployment provider and deploy web and API separately via the [Render dashboard](https://dashboard.render.com/).
