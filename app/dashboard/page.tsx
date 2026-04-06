"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { DateProvider } from "@/app/context/DateContext";
import CalendarButton from "@/app/components/CalendarButton";
import JournalEntryForm from "./JournalEntryForm";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

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
        {/* Nav bar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200">
          <Link
            href="/"
            className="text-sm font-semibold text-[#0d1117] tracking-tight hover:opacity-70 transition-opacity duration-150"
          >
            Invest and Reflect
          </Link>
          <div className="flex items-center gap-2">
            <CalendarButton />
            <button
              onClick={signOut}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#6b7280] border border-gray-300 transition-colors duration-150 hover:text-[#0d1117] hover:border-gray-400"
            >
              Sign out
            </button>
          </div>
        </nav>

        <main className="pb-16">
          <JournalEntryForm />
        </main>
      </div>
    </DateProvider>
  );
}
