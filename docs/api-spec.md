# API Spec

All endpoints require an authenticated session (cookie-based via Supabase SSR). Unauthenticated requests return `401 Unauthorized`.

---

## `/api/journal`

Implemented in `app/api/journal/route.ts`. This is the **only** server-side code that reads or writes journal data in Supabase. The browser client (`JournalEntryForm.tsx`) never calls Supabase directly for journal data.

---

### GET `/api/journal?date=YYYY-MM-DD`

Fetch the journal entry for a given date.

**Query params**

| Param | Format       | Required |
| ----- | ------------ | -------- |
| date  | `YYYY-MM-DD` | yes      |

**Responses**

| Status | Body                        | Meaning                         |
| ------ | --------------------------- | ------------------------------- |
| 200    | `{ entry: JournalEntry }`   | Entry found                     |
| 200    | `{ entry: null }`           | No entry saved for this date    |
| 400    | `{ error: "Invalid date" }` | Missing or malformed date param |
| 401    | `{ error: "Unauthorized" }` | No valid session                |

**Notes**

- `newsItems` and `actionDetails` are fetched in parallel and ordered by `sort_order`.
- All DB columns are mapped from `snake_case` to `camelCase` before returning.

---

### POST `/api/journal`

Save (upsert) a journal entry. Creates a new entry or replaces the existing one for the same `(user_id, date)`.

**Request body** (`application/json`)

```ts
{
  date: string; // YYYY-MM-DD
  entry: JournalEntry;
}
```

**Responses**

| Status | Body                        | Meaning                   |
| ------ | --------------------------- | ------------------------- |
| 200    | `{ ok: true }`              | Saved successfully        |
| 400    | `{ error: "Invalid date" }` | Missing or malformed date |
| 401    | `{ error: "Unauthorized" }` | No valid session          |
| 500    | `{ error: string }`         | Supabase write error      |

**Notes**

- Upserts `public.users { id, email }` on first save (ensures the users row exists).
- Upserts `journal_entries` on conflict `(user_id, entry_date)`.
- Replaces `entry_news_items` and `entry_actions` with a delete-then-insert for the entry.

---

### DELETE `/api/journal?date=YYYY-MM-DD`

Delete the journal entry for a given date, including all related news items and actions.

**Query params**

| Param | Format       | Required |
| ----- | ------------ | -------- |
| date  | `YYYY-MM-DD` | yes      |

**Responses**

| Status | Body                        | Meaning                         |
| ------ | --------------------------- | ------------------------------- |
| 200    | `{ ok: true }`              | Deleted (or no entry existed)   |
| 400    | `{ error: "Invalid date" }` | Missing or malformed date param |
| 401    | `{ error: "Unauthorized" }` | No valid session                |

**Notes**

- If no entry exists for the date, returns `{ ok: true }` silently (idempotent).
- Deletes child rows (`entry_news_items`, `entry_actions`) before deleting the parent `journal_entries` row.

---

## Column mapping

DB column (snake_case) → TypeScript field (camelCase):

| DB column                 | TS field                |
| ------------------------- | ----------------------- |
| `entry_date`              | `date`                  |
| `summary`                 | `summary`               |
| `my_interpretation`       | `myInterpretation`      |
| `market_sentiment`        | `marketSentiment`       |
| `fear_greed_index`        | `fearGreedIndex`        |
| `market_notes`            | `marketNotes`           |
| `reasoning`               | `reasoning`             |
| `key_news`                | `keyNews`               |
| `market_reaction_summary` | `marketReactionSummary` |
| `action_type`             | `type`                  |
| `price_per_unit`          | `pricePerUnit`          |
| `confidence_level`        | `confidenceLevel`       |
| `decision_basis`          | `decisionBasis`         |
