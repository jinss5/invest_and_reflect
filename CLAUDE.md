# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

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

### Auth

Google OAuth (planned, not yet implemented)

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
  layout.tsx                    # root layout — html/body wrapper, metadata
  page.tsx                      # landing page (/) with link to dashboard
  globals.css                   # Tailwind import
  types/
    journal.ts                  # shared types: JournalEntry, ActionDetail, NewsItem, etc.
  components/
    SegmentedControl.tsx        # generic pill-style toggle (Market Sentiment, Confidence, Decision Basis)
    FearGreedSlider.tsx         # range slider 0-100 with zone labels
    EmotionTags.tsx             # toggleable emotion pills + free-text input
  dashboard/
    page.tsx                    # dashboard page (/dashboard)
    JournalEntryForm.tsx        # journal entry form (client component, UI-only, no persistence)
```

All routes are added under `app/` following Next.js file-system routing conventions.

### Journal entry form sections

The dashboard renders a scrollable form with four card sections:

1. **Basic Info** — date picker, one-line summary
2. **News** — dynamic add/remove news items (headline + market reaction), overall interpretation textarea
3. **Market** — sentiment segmented control (bullish/neutral/bearish), Fear & Greed slider (0-100)
4. **Actions** — dynamic add/remove action items, each with: type dropdown (buy/sell/hold), ticker, shares, price/unit, confidence level, decision basis; followed by shared reasoning textarea and emotion tags
