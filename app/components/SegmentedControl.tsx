"use client";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#0d1117] mb-2">{label}</legend>
      <div className="inline-flex rounded-full border border-gray-200 bg-white p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
              value === option.value
                ? "bg-[#0d1117] text-white"
                : "text-[#6b7280] hover:text-[#0d1117]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
