"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f4f4f5] flex items-center justify-center">
      {/* Background light streaks */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[-10%] h-[120%] w-[6rem] rounded-full bg-gradient-to-b from-slate-300/20 via-blue-200/10 to-transparent blur-3xl" />
        <div className="absolute right-[28%] top-[-8%] h-[115%] w-[7rem] rounded-full bg-gradient-to-b from-blue-200/40 via-slate-300/25 to-transparent blur-[90px]" />
        <div className="absolute right-[12%] top-[-5%] h-[120%] w-[9rem] rounded-full bg-gradient-to-b from-slate-300/50 via-blue-200/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-8 py-10 max-w-sm w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/50">
        <h1 className="text-3xl font-bold text-[#0d1117] tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-[#6b7280]">Continue to Invest and Reflect</p>

        <div className="mt-8 w-full border-t border-gray-200" />

        <button
          onClick={handleGoogleLogin}
          className="mt-8 w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white border border-gray-300 text-sm font-medium text-[#0d1117] shadow-sm transition-all duration-150 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-[#6b7280]">
          By signing in, you agree to our <br />
          <a href="/terms" className="underline hover:text-[#0d1117]">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-[#0d1117]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
