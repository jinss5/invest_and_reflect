"use client";

import { useState, useEffect } from "react";
import type { JournalEntry, ActionDetail, NewsItem } from "@/app/types/journal";
import SegmentedControl from "@/app/components/SegmentedControl";
import FearGreedSlider from "@/app/components/FearGreedSlider";
import { useDate } from "@/app/context/DateContext";
import { useAuth } from "@/app/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

const INPUT_CLASS =
  "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d1117] placeholder:text-[#6b7280]/50 focus:outline-none focus:ring-2 focus:ring-[#0d1117]/20 focus:border-[#0d1117] transition-colors";

function createNewsItem(): NewsItem {
  return { id: crypto.randomUUID(), keyNews: "", marketReactionSummary: "" };
}

function createActionDetail(): ActionDetail {
  return {
    id: crypto.randomUUID(),
    type: "buy",
    ticker: "",
    shares: "",
    pricePerUnit: "",
    confidenceLevel: "medium",
    decisionBasis: "mixed",
  };
}

function blankEntry(date: string): JournalEntry {
  return {
    date,
    summary: "",
    newsItems: [createNewsItem()],
    myInterpretation: "",
    marketSentiment: "neutral",
    fearGreedIndex: 50,
    marketNotes: "",
    actionDetails: [createActionDetail()],
    reasoning: "",
  };
}

