"use client";

import Link from "next/link";
import CalendarButton from "./CalendarButton";
import ListButton from "./ListButton";
import ProfileButton from "./ProfileButton";

export default function AppNav() {
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
        <ProfileButton />
      </div>
    </nav>
  );
}
