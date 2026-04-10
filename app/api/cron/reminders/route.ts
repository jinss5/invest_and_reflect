import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { render } from "@react-email/components";
import ReflectionReminderEmail from "@/app/emails/reflection-reminder";
import type { ReminderEmailProps } from "@/app/emails/reflection-reminder";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type ReminderType = "1_week" | "1_month" | "1_year";

type ReminderConfig = {
  type: ReminderType;
  targetDate: string;
  userFlag: "one_week_reminder" | "one_month_reminder" | "one_year_reminder";
};

function computeTargetDates(today: Date): ReminderConfig[] {
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date(today);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const yearAgo = new Date(today);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  return [
    { type: "1_week", targetDate: formatDate(weekAgo), userFlag: "one_week_reminder" },
    { type: "1_month", targetDate: formatDate(monthAgo), userFlag: "one_month_reminder" },
    { type: "1_year", targetDate: formatDate(yearAgo), userFlag: "one_year_reminder" },
  ];
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const today = new Date();
    const configs = computeTargetDates(today);
    const targetDates = configs.map((c) => c.targetDate);

    // Fetch all journal entries matching any of the 3 target dates, joined with users
    const { data: entries, error: entriesError } = await supabase
      .from("journal_entries")
      .select(
        `id, entry_date, summary, my_interpretation, reasoning, market_sentiment, fear_greed_index,
         users!inner(id, email, display_name, email_enabled, one_week_reminder, one_month_reminder, one_year_reminder)`
      )
      .in("entry_date", targetDates);

    if (entriesError) {
      console.error("Failed to query journal entries:", entriesError.message);
      return Response.json({ error: "Database query failed" }, { status: 500 });
    }

    if (!entries || entries.length === 0) {
      return Response.json({ sent: 0 });
    }

    // Filter entries: user must have email_enabled + the specific reminder flag
    type UserData = {
      id: string;
      email: string;
      display_name: string | null;
      email_enabled: boolean;
      one_week_reminder: boolean;
      one_month_reminder: boolean;
      one_year_reminder: boolean;
    };
    type EntryRow = (typeof entries)[number] & { users: UserData };

    const remindersToSend: { entry: EntryRow; config: ReminderConfig }[] = [];

    for (const raw of entries) {
      const entry = raw as unknown as EntryRow;
      const user = entry.users;
      if (!user || !user.email_enabled) continue;

      const config = configs.find((c) => c.targetDate === entry.entry_date);
      if (!config) continue;

      if (!user[config.userFlag]) continue;

      remindersToSend.push({ entry, config });
    }

    if (remindersToSend.length === 0) {
      return Response.json({ sent: 0 });
    }

    // Batch-fetch news items and actions for matched entries
    const entryIds = remindersToSend.map((r) => r.entry.id);

    const [newsResult, actionsResult] = await Promise.all([
      supabase
        .from("entry_news_items")
        .select("entry_id, key_news, market_reaction_summary, sort_order")
        .in("entry_id", entryIds)
        .order("sort_order", { ascending: true }),
      supabase
        .from("entry_actions")
        .select(
          "entry_id, action_type, ticker, shares, price_per_unit, confidence_level, sort_order"
        )
        .in("entry_id", entryIds)
        .order("sort_order", { ascending: true }),
    ]);

    type NewsRow = NonNullable<typeof newsResult.data>[number];
    const newsMap = new Map<string, NewsRow[]>();
    for (const item of newsResult.data ?? []) {
      const list = newsMap.get(item.entry_id) ?? [];
      list.push(item);
      newsMap.set(item.entry_id, list);
    }

    type ActionRow = NonNullable<typeof actionsResult.data>[number];
    const actionsMap = new Map<string, ActionRow[]>();
    for (const item of actionsResult.data ?? []) {
      const list = actionsMap.get(item.entry_id) ?? [];
      list.push(item);
      actionsMap.set(item.entry_id, list);
    }

    // Build and send emails
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    if (!siteUrl) {
      return Response.json({ error: "NEXT_PUBLIC_SITE_URL is not configured" }, { status: 500 });
    }

    const emailBatch = await Promise.all(
      remindersToSend.map(async ({ entry, config }) => {
        const user = entry.users;
        const news = (newsMap.get(entry.id) ?? []).map((n) => ({
          key_news: n.key_news,
          market_reaction_summary: n.market_reaction_summary,
        }));
        const actions = (actionsMap.get(entry.id) ?? []).map((a) => ({
          action_type: a.action_type,
          ticker: a.ticker,
          shares: a.shares,
          price_per_unit: a.price_per_unit,
          confidence_level: a.confidence_level,
        }));

        const props: ReminderEmailProps = {
          displayName: user.display_name ?? "",
          entryDate: entry.entry_date,
          reminderType: config.type,
          summary: entry.summary ?? "",
          reasoning: entry.reasoning ?? "",
          marketSentiment: entry.market_sentiment ?? "",
          fearGreedIndex: entry.fear_greed_index,
          newsItems: news,
          actions,
          appUrl: siteUrl,
        };

        const html = await render(ReflectionReminderEmail(props));

        return {
          from: "Invest & Reflect <reminders@investandreflect.com>",
          to: user.email as string,
          subject: `Reflection reminder: ${entry.entry_date}`,
          html,
        };
      })
    );

    // Resend batch API supports up to 100 emails per call
    const BATCH_SIZE = 100;
    let totalSent = 0;

    for (let i = 0; i < emailBatch.length; i += BATCH_SIZE) {
      const chunk = emailBatch.slice(i, i + BATCH_SIZE);
      const { error: sendError } = await getResend().batch.send(chunk);
      if (sendError) {
        console.error("Resend batch send failed:", sendError.message);
      } else {
        totalSent += chunk.length;
      }
    }

    return Response.json({ sent: totalSent });
  } catch (err) {
    console.error("Cron reminder error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