export default function JournalEntryForm() {
  const { selectedDate, setSelectedDate } = useDate();
  const { user } = useAuth();
  const [entry, setEntry] = useState<JournalEntry>(() =>
    blankEntry(new Date().toISOString().split("T")[0])
  );
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "deleted" | "error">("idle");

  useEffect(() => {
    if (!user) return;

    const fetchEntry = async () => {
      setLoading(true);
      const supabase = createClient();

      const { data: je } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("entry_date", selectedDate)
        .single();

      if (!je) {
        setEntry(blankEntry(selectedDate));
        setLoading(false);
        return;
      }

      const [{ data: newsRows }, { data: actionRows }] = await Promise.all([
        supabase.from("entry_news_items").select("*").eq("entry_id", je.id).order("sort_order"),
        supabase.from("entry_actions").select("*").eq("entry_id", je.id).order("sort_order"),
      ]);

      setEntry({
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
          : [createNewsItem()],
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
          : [createActionDetail()],
      });

      setLoading(false);
    };

    fetchEntry();
  }, [selectedDate, user]);

  function updateField<K extends keyof JournalEntry>(key: K, value: JournalEntry[K]) {
    if (key === "date" && typeof value === "string") {
      setSelectedDate(value);
    }
    setEntry((prev) => ({ ...prev, [key]: value }));
  }

  // --- News helpers ---
  function addNewsItem() {
    setEntry((prev) => ({
      ...prev,
      newsItems: [...prev.newsItems, createNewsItem()],
    }));
  }

  function removeNewsItem(id: string) {
    setEntry((prev) => ({
      ...prev,
      newsItems: prev.newsItems.filter((item) => item.id !== id),
    }));
  }

  function updateNewsItem(id: string, field: keyof NewsItem, value: string) {
    setEntry((prev) => ({
      ...prev,
      newsItems: prev.newsItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  // --- Action helpers ---
  function addActionDetail() {
    setEntry((prev) => ({
      ...prev,
      actionDetails: [...prev.actionDetails, createActionDetail()],
    }));
  }

  function removeActionDetail(id: string) {
    setEntry((prev) => ({
      ...prev,
      actionDetails: prev.actionDetails.filter((d) => d.id !== id),
    }));
  }

  function updateActionDetail(
    id: string,
    field: "type" | "ticker" | "shares" | "pricePerUnit" | "confidenceLevel" | "decisionBasis",
    value: string
  ) {
    setEntry((prev) => ({
      ...prev,
      actionDetails: prev.actionDetails.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    }));
  }

  async function handleSave() {
    if (!user) return;

    setSaving(true);
    setSaveStatus("idle");

    try {
      const supabase = createClient();

      // Ensure user exists in public.users
      await supabase.from("users").upsert({ id: user.id, email: user.email }, { onConflict: "id" });

      // Upsert journal entry (unique on user_id + entry_date)
      const { data: entryRow, error: entryError } = await supabase
        .from("journal_entries")
        .upsert(
          {
            user_id: user.id,
            entry_date: selectedDate,
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

      if (entryError) throw entryError;

      const entryId = entryRow.id;

      // Replace news items: delete old, insert new
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
        if (newsError) throw newsError;
      }

      // Replace actions: delete old, insert new
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
        if (actionsError) throw actionsError;
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.error("Save failed:", msg);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!user) return;
    if (!confirm("Delete this entry? This cannot be undone.")) return;

    setDeleting(true);
    setDeleteStatus("idle");

    try {
      const supabase = createClient();

      const { data: je } = await supabase
        .from("journal_entries")
        .select("id")
        .eq("user_id", user.id)
        .eq("entry_date", selectedDate)
        .single();

      if (je) {
        await supabase.from("entry_news_items").delete().eq("entry_id", je.id);
        await supabase.from("entry_actions").delete().eq("entry_id", je.id);
        await supabase.from("journal_entries").delete().eq("id", je.id);
      }

      setEntry(blankEntry(selectedDate));
      setDeleteStatus("deleted");
      setTimeout(() => setDeleteStatus("idle"), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.error("Delete failed:", msg);
      setDeleteStatus("error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      {/* ===== Basic Info ===== */}
      <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#0d1117]">Basic Info</h2>
        <div>
          <label className="block text-sm font-medium text-[#0d1117] mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => updateField("date", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0d1117] mb-1">One-Line Summary</label>
          <input
            type="text"
            value={entry.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            placeholder="e.g., Sold NVDA on earnings miss fear"
            className={INPUT_CLASS}
          />
        </div>
      </section>

      {/* ===== News ===== */}
      <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#0d1117]">News</h2>

        {entry.newsItems.map((item, index) => (
          <div key={item.id} className="space-y-3 border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6b7280]">News #{index + 1}</span>
              {entry.newsItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeNewsItem(item.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              value={item.keyNews}
              onChange={(e) => updateNewsItem(item.id, "keyNews", e.target.value)}
              placeholder="Key news headline"
              className={INPUT_CLASS}
            />
            <input
              type="text"
              value={item.marketReactionSummary}
              onChange={(e) => updateNewsItem(item.id, "marketReactionSummary", e.target.value)}
              placeholder="How did the market react?"
              className={INPUT_CLASS}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addNewsItem}
          className="text-xs font-medium text-[#6b7280] hover:text-[#0d1117] transition-colors"
        >
          + Add News
        </button>

        <div>
          <label className="block text-sm font-medium text-[#0d1117] mb-1">My Interpretation</label>
          <textarea
            value={entry.myInterpretation}
            onChange={(e) => updateField("myInterpretation", e.target.value)}
            placeholder="What do I think these news events mean for the market?"
            rows={3}
            className={INPUT_CLASS}
          />
        </div>
      </section>

      {/* ===== Market ===== */}
      <section className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-[#0d1117]">Market</h2>

        <SegmentedControl
          label="Market Sentiment"
          options={[
            { value: "bearish" as const, label: "Bearish" },
            { value: "neutral" as const, label: "Neutral" },
            { value: "bullish" as const, label: "Bullish" },
          ]}
          value={entry.marketSentiment}
          onChange={(v) => updateField("marketSentiment", v)}
        />

        <FearGreedSlider
          value={entry.fearGreedIndex}
          onChange={(v) => updateField("fearGreedIndex", v)}
        />

        <div>
          <label className="block text-sm font-medium text-[#0d1117] mb-1">Market Notes</label>
          <textarea
            value={entry.marketNotes}
            onChange={(e) => updateField("marketNotes", e.target.value)}
            placeholder="Stock movements, price changes, portfolio observations…"
            rows={3}
            className={INPUT_CLASS}
          />
        </div>
      </section>

      {/* ===== Actions ===== */}
      <section className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-[#0d1117]">Actions</h2>

        {entry.actionDetails.map((detail, index) => (
          <div key={detail.id} className="space-y-3 border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6b7280]">Action #{index + 1}</span>
              {entry.actionDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeActionDetail(detail.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <select
              value={detail.type}
              onChange={(e) => updateActionDetail(detail.id, "type", e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="hold">Hold</option>
            </select>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">Ticker</label>
                <input
                  type="text"
                  value={detail.ticker}
                  onChange={(e) => updateActionDetail(detail.id, "ticker", e.target.value)}
                  placeholder="e.g., AAPL"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">Shares</label>
                <input
                  type="text"
                  value={detail.shares}
                  onChange={(e) => updateActionDetail(detail.id, "shares", e.target.value)}
                  placeholder="0"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">Price / Unit</label>
                <input
                  type="text"
                  value={detail.pricePerUnit}
                  onChange={(e) => updateActionDetail(detail.id, "pricePerUnit", e.target.value)}
                  placeholder="0.00"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <SegmentedControl
              label="Confidence Level"
              options={[
                { value: "low" as const, label: "Low" },
                { value: "medium" as const, label: "Medium" },
                { value: "high" as const, label: "High" },
              ]}
              value={detail.confidenceLevel}
              onChange={(v) => updateActionDetail(detail.id, "confidenceLevel", v)}
            />
            <SegmentedControl
              label="Decision Basis"
              options={[
                { value: "logic" as const, label: "Logic-Based" },
                { value: "intuition" as const, label: "Intuition-Based" },
                { value: "mixed" as const, label: "Mixed" },
              ]}
              value={detail.decisionBasis}
              onChange={(v) => updateActionDetail(detail.id, "decisionBasis", v)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addActionDetail}
          className="text-xs font-medium text-[#6b7280] hover:text-[#0d1117] transition-colors"
        >
          + Add Action
        </button>

        {/* Reasoning */}
        <div>
          <label className="block text-sm font-medium text-[#0d1117] mb-1">
            Reasoning Behind Actions
          </label>
          <textarea
            value={entry.reasoning}
            onChange={(e) => updateField("reasoning", e.target.value)}
            placeholder="Why did I take these actions today?"
            rows={3}
            className={INPUT_CLASS}
          />
        </div>
      </section>

      {/* ===== Submit ===== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || saving || loading}
            className="px-6 py-2.5 rounded-full border border-red-300 text-red-500 text-sm font-medium transition-colors hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
          {deleteStatus === "deleted" && <span className="text-sm text-green-600">Deleted!</span>}
          {deleteStatus === "error" && (
            <span className="text-sm text-red-500">Failed to delete</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "saved" && <span className="text-sm text-green-600">Saved!</span>}
          {saveStatus === "error" && <span className="text-sm text-red-500">Failed to save</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="px-6 py-2.5 rounded-full bg-[#0d1117] text-white text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
