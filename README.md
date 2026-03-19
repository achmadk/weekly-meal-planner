# Weekly Meal Planner
An AI‑powered web app to plan your weekly meals (breakfast, lunch, and dinner), save your plans, and bookmark your favorite recipes.

Live app: https://weeklymealplanner.achmadk.com
Author: [Achmad Kurnianto](https://achmadk.com)

## Executive overview
This project is used as a proof‑of‑work to demonstrate how I approach frontend architecture as a senior engineer. The core problem is helping users plan and manage weekly meals end‑to‑end, while keeping the UI structure, state flow, and long‑term maintainability under control as features grow.

The frontend is designed around clear boundaries: Next.js App Router for routing and server‑first data fetching, React Context and local state for cross‑cutting app concerns, and dedicated tools for server data and caching when needed. The goal is to balance fast delivery (getting a usable weekly meal planner in front of users quickly) with a structure that remains healthy when new flows (shopping lists, more AI scenarios, richer user preferences) are added later.

Key principles applied here:

- Treat UI as a system, not a set of isolated pages: layout, reusable components, and design tokens are shared and consistent.

- Strict separation of server state vs client state: server data lives behind typed APIs and server‑side fetching patterns, while UI‑only state stays local or in lightweight Context.

- Keep performance in mind from the start (routing, data loading, re‑render boundaries), but avoid premature micro‑optimisation; the architecture leaves room for targeted improvement (code splitting, virtualization) when usage patterns are clear.

## Features
### 1. AI meal planning

- Generate a weekly meal plan (breakfast, lunch, dinner) in one go.

- Regenerate specific days or meals without losing the rest of the plan.

### Plan management

- Save weekly plans under your account.

- View, update, and delete existing plans.

### Recipe bookmarking

- Bookmark recipes from generated plans.

- Quickly revisit bookmarked recipes for future weeks.

### Authentication

- Sign in with your google account.

- User‑specific plans and bookmarks stored securely on the backend.

### Responsive UI

- Works well on desktop, tablet, and mobile.

- Designed to be usable in real‑life kitchen scenarios (quick checking, editing, and regenerating).

## Tech stack
### Frontend

- Next.js (App Router, React, TypeScript)

- Tailwind CSS and Shadcn for styling and basic design tokens

- React Context + local component state for global app concerns and view‑state

### Backend / Infra

- API layer (e.g. Clerk / custom API) for:

1. Auth & user management

1. Persistent meal plans and bookmarks

- AI provider (e.g. OpenAI / equivalent) for meal‑plan generation

- Deployed to modern edge/platform hosting (Cloudflare / similar) for low‑latency delivery

### Tooling

- TypeScript for static typing

- Oxlint for code quality and formatting

- Vitest / Playwright for testing (unit + basic E2E)

- pnpm as the package manager and script runner

## Architecture overview
At a high level, the app is structured into several layers:

1. Routing & layout

    - Next.js App Router with file‑based routes.

    - Layouts provide the shell (navigation, page container) and shared UI pieces.

1. Domain‑driven modules

    - meal-plans module: components, hooks, and utilities for generating, displaying, and persisting weekly plans.

    - auth module: sign‑in/out flows, session handling, and user guard logic.

    - recipes module: bookmark and retrieval logic.

1. UI components

    - Reusable components (buttons, inputs, cards, list items, empty/loader states) built on Tailwind so that layout and visual language stay consistent across the app.

1. State management

    - Server state (plans, recipes, user) fetched via App Router server components and/or React Query, cached and invalidated through a central data‑access layer.

    - Client state (modals, filters, step indicators) kept in local state or Context in the smallest possible scope to avoid unnecessary re‑renders.

## Data & state flow
The main flows are:

1. Generate weekly plan

    - User fills a form with preferences (diet, number of people, constraints).

    - The request is sent to the AI backend.

    - On success, the generated plan is displayed in the UI and can be saved.

    - On error, the UI shows clear feedback and retry options.

1. Save and load plans

    - When saved, the plan is stored on the backend and associated with the user.

    - The list of saved plans is fetched (server state) and cached; after creating/updating a plan, the relevant queries are invalidated or refreshed.

1. Bookmark recipes

    - User can bookmark recipes from a given plan.

    - Bookmarked recipes are persisted and can be filtered or searched later.

Throughout these flows:

- Loading, empty, error, and success states are explicitly rendered with consistent components.

- Data contracts between UI and backend are modeled with TypeScript types to avoid drift.

## Performance considerations
Even though the domain is not “big data”, the app includes several performance‑oriented decisions:

- Server‑side data fetching via App Router to leverage caching and reduce client payload where possible.

- Keeping heavy state and data logic out of deeply nested UI components; passing only the props needed.

- Using incremental rendering and code splitting for secondary pages so the initial load remains fast.

- Preparing for list virtualization (e.g. for a large list of saved plans or recipes) when/if usage justifies it.

## Getting started
- Clone the repository

```bash
git clone https://github.com/achmadk/weekly-meal-planner.git
cd weekly-meal-planner
```

- Install dependencies

```bash
pnpm install
# or
npm install
# or
bun install
```

- Environment variables

Create a file named `.env` or `.env.local` based on `.env.example` dan isi nilai yang diperlukan:

- API endpoint end credentials backend (Clerk).

- AI provider API key.

- Unsplash Access Key.

## Run in development

```bash
pnpm dev
# or
npm run dev
# or
bun dev
```

## Build & start production

```bash
pnpm build
pnpm start
```

## Why this project (for reviewers)
This repository is intentionally structured and documented to reflect how I think and work as a senior Frontend Engineer:

- Clear separation of concerns between routing, domain logic, and UI.

- Conscious decisions around state management and data fetching (App Router, Context, and optional React Query).

- Focus on reliability of interaction (form handling, feedback, edge cases) and maintainable code, instead of just “making the UI work once”.

If you have questions about particular architectural decisions, trade‑offs, or possible alternatives (e.g. TanStack Router vs App Router, Redux Toolkit vs Zustand vs Context), they are documented in the accompanying [mini frontend engineering case document](/docs/mini%20frontend%20engineering%20case%20-%20Indonesia.pdf).