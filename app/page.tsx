"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Page() {
  const { user } = useAuth();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f4f4f5] flex items-center justify-center">
      {/* Background light streaks */}
      <div className="pointer-events-none absolute inset-0">
        {/* Far left — very faint */}
        <div className="absolute left-[5%] top-[-10%] h-[120%] w-[6rem] rounded-full bg-gradient-to-b from-slate-300/20 via-blue-200/10 to-transparent blur-3xl" />

        {/* Left-center */}
        <div className="absolute left-[28%] top-[-5%] h-[110%] w-[5rem] rounded-full bg-gradient-to-b from-slate-200/30 via-slate-300/15 to-transparent blur-[80px]" />

        {/* Center — subtle anchor */}
        <div className="absolute left-[48%] top-0 h-full w-[4rem] rounded-full bg-gradient-to-b from-blue-100/20 via-slate-200/10 to-transparent blur-2xl" />

        {/* Right-center — brighter */}
        <div className="absolute right-[28%] top-[-8%] h-[115%] w-[7rem] rounded-full bg-gradient-to-b from-blue-200/40 via-slate-300/25 to-transparent blur-[90px]" />

        {/* Right — most visible streak */}
        <div className="absolute right-[12%] top-[-5%] h-[120%] w-[9rem] rounded-full bg-gradient-to-b from-slate-300/50 via-blue-200/30 to-transparent blur-3xl" />

        {/* Far right — wide soft glow */}
        <div className="absolute right-[-2%] top-[10%] h-[90%] w-[12rem] rounded-full bg-gradient-to-b from-blue-100/35 via-slate-200/20 to-transparent blur-[100px]" />

        {/* Right edge accent */}
        <div className="absolute right-[4%] top-[-15%] h-[80%] w-[5rem] rounded-full bg-gradient-to-b from-white/60 via-blue-50/30 to-transparent blur-2xl" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0d1117] leading-tight tracking-tight">
          Invest and Reflect
        </h1>

        <p className="mt-5 text-base sm:text-lg font-normal text-[#6b7280] leading-relaxed">
          Track decisions | Build conviction | Improve outcomes
          <br />
          Better decisions compound
        </p>

        <Link
          href={user ? "/dashboard" : "/login"}
          className="mt-8 px-5 py-2 rounded-full bg-[#0d1117] text-white text-sm font-medium transition-opacity duration-150 hover:opacity-75"
        >
          Start
        </Link>
      </div>
    </main>
  );
}
