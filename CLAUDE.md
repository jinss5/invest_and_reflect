# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## API layer boundary

Client components must never call Supabase directly for journal data. All journal reads and writes go through `/api/*` route handlers. `lib/supabase/client.ts` is for auth state only.

## Per-user data isolation

Every Supabase query in an API route must filter by `user_id` from the authenticated session. Never query journal data without scoping to the current user.

## Adding a new form field

Update in this order: `app/types/journal.ts` → `app/api/journal/route.ts` → column mapping in `docs/api-spec.md` → the form component.

## Database safety rules

**NEVER execute any SQL that deletes or destroys data.** This includes, but is not limited to:

- `DELETE FROM ...`
- `DROP TABLE ...`
- `DROP SCHEMA ...`
- `TRUNCATE ...`
- `DROP DATABASE ...`

If a task seems to require data deletion, stop and ask the user to run the command themselves.

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

## Reference Docs

Detailed specs in `docs/` - Claude reads these on-demand when relevant:

- `@docs/project.md` — product vision, core capabilities, deployment context, and auth setup
- `@docs/schema.md` — full Supabase database schema (tables, columns, constraints)
- `@docs/structure.md` — file tree with per-file annotations
- `@docs/api-spec.md` — HTTP API contract for `/api/journal` (GET, POST, DELETE) including request/response shapes and column mapping
