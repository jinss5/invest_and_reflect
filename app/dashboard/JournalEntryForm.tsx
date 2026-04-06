"use client";

import { useState } from "react";
import type { JournalEntry, ActionDetail, Emotion, NewsItem } from "@/app/types/journal";
import SegmentedControl from "@/app/components/SegmentedControl";
import FearGreedSlider from "@/app/components/FearGreedSlider";
import EmotionTags from "@/app/components/EmotionTags";

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

const initialEntry: JournalEntry = {
  date: new Date().toISOString().split("T")[0],
  summary: "",
  newsItems: [createNewsItem()],
  myInterpretation: "",
  marketSentiment: "neutral",
  fearGreedIndex: 50,
  marketNotes: "",
  actionDetails: [createActionDetail()],
  reasoning: "",
  emotions: [],
  emotionFreeText: "",
};

export default function JournalEntryForm() {
  const [entry, setEntry] = useState<JournalEntry>(initialEntry);

  function updateField<K extends keyof JournalEntry>(key: K, value: JournalEntry[K]) {
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

  // --- Emotion helper ---
  function toggleEmotion(emotion: Emotion) {
    setEntry((prev) => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter((e) => e !== emotion)
        : [...prev.emotions, emotion],
    }));
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
            value={entry.date}
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

        {/* Emotions */}
        <EmotionTags
          selected={entry.emotions}
          onToggle={toggleEmotion}
          freeText={entry.emotionFreeText}
          onFreeTextChange={(v) => updateField("emotionFreeText", v)}
        />
      </section>

      {/* ===== Submit ===== */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled
          className="px-6 py-2.5 rounded-full bg-[#0d1117] text-white text-sm font-medium opacity-50 cursor-not-allowed"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
}
