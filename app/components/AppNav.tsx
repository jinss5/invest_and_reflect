"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import CalendarButton from "./CalendarButton";
import ListButton from "./ListButton";

export default function AppNav() {
  const { signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200">
      <Link
        href="/"
        className="text-sm font-semibold text-[#0d1117] tracking-tight hover:opacity-70 transition-opacity duration-150"
      >
        Invest and Reflect
      </Link>
      <div className="flex items-center gap-2">
        <ListButton />
        <CalendarButton />
        <button
          onClick={signOut}
          className="px-4 py-1.5 rounded-full text-xs font-medium text-[#6b7280] border border-gray-300 transition-colors duration-150 hover:text-[#0d1117] hover:border-gray-400"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
