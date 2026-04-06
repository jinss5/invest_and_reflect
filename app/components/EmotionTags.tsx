"use client";

import type { Emotion } from "@/app/types/journal";

const EMOTIONS: { value: Emotion; label: string }[] = [
  { value: "fomo", label: "FOMO" },
  { value: "anxiety", label: "Anxiety" },
  { value: "calm", label: "Calm" },
  { value: "excitement", label: "Excitement" },
  { value: "regret", label: "Regret" },
];

interface EmotionTagsProps {
  selected: Emotion[];
  onToggle: (emotion: Emotion) => void;
  freeText: string;
  onFreeTextChange: (text: string) => void;
}

export default function EmotionTags({
  selected,
  onToggle,
  freeText,
  onFreeTextChange,
}: EmotionTagsProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#0d1117] mb-2">Emotions at the Time</legend>
      <div className="flex flex-wrap gap-2">
        {EMOTIONS.map((emotion) => {
          const isSelected = selected.includes(emotion.value);
          return (
            <button
              key={emotion.value}
              type="button"
              onClick={() => onToggle(emotion.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 ${
                isSelected
                  ? "bg-[#0d1117] text-white border-[#0d1117]"
                  : "bg-white text-[#6b7280] border-gray-200 hover:text-[#0d1117] hover:border-gray-400"
              }`}
            >
              {emotion.label}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        value={freeText}
        onChange={(e) => onFreeTextChange(e.target.value)}
        placeholder="Other emotions (optional)"
        className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d1117] placeholder:text-[#6b7280]/50 focus:outline-none focus:ring-2 focus:ring-[#0d1117]/20 focus:border-[#0d1117] transition-colors"
      />
    </fieldset>
  );
}
