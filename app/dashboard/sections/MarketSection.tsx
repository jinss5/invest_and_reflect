"use client";

import type { MarketSentiment } from "@/app/types/journal";
import SegmentedControl from "@/app/components/SegmentedControl";
import FearGreedSlider, { getZone } from "@/app/components/FearGreedSlider";
import { INPUT_CLASS, Badge, TextValue } from "../components";

const SENTIMENT_OPTIONS = [
  { value: "bearish" as const, label: "Bearish" },
  { value: "neutral" as const, label: "Neutral" },
  { value: "bullish" as const, label: "Bullish" },
];

interface MarketSectionProps {
  mode: "view" | "edit" | "create";
  marketSentiment: MarketSentiment;
  fearGreedIndex: number;
  marketNotes: string;
  onSentimentChange: (value: MarketSentiment) => void;
  onFearGreedChange: (value: number) => void;
  onNotesChange: (value: string) => void;
}

export default function MarketSection({
  mode,
  marketSentiment,
  fearGreedIndex,
  marketNotes,
  onSentimentChange,
  onFearGreedChange,
  onNotesChange,
}: MarketSectionProps) {
  const isView = mode === "view";
  const sentimentLabel =
    SENTIMENT_OPTIONS.find((o) => o.value === marketSentiment)?.label ?? marketSentiment;
  const zone = getZone(fearGreedIndex);

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-semibold text-[#0d1117]">Market</h2>

      {isView ? (
        <div>
          <label className="block text-sm font-medium text-[#6b7280] mb-2">Market Sentiment</label>
          <Badge label={sentimentLabel} />
        </div>
      ) : (
        <SegmentedControl
          label="Market Sentiment"
          options={SENTIMENT_OPTIONS}
          value={marketSentiment}
          onChange={onSentimentChange}
        />
      )}

      {isView ? (
        <div>
          <label className="block text-sm font-medium text-[#6b7280] mb-2">
            Fear & Greed Index
          </label>
          <div className="relative w-full h-2 rounded-full bg-gradient-to-r from-red-400 via-gray-300 to-green-400">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#0d1117] border-2 border-white shadow"
              style={{ left: `${fearGreedIndex}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-[#6b7280]">0</span>
            <span className={`text-sm font-medium ${zone.color}`}>
              {fearGreedIndex} — {zone.label}
            </span>
            <span className="text-xs text-[#6b7280]">100</span>
          </div>
        </div>
      ) : (
        <FearGreedSlider value={fearGreedIndex} onChange={onFearGreedChange} />
      )}

      <div>
        <label className="block text-sm font-medium text-[#6b7280] mb-1">Market Notes</label>
        {isView ? (
          <TextValue value={marketNotes} />
        ) : (
          <textarea
            value={marketNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Stock movements, price changes, portfolio observations…"
            rows={3}
            className={INPUT_CLASS}
          />
        )}
      </div>
    </section>
  );
}
