"use client";

import { useAuth } from "@/app/context/AuthContext";
import { DateProvider } from "@/app/context/DateContext";
import AppNav from "@/app/components/AppNav";

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
        <main className="pb-16" />
      </div>
    </DateProvider>
  );
}
