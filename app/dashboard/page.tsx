"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { DateProvider } from "@/app/context/DateContext";
import AppNav from "@/app/components/AppNav";
import JournalEntryForm from "./JournalEntryForm";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function DashboardContent() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const initialDate = dateParam && DATE_RE.test(dateParam) ? dateParam : undefined;

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
    <DateProvider key={initialDate ?? "today"} initialDate={initialDate}>
      <div className="min-h-screen bg-[#f4f4f5]">
        <AppNav />
        <main className="pb-16">
          <JournalEntryForm />
        </main>
      </div>
    </DateProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center">
          <p className="text-sm text-[#6b7280]">Loading…</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
