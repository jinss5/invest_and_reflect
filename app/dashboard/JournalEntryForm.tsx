"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { JournalEntry, ActionDetail, NewsItem } from "@/app/types/journal";
import {
  DEFAULT_MARKET_SENTIMENT,
  DEFAULT_FEAR_GREED_INDEX,
  DEFAULT_ACTION_TYPE,
  DEFAULT_CONFIDENCE_LEVEL,
  DEFAULT_DECISION_BASIS,
} from "@/app/constants/journal";
import { useDate } from "@/app/context/DateContext";
import BasicInfoSection from "./sections/BasicInfoSection";
import NewsSection from "./sections/NewsSection";
import MarketSection from "./sections/MarketSection";
import ActionsSection from "./sections/ActionsSection";

type Mode = "view" | "edit" | "create";

function createNewsItem(): NewsItem {
  return { id: crypto.randomUUID(), keyNews: "", marketReactionSummary: "" };
}

function createActionDetail(): ActionDetail {
  return {
    id: crypto.randomUUID(),
    type: DEFAULT_ACTION_TYPE,
    ticker: "",
    shares: "",
    pricePerUnit: "",
    confidenceLevel: DEFAULT_CONFIDENCE_LEVEL,
    decisionBasis: DEFAULT_DECISION_BASIS,
  };
}

function blankEntry(date: string): JournalEntry {
  return {
    date,
    summary: "",
    newsItems: [createNewsItem()],
    myInterpretation: "",
    marketSentiment: DEFAULT_MARKET_SENTIMENT,
    fearGreedIndex: DEFAULT_FEAR_GREED_INDEX,
    marketNotes: "",
    actionDetails: [createActionDetail()],
    reasoning: "",
  };
}

