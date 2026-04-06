"use client";

interface FearGreedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

function getZone(value: number): { label: string; color: string } {
  if (value <= 20) return { label: "Extreme Fear", color: "text-red-600" };
  if (value <= 40) return { label: "Fear", color: "text-orange-500" };
  if (value <= 60) return { label: "Neutral", color: "text-[#6b7280]" };
  if (value <= 80) return { label: "Greed", color: "text-emerald-500" };
  return { label: "Extreme Greed", color: "text-green-600" };
}

export default function FearGreedSlider({
  value,
  onChange,
}: FearGreedSliderProps) {
  const zone = getZone(value);

  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#0d1117] mb-2">
        Fear & Greed Index
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
