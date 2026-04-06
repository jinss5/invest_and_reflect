"use client";

import { useState } from "react";
import { useDate } from "@/app/context/DateContext";
import CalendarPopup from "./CalendarPopup";

export default function CalendarButton() {
  const { selectedDate, setSelectedDate } = useDate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open date picker"
        className="px-3 py-1.5 rounded-full text-[#6b7280] border border-gray-300 transition-colors duration-150 hover:text-[#0d1117] hover:border-gray-400 flex items-center"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="12" height="11" rx="1.5" />
          <path d="M2 6.5h12" />
          <path d="M5.5 1.5v3" />
          <path d="M10.5 1.5v3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <CalendarPopup
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
