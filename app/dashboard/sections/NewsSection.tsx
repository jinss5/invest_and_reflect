"use client";

import type { NewsItem } from "@/app/types/journal";
import { INPUT_CLASS, TextValue } from "../components";

interface NewsSectionProps {
  mode: "view" | "edit" | "create";
  newsItems: NewsItem[];
  myInterpretation: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof NewsItem, value: string) => void;
  onInterpretationChange: (value: string) => void;
}

export default function NewsSection({
  mode,
  newsItems,
  myInterpretation,
  onAdd,
  onRemove,
  onUpdate,
  onInterpretationChange,
}: NewsSectionProps) {
  const isView = mode === "view";

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-[#0d1117]">News</h2>

      {newsItems.map((item, index) => (
        <div
          key={item.id}
          className={`border border-gray-100 rounded-xl p-4 ${isView ? "space-y-2" : "space-y-3"}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6b7280]">News #{index + 1}</span>
            {!isView && newsItems.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
          {isView ? (
            <>
              <div>
                <label className="block text-xs text-[#6b7280] mb-0.5">Headline</label>
                <TextValue value={item.keyNews} />
              </div>
              <div>
                <label className="block text-xs text-[#6b7280] mb-0.5">Market Reaction</label>
                <TextValue value={item.marketReactionSummary} />
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={item.keyNews}
                onChange={(e) => onUpdate(item.id, "keyNews", e.target.value)}
                placeholder="Key news headline"
                className={INPUT_CLASS}
              />
              <input
                type="text"
                value={item.marketReactionSummary}
                onChange={(e) => onUpdate(item.id, "marketReactionSummary", e.target.value)}
                placeholder="How did the market react?"
                className={INPUT_CLASS}
              />
            </>
          )}
        </div>
      ))}

      {!isView && (
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-medium text-[#6b7280] hover:text-[#0d1117] transition-colors"
        >
          + Add News
        </button>
      )}

      <div>
        <label className="block text-sm font-medium text-[#6b7280] mb-1">My Interpretation</label>
        {isView ? (
          <TextValue value={myInterpretation} />
        ) : (
          <textarea
            value={myInterpretation}
            onChange={(e) => onInterpretationChange(e.target.value)}
            placeholder="What do I think these news events mean for the market?"
            rows={3}
            className={INPUT_CLASS}
          />
        )}
      </div>
    </section>
  );
}
