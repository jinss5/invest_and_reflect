import { createClient } from "@/lib/supabase/server";
import type { JournalEntry, SaveJournalRequest } from "@/app/types/journal";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const date = new URL(request.url).searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  const { data: je } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("entry_date", date)
    .single();

  if (!je) return Response.json({ entry: null });

  const [{ data: newsRows }, { data: actionRows }] = await Promise.all([
    supabase.from("entry_news_items").select("*").eq("entry_id", je.id).order("sort_order"),
    supabase.from("entry_actions").select("*").eq("entry_id", je.id).order("sort_order"),
  ]);

  const entry: JournalEntry = {
    date: je.entry_date,
    summary: je.summary ?? "",
    myInterpretation: je.my_interpretation ?? "",
    marketSentiment: je.market_sentiment ?? "neutral",
    fearGreedIndex: je.fear_greed_index ?? 50,
    marketNotes: je.market_notes ?? "",
    reasoning: je.reasoning ?? "",
    newsItems: newsRows?.length
      ? newsRows.map((n) => ({
          id: crypto.randomUUID(),
          keyNews: n.key_news ?? "",
          marketReactionSummary: n.market_reaction_summary ?? "",
        }))
      : [],
    actionDetails: actionRows?.length
      ? actionRows.map((a) => ({
          id: crypto.randomUUID(),
          type: a.action_type,
          ticker: a.ticker ?? "",
          shares: a.shares?.toString() ?? "",
          pricePerUnit: a.price_per_unit?.toString() ?? "",
          confidenceLevel: a.confidence_level ?? "medium",
          decisionBasis: a.decision_basis ?? "mixed",
        }))
      : [],
  };

  return Response.json({ entry });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body: SaveJournalRequest = await request.json();
  const { date, entry } = body;

  if (!date || !DATE_RE.test(date)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  await supabase.from("users").upsert({ id: user.id, email: user.email }, { onConflict: "id" });

  const { data: entryRow, error: entryError } = await supabase
    .from("journal_entries")
    .upsert(
      {
        user_id: user.id,
        entry_date: date,
        summary: entry.summary,
        my_interpretation: entry.myInterpretation,
        market_sentiment: entry.marketSentiment,
        fear_greed_index: entry.fearGreedIndex,
        market_notes: entry.marketNotes,
        reasoning: entry.reasoning,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,entry_date" }
    )
    .select("id")
    .single();

  if (entryError) return Response.json({ error: entryError.message }, { status: 500 });

  const entryId = entryRow.id;

  await supabase.from("entry_news_items").delete().eq("entry_id", entryId);
  if (entry.newsItems.length > 0) {
    const { error: newsError } = await supabase.from("entry_news_items").insert(
      entry.newsItems.map((item, i) => ({
        entry_id: entryId,
        key_news: item.keyNews,
        market_reaction_summary: item.marketReactionSummary,
        sort_order: i,
      }))
    );
    if (newsError) return Response.json({ error: newsError.message }, { status: 500 });
  }

  await supabase.from("entry_actions").delete().eq("entry_id", entryId);
  if (entry.actionDetails.length > 0) {
    const { error: actionsError } = await supabase.from("entry_actions").insert(
      entry.actionDetails.map((d, i) => ({
        entry_id: entryId,
        action_type: d.type,
        ticker: d.ticker,
        shares: d.shares ? parseFloat(d.shares) : null,
        price_per_unit: d.pricePerUnit ? parseFloat(d.pricePerUnit) : null,
        confidence_level: d.confidenceLevel,
        decision_basis: d.decisionBasis,
        sort_order: i,
      }))
    );
    if (actionsError) return Response.json({ error: actionsError.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const date = new URL(request.url).searchParams.get("date");
  if (!date || !DATE_RE.test(date)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  const { data: je } = await supabase
    .from("journal_entries")
    .select("id")
    .eq("user_id", user.id)
    .eq("entry_date", date)
    .single();

  if (je) {
    await supabase.from("entry_news_items").delete().eq("entry_id", je.id);
    await supabase.from("entry_actions").delete().eq("entry_id", je.id);
    await supabase.from("journal_entries").delete().eq("id", je.id);
  }

  return Response.json({ ok: true });
}
