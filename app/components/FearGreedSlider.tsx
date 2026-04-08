"use client";

interface FearGreedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function getZone(value: number): { label: string; color: string } {
  if (value <= 25) return { label: "Extreme Fear", color: "text-red-600" };
  else if (value <= 45) return { label: "Fear", color: "text-orange-500" };
  else if (value <= 55) return { label: "Neutral", color: "text-[#6b7280]" };
  else if (value < 75) return { label: "Greed", color: "text-emerald-500" };
  else return { label: "Extreme Greed", color: "text-green-600" };
}

export default function FearGreedSlider({ value, onChange }: FearGreedSliderProps) {
  const zone = getZone(value);

  return (
    <fieldset>
      <legend className="flex items-center gap-1.5 text-sm font-medium text-[#0d1117] mb-2">
        Fear & Greed Index
        <a
          href="https://www.cnn.com/markets/fear-and-greed"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b7280] hover:text-[#0d1117] transition-colors"
          aria-label="View CNN Fear & Greed Index"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </legend>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-red-400 via-gray-300 to-green-400 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0d1117] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#0d1117] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-xs text-[#6b7280]">0</span>
        <span className={`text-sm font-medium ${zone.color}`}>
          {value} — {zone.label}
        </span>
        <span className="text-xs text-[#6b7280]">100</span>
      </div>
    </fieldset>
  );
}
