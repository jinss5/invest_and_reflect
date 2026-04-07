# Project

**Investment Journal** is a web application for individual investors to systematically record their investment decisions, emotions, market interpretations, actions, and retrospective evaluations over time.

## Problem

Individual investors lack the structured evaluation systems that exist in schools or workplaces. This leads to recurring issues:

- Mistaking lucky short-term gains for skill
- Abandoning sound strategies after temporary losses
- Repeating bad processes that happened to produce good results
- Losing memory of the emotions, news context, and reasoning behind past decisions

## Core capabilities

1. **Reading the market** — record daily market conditions, sentiment (fear vs. greed), news reactions, and whether the market over/under-reacted
2. **Responding to market conditions** — separate market psychology from personal psychology; log the reasoning and emotion behind each buy/sell/hold/rebalance action; distinguish rational analysis, emotional reactions, and intuitive judgments
3. **Repeating good decisions** — identify common patterns in successful judgments; generalize effective thinking frameworks and checklists into reusable investment principles
4. **Improving through reflection** — revisit the same entry at 1 week, 3 months, and 1 year; compare how judgment quality looks different over time; separate outcome quality from process quality; surface recurring mistakes and strengths

## Deployment

This service is intended for **public deployment** with **multiple concurrent users**. It is not a local-only tool — it will be publicly accessible on the internet. Design and implement accordingly: assume untrusted input, enforce proper auth and per-user data isolation, and treat security as a hard requirement throughout.

## Auth

Google OAuth via Supabase — implemented. Users sign in at `/login`, are redirected through `/auth/callback`, and land on `/dashboard`. Auth state is managed client-side via `AuthContext` (`app/context/AuthContext.tsx`), which exposes `user`, `loading`, and `signOut`. On sign-out, the user is redirected to `/`.

There is no middleware-level route protection yet; the dashboard page guards itself by checking `useAuth()` and rendering `null` if the user is not authenticated.

## Client state

- **`AuthContext`** (`app/context/AuthContext.tsx`) — global auth state (`user`, `loading`, `signOut`). Provided at root layout via `AuthProvider`.
- **`DateContext`** (`app/context/DateContext.tsx`) — tracks the currently selected journal date (`selectedDate`, `setSelectedDate`). Provided by `DateProvider` inside the dashboard page, scoped to the dashboard subtree.

## Dashboard

The dashboard (`/dashboard`) renders a nav bar and a scrollable `JournalEntryForm`. The nav bar includes a `CalendarButton` for date selection and a sign-out button. The journal form has four sections:

1. **Basic Info** — date picker, one-line summary
2. **News** — dynamic add/remove news items (headline + market reaction), overall interpretation textarea
3. **Market** — sentiment segmented control (bullish/neutral/bearish), Fear & Greed slider (0–100), market notes textarea
4. **Actions** — dynamic add/remove action items, each with: type (buy/sell/hold), ticker, shares, price/unit, confidence level, decision basis; followed by a shared reasoning textarea

The form loads an existing entry when the selected date changes, and saves (upsert) or deletes entries by calling the `/api/journal` HTTP API. The form has no direct Supabase dependency — all persistence goes through the API layer.
