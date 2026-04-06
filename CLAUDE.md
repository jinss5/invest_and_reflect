# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Database safety rules

**NEVER execute any SQL that deletes or destroys data.** This includes, but is not limited to:

- `DELETE FROM ...`
- `DROP TABLE ...`
- `DROP SCHEMA ...`
- `TRUNCATE ...`
- `DROP DATABASE ...`

If a task seems to require data deletion, stop and ask the user to run the command themselves.

## Project

**Investment Journal** is a web application for individual investors to systematically record their investment decisions, emotions, market interpretations, actions, and retrospective evaluations over time.

### Problem

Individual investors lack the structured evaluation systems that exist in schools or workplaces. This leads to recurring issues:

- Mistaking lucky short-term gains for skill
- Abandoning sound strategies after temporary losses
- Repeating bad processes that happened to produce good results
- Losing memory of the emotions, news context, and reasoning behind past decisions

### Core capabilities

1. **Reading the market** — record daily market conditions, sentiment (fear vs. greed), news reactions, and whether the market over/under-reacted
2. **Responding to market conditions** — separate market psychology from personal psychology; log the reasoning and emotion behind each buy/sell/hold/rebalance action; distinguish rational analysis, emotional reactions, and intuitive judgments
3. **Repeating good decisions** — identify common patterns in successful judgments; generalize effective thinking frameworks and checklists into reusable investment principles
4. **Improving through reflection** — revisit the same entry at 1 week, 3 months, and 1 year; compare how judgment quality looks different over time; separate outcome quality from process quality; surface recurring mistakes and strengths

### Deployment

This service is intended for **public deployment** with **multiple concurrent users**. It is not a local-only tool — it will be publicly accessible on the internet. Design and implement accordingly: assume untrusted input, enforce proper auth and per-user data isolation, and treat security as a hard requirement throughout.

### Auth

Google OAuth via Supabase — implemented. Users sign in at `/login`, are redirected through `/auth/callback`, and land on `/dashboard`. Auth state is managed client-side via `AuthContext`. There is no middleware-level route protection yet; the dashboard page guards itself by checking `useAuth()` and rendering `null` if the user is not authenticated.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

There are no tests configured yet.

## Stack

- **Next.js 15** — App Router only. No Pages Router.
- **React 19**
- **TypeScript** (strict mode, path alias `@/*` maps to repo root)
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`. No `tailwind.config.*` file; all customization goes through CSS or inline classes. Global styles live in `app/globals.css`.
- **Supabase** — auth (Google OAuth via `@supabase/ssr`) and database. Browser client at `lib/supabase/client.ts`, server client at `lib/supabase/server.ts`.

## Project structure

```
app/
  layout.tsx                    # root layout — html/body wrapper, AuthProvider, metadata
  page.tsx                      # landing page (/) with link to dashboard
  globals.css                   # Tailwind import
  login/
    page.tsx                    # login page — Google OAuth sign-in button
  auth/
    callback/
      route.ts                  # OAuth callback handler — exchanges code for session
  context/
    AuthContext.tsx             # AuthProvider + useAuth hook (user, loading, signOut)
  types/
    journal.ts                  # shared types: JournalEntry, ActionDetail, NewsItem, etc.
  components/
    SegmentedControl.tsx        # generic pill-style toggle (Market Sentiment, Confidence, Decision Basis)
    FearGreedSlider.tsx         # range slider 0-100 with zone labels
  dashboard/
    page.tsx                    # dashboard page (/dashboard) — auth-guarded, renders nav + form
    JournalEntryForm.tsx        # journal entry form (client component, UI-only, no persistence)
lib/
  supabase/
    client.ts                   # browser Supabase client (createBrowserClient)
    server.ts                   # server Supabase client (createServerClient + cookies)
    proxy.ts                    # (unused/TBD)
```

All routes are added under `app/` following Next.js file-system routing conventions.

## Database schema

> Reference only — do not execute.

### `public.users`

| column         | type        | notes                     |
| -------------- | ----------- | ------------------------- |
| `id`           | uuid        | PK, FK → `auth.users(id)` |
| `email`        | text        | unique                    |
| `display_name` | text        |                           |
| `created_at`   | timestamptz |                           |
| `updated_at`   | timestamptz |                           |

### `public.journal_entries`

| column              | type        | notes                                 |
| ------------------- | ----------- | ------------------------------------- |
| `id`                | uuid        | PK                                    |
| `user_id`           | uuid        | FK → `users(id)`                      |
| `entry_date`        | date        |                                       |
| `summary`           | text        |                                       |
| `my_interpretation` | text        |                                       |
| `market_sentiment`  | text        | `'bearish' \| 'neutral' \| 'bullish'` |
| `fear_greed_index`  | integer     | 0–100                                 |
| `market_notes`      | text        |                                       |
| `reasoning`         | text        |                                       |
| `created_at`        | timestamptz |                                       |
| `updated_at`        | timestamptz |                                       |

Unique constraint: `journal_entries_user_id_entry_date_unique` on `(user_id, entry_date)` — one entry per user per day.

### `public.entry_news_items`

| column                    | type        | notes                      |
| ------------------------- | ----------- | -------------------------- |
| `id`                      | uuid        | PK                         |
| `entry_id`                | uuid        | FK → `journal_entries(id)` |
| `key_news`                | text        |                            |
| `market_reaction_summary` | text        |                            |
| `sort_order`              | integer     |                            |
| `created_at`              | timestamptz |                            |

### `public.entry_actions`

| column             | type        | notes                               |
| ------------------ | ----------- | ----------------------------------- |
| `id`               | uuid        | PK                                  |
| `entry_id`         | uuid        | FK → `journal_entries(id)`          |
| `action_type`      | text        | `'buy' \| 'sell' \| 'hold'`         |
| `ticker`           | text        |                                     |
| `shares`           | numeric     |                                     |
| `price_per_unit`   | numeric     |                                     |
| `confidence_level` | text        | `'low' \| 'medium' \| 'high'`       |
| `decision_basis`   | text        | `'logic' \| 'intuition' \| 'mixed'` |
| `sort_order`       | integer     |                                     |
| `created_at`       | timestamptz |                                     |
