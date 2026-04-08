# Project structure

```
app/
  layout.tsx                    # root layout — html/body wrapper, AuthProvider, DateProvider, metadata
  page.tsx                      # landing page (/) with link to dashboard
  globals.css                   # Tailwind import
  login/
    page.tsx                    # login page — Google OAuth sign-in button
  auth/
    callback/
      route.ts                  # OAuth callback handler — exchanges code for session
  api/
    journal/
      route.ts                  # API route handlers (GET, POST, DELETE) — ONLY code that touches Supabase for journal data
  context/
    AuthContext.tsx             # AuthProvider + useAuth hook (user, loading, signOut)
    DateContext.tsx             # DateProvider + useDate hook — selected date shared across nav and form
  types/
    journal.ts                  # shared types: JournalEntry, ActionDetail, NewsItem, SaveJournalRequest, JournalApiResponse
  components/
    AppNav.tsx                  # shared top nav — logo link, ListButton, CalendarButton, sign-out button
    CalendarButton.tsx          # nav button that displays selected date and opens CalendarPopup
    CalendarPopup.tsx           # month calendar popup for date selection
    FearGreedSlider.tsx         # range slider 0-100 with zone labels; exports getZone() helper
    ListButton.tsx              # nav button that navigates to /list
    SegmentedControl.tsx        # generic pill-style toggle (Market Sentiment, Confidence, Decision Basis)
  dashboard/
    CLAUDE.md                   # dashboard-specific guidance (form sections, layout)
    page.tsx                    # dashboard page (/dashboard) — auth-guarded, wraps AppNav + JournalEntryForm in DateProvider
    JournalEntryForm.tsx        # journal entry orchestrator — manages mode (view/edit/create), state, and API calls; renders section components
    components.tsx              # shared dashboard UI primitives — INPUT_CLASS, TextValue, Badge, SectionCard
    sections/
      BasicInfoSection.tsx      # date + summary — view mode shows formatted date & text, edit mode shows inputs
      NewsSection.tsx           # news items list + interpretation — view/edit dual-mode
      MarketSection.tsx         # sentiment, fear/greed index, notes — view/edit dual-mode
      ActionsSection.tsx        # action items list + reasoning — view/edit dual-mode with ActionCardView/ActionCardEdit
  list/
    page.tsx                    # list page (/list) — auth-guarded, wraps AppNav in DateProvider (content TBD)
lib/
  supabase/
    client.ts                   # browser Supabase client (createBrowserClient) — used only for auth state
    server.ts                   # server Supabase client (createServerClient + cookies) — used by API route handlers
    proxy.ts                    # session refresh middleware helper (used by root proxy.ts)
proxy.ts                        # Next.js middleware entry point — delegates to lib/supabase/proxy
docs/
  api-spec.md                   # HTTP API contract for /api/journal (GET, POST, DELETE)
  project.md                    # product vision, core capabilities, deployment context, and auth setup
  schema.md                     # full Supabase database schema (tables, columns, constraints)
  structure.md                  # this file
```

All routes are added under `app/` following Next.js file-system routing conventions.
