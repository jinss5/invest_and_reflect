# Database schema

> Reference only — do not execute.

## Row Level Security

RLS is enabled on all tables in `public`. When adding a new table, always enable RLS and add policies before shipping.

## `public.users`

RLS enabled. Policies: `users_insert_own`, `users_update_own` (both scoped to `auth.uid() = id`). No SELECT or DELETE policies.

| column         | type        | notes                     |
| -------------- | ----------- | ------------------------- |
| `id`           | uuid        | PK, FK → `auth.users(id)` |
| `email`        | text        | unique                    |
| `display_name` | text        |                           |
| `created_at`   | timestamptz |                           |
| `updated_at`   | timestamptz |                           |

## `public.journal_entries`

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

## `public.entry_news_items`

| column                    | type        | notes                      |
| ------------------------- | ----------- | -------------------------- |
| `id`                      | uuid        | PK                         |
| `entry_id`                | uuid        | FK → `journal_entries(id)` |
| `key_news`                | text        |                            |
| `market_reaction_summary` | text        |                            |
| `sort_order`              | integer     |                            |
| `created_at`              | timestamptz |                            |

## `public.entry_actions`

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
