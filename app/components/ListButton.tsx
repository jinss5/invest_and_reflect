"use client";

import { useRouter } from "next/navigation";

export default function ListButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Open list"
      onClick={() => router.push("/list")}
      className="px-3 py-1.5 rounded-full text-[#6b7280] border border-gray-300 transition-colors duration-150 hover:text-[#0d1117] hover:border-gray-400 flex items-center"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="2.5" cy="4" r="1.5" />
        <rect x="5.5" y="3" width="9" height="2" rx="1" />
        <circle cx="2.5" cy="8" r="1.5" />
        <rect x="5.5" y="7" width="9" height="2" rx="1" />
        <circle cx="2.5" cy="12" r="1.5" />
        <rect x="5.5" y="11" width="9" height="2" rx="1" />
      </svg>
    </button>
  );
}
