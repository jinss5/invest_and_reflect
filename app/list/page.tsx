"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { DateProvider } from "@/app/context/DateContext";
import AppNav from "@/app/components/AppNav";
import type { JournalListItem } from "@/app/types/journal";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function JournalList() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries ?? []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-sm text-[#6b7280]">Loading entries…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-sm text-center">
        <p className="text-[#6b7280] text-sm">Failed to load entries. Please try again.</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-sm text-center">
        <p className="text-[#6b7280] text-sm">No journal entries yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-[120px_1fr] px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#9ca3af] border-b border-gray-100">
        <span>Date</span>
        <span>Summary</span>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <div
            key={entry.entry_date}
            onClick={() => router.push(`/dashboard?date=${entry.entry_date}`)}
            className="grid grid-cols-[120px_1fr] px-5 py-4 items-baseline cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-[#0d1117]">
              {formatDate(entry.entry_date)}
            </span>
            <span className="text-sm text-[#6b7280] truncate">{entry.summary || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ListPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center">
        <p className="text-sm text-[#6b7280]">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DateProvider>
      <div className="min-h-screen bg-[#f4f4f5]">
        <AppNav />
        <main className="pb-16">
          <div className="max-w-2xl mx-auto px-6 py-8">
            <h1 className="text-xl font-semibold text-[#0d1117] mb-6">History</h1>
            <JournalList />
          </div>
        </main>
      </div>
    </DateProvider>
  );
}
