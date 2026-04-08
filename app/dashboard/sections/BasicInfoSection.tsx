"use client";

import { useRouter } from "next/navigation";
import { INPUT_CLASS, TextValue } from "../components";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BasicInfoSectionProps {
  mode: "view" | "edit" | "create";
  selectedDate: string;
  summary: string;
  onSummaryChange: (value: string) => void;
}

export default function BasicInfoSection({
  mode,
  selectedDate,
  summary,
  onSummaryChange,
}: BasicInfoSectionProps) {
  const router = useRouter();
  const isView = mode === "view";

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-[#0d1117]">Basic Info</h2>
      <div>
        <label className="block text-sm font-medium text-[#6b7280] mb-1">Date</label>
        {isView ? (
          <p className="text-sm text-[#0d1117]">{formatDate(selectedDate)}</p>
        ) : (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => router.push(`/dashboard?date=${e.target.value}`)}
            className={INPUT_CLASS}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-[#6b7280] mb-1">One-Line Summary</label>
        {isView ? (
          <TextValue value={summary} />
        ) : (
          <input
            type="text"
            value={summary}
            onChange={(e) => onSummaryChange(e.target.value)}
            placeholder="e.g., Sold NVDA on earnings miss fear"
            className={INPUT_CLASS}
          />
        )}
      </div>
    </section>
  );
}
