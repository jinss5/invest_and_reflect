# Project structure

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
