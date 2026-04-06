# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

There are no tests configured yet.

## Stack

- **Next.js 16.2.2** — App Router only. No Pages Router.
- **React 19**
- **TypeScript** (strict mode, path alias `@/*` maps to repo root)
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`. No `tailwind.config.*` file; all customization goes through CSS or inline classes. Global styles live in `app/globals.css` (currently just `@import "tailwindcss"`).

## Project structure

```
app/
  layout.tsx   # root layout — html/body wrapper, metadata
  page.tsx     # index route (/)
  globals.css  # Tailwind import
```

All routes are added under `app/` following Next.js file-system routing conventions.