export default function JournalEntryForm() {
  const { selectedDate } = useDate();
  const [entry, setEntry] = useState<JournalEntry>(() =>
    blankEntry(new Date().toISOString().split("T")[0])
  );
  const [mode, setMode] = useState<Mode>("create");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "deleted" | "error">("idle");
  const snapshotRef = useRef<JournalEntry | null>(null);

  const fetchEntry = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?date=${date}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const { entry: fetched } = await res.json();
      if (fetched) {
        setEntry(fetched);
        setMode("view");
      } else {
        setEntry(blankEntry(date));
        setMode("create");
      }
    } catch {
      setEntry(blankEntry(date));
      setMode("create");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntry(selectedDate);
  }, [selectedDate, fetchEntry]);

  // --- Mode transitions ---
  function handleEdit() {
    snapshotRef.current = structuredClone(entry);
    setMode("edit");
  }

  function handleCancel() {
    if (snapshotRef.current) {
      setEntry(snapshotRef.current);
      snapshotRef.current = null;
    }
    setSaveStatus("idle");
    setDeleteStatus("idle");
    setMode("view");
  }

  // --- Field updaters ---
  function updateField<K extends keyof JournalEntry>(key: K, value: JournalEntry[K]) {
    setEntry((prev) => ({ ...prev, [key]: value }));
  }

  function addNewsItem() {
    setEntry((prev) => ({ ...prev, newsItems: [...prev.newsItems, createNewsItem()] }));
  }
  function removeNewsItem(id: string) {
    setEntry((prev) => ({ ...prev, newsItems: prev.newsItems.filter((item) => item.id !== id) }));
  }
  function updateNewsItem(id: string, field: keyof NewsItem, value: string) {
    setEntry((prev) => ({
      ...prev,
      newsItems: prev.newsItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addActionDetail() {
    setEntry((prev) => ({ ...prev, actionDetails: [...prev.actionDetails, createActionDetail()] }));
  }
  function removeActionDetail(id: string) {
    setEntry((prev) => ({ ...prev, actionDetails: prev.actionDetails.filter((d) => d.id !== id) }));
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

  // --- API actions ---
  async function handleSave() {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, entry }),
      });
      if (!res.ok) throw new Error(await res.text());
      snapshotRef.current = null;
      setSaveStatus("saved");
      setMode("view");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    setDeleting(true);
    setDeleteStatus("idle");
    try {
      const res = await fetch(`/api/journal?date=${selectedDate}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      snapshotRef.current = null;
      setEntry(blankEntry(selectedDate));
      setMode("create");
      setDeleteStatus("deleted");
      setTimeout(() => setDeleteStatus("idle"), 2000);
    } catch {
      setDeleteStatus("error");
    } finally {
      setDeleting(false);
    }
  }

  // --- Loading state ---
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="w-5 h-5 border-2 border-[#0d1117] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // --- Render ---
  const isView = mode === "view";
  const Wrapper = isView ? "div" : "form";

  const hasNewsData =
    entry.newsItems.some((n) => n.keyNews.trim() || n.marketReactionSummary.trim()) ||
    entry.myInterpretation.trim();
  const hasMarketData =
    entry.marketSentiment !== DEFAULT_MARKET_SENTIMENT ||
    entry.fearGreedIndex !== DEFAULT_FEAR_GREED_INDEX ||
    entry.marketNotes.trim();
  const hasActionsData =
    entry.actionDetails.some((a) => a.ticker.trim() || a.shares.trim() || a.pricePerUnit.trim()) ||
    entry.reasoning.trim();

  return (
    <Wrapper
      {...(!isView && { onSubmit: (e: React.FormEvent) => e.preventDefault() })}
      className="max-w-2xl mx-auto px-6 py-8 space-y-6"
    >
      <BasicInfoSection
        mode={mode}
        selectedDate={selectedDate}
        summary={entry.summary}
        onSummaryChange={(v) => updateField("summary", v)}
      />

      {(!isView || hasNewsData) && (
        <NewsSection
          mode={mode}
          newsItems={entry.newsItems}
          myInterpretation={entry.myInterpretation}
          onAdd={addNewsItem}
          onRemove={removeNewsItem}
          onUpdate={updateNewsItem}
          onInterpretationChange={(v) => updateField("myInterpretation", v)}
        />
      )}

      {(!isView || hasMarketData) && (
        <MarketSection
          mode={mode}
          marketSentiment={entry.marketSentiment}
          fearGreedIndex={entry.fearGreedIndex}
          marketNotes={entry.marketNotes}
          onSentimentChange={(v) => updateField("marketSentiment", v)}
          onFearGreedChange={(v) => updateField("fearGreedIndex", v)}
          onNotesChange={(v) => updateField("marketNotes", v)}
        />
      )}

      {(!isView || hasActionsData) && (
        <ActionsSection
          mode={mode}
          actionDetails={entry.actionDetails}
          reasoning={entry.reasoning}
          onAdd={addActionDetail}
          onRemove={removeActionDetail}
          onUpdate={updateActionDetail}
          onReasoningChange={(v) => updateField("reasoning", v)}
        />
      )}

      {/* ===== Bottom Actions ===== */}
      <div className="flex justify-between items-center">
        {mode === "edit" ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="px-6 py-2.5 rounded-full border border-red-300 text-red-500 text-sm font-medium transition-colors hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
            {deleteStatus === "deleted" && <span className="text-sm text-green-600">Deleted!</span>}
            {deleteStatus === "error" && (
              <span className="text-sm text-red-500">Failed to delete</span>
            )}
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          {saveStatus === "saved" && <span className="text-sm text-green-600">Saved!</span>}
          {saveStatus === "error" && <span className="text-sm text-red-500">Failed to save</span>}
          {isView ? (
            <button
              type="button"
              onClick={handleEdit}
              className="px-6 py-2.5 rounded-full bg-[#0d1117] text-white text-sm font-medium transition-opacity hover:opacity-80"
            >
              Edit
            </button>
          ) : (
            <>
              {mode === "edit" && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-[#6b7280] hover:text-[#0d1117] transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-[#0d1117] text-white text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
