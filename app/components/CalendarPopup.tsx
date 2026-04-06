"use client";

import { useEffect, useRef, useState } from "react";

type CalendarPopupProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
};

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarPopup({ selectedDate, onSelectDate, onClose }: CalendarPopupProps) {
  const parsed = selectedDate ? new Date(selectedDate + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const blanks = Array.from({ length: firstDay }, (_, i) => <div key={`blank-${i}`} />);

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = toDateString(viewYear, viewMonth, day);
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === today;

    return (
      <button
        key={day}
        type="button"
        aria-label={`${MONTH_LABELS[viewMonth]} ${day}, ${viewYear}`}
        onClick={() => onSelectDate(dateStr)}
        className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full transition-colors ${
          isSelected
            ? "bg-[#0d1117] text-white"
            : isToday
              ? "border border-[#0d1117] text-[#0d1117] hover:bg-gray-100"
              : "text-[#0d1117] hover:bg-gray-100"
        }`}
      >
        {day}
      </button>
    );
  });

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Date picker"
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 w-[280px]"
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="p-1 text-[#6b7280] hover:text-[#0d1117] transition-colors"
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
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <span className="text-sm font-medium text-[#0d1117]">
          {MONTH_LABELS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="p-1 text-[#6b7280] hover:text-[#0d1117] transition-colors"
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
            <path d="M6 12l4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="w-8 h-6 flex items-center justify-center text-[10px] font-medium text-[#6b7280] uppercase"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0">
        {blanks}
        {days}
      </div>
    </div>
  );
}
