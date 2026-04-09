"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { NotificationPreferences } from "@/app/types/notifications";

type RemindersModalProps = {
  onClose: () => void;
};

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
        disabled
          ? "cursor-not-allowed bg-gray-100"
          : checked
            ? "cursor-pointer bg-[#0d1117]"
            : "cursor-pointer bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

async function fetchPreferences(): Promise<NotificationPreferences> {
  const res = await fetch("/api/notifications");
  if (!res.ok) throw new Error("Failed to load preferences");
  const { preferences } = await res.json();
  return preferences;
}

async function savePreferences(prefs: NotificationPreferences): Promise<void> {
  const res = await fetch("/api/notifications", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  });
  if (!res.ok) throw new Error("Failed to save preferences");
}

export default function RemindersModal({ onClose }: RemindersModalProps) {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [oneWeekReminder, setOneWeekReminder] = useState(false);
  const [oneMonthReminder, setOneMonthReminder] = useState(false);
  const [oneYearReminder, setOneYearReminder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPreferences()
      .then((prefs) => {
        setEmailEnabled(prefs.emailEnabled);
        setOneWeekReminder(prefs.oneWeekReminder);
        setOneMonthReminder(prefs.oneMonthReminder);
        setOneYearReminder(prefs.oneYearReminder);
      })
      .catch(() => setError("Could not load your preferences."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function persist(prefs: NotificationPreferences) {
    savePreferences(prefs).catch(() => setError("Could not save your preferences."));
  }

  function handleEmailToggle(value: boolean) {
    setEmailEnabled(value);
    if (!value) {
      setOneWeekReminder(false);
      setOneMonthReminder(false);
      setOneYearReminder(false);
      persist({
        emailEnabled: false,
        oneWeekReminder: false,
        oneMonthReminder: false,
        oneYearReminder: false,
      });
    } else {
      persist({ emailEnabled: true, oneWeekReminder, oneMonthReminder, oneYearReminder });
    }
  }

  function handleChildToggle(
    field: "oneWeekReminder" | "oneMonthReminder" | "oneYearReminder",
    value: boolean,
    setter: (v: boolean) => void
  ) {
    setter(value);
    const next: NotificationPreferences = {
      emailEnabled,
      oneWeekReminder,
      oneMonthReminder,
      oneYearReminder,
      [field]: value,
    };
    persist(next);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Reminders settings"
        className="bg-white rounded-2xl shadow-lg border border-gray-200 w-[340px] p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[#0d1117]">Reminders</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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
              <path d="M12 4L4 12M4 4l8 8" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#0d1117]" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 py-4">{error}</p>
        ) : (
          <>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-[#0d1117] font-medium">Enable email notifications</span>
              <Toggle checked={emailEnabled} onChange={handleEmailToggle} />
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className={`text-sm ${emailEnabled ? "text-gray-700" : "text-gray-400"}`}>
                  One-week journal reminder
                </span>
                <Toggle
                  checked={oneWeekReminder}
                  onChange={(v) => handleChildToggle("oneWeekReminder", v, setOneWeekReminder)}
                  disabled={!emailEnabled}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className={`text-sm ${emailEnabled ? "text-gray-700" : "text-gray-400"}`}>
                  One-month journal reminder
                </span>
                <Toggle
                  checked={oneMonthReminder}
                  onChange={(v) => handleChildToggle("oneMonthReminder", v, setOneMonthReminder)}
                  disabled={!emailEnabled}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className={`text-sm ${emailEnabled ? "text-gray-700" : "text-gray-400"}`}>
                  One-year journal reminder
                </span>
                <Toggle
                  checked={oneYearReminder}
                  onChange={(v) => handleChildToggle("oneYearReminder", v, setOneYearReminder)}
                  disabled={!emailEnabled}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
