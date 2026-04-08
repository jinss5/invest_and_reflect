export const INPUT_CLASS =
  "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d1117] placeholder:text-[#6b7280]/50 focus:outline-none focus:ring-2 focus:ring-[#0d1117]/20 focus:border-[#0d1117] transition-colors";

export function TextValue({ value }: { value: string }) {
  if (!value.trim()) {
    return <span className="text-sm text-[#6b7280]/50">—</span>;
  }
  return <p className="text-sm text-[#0d1117] whitespace-pre-wrap">{value}</p>;
}

export function Badge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "buy" | "sell" | "hold";
}) {
  const styles = {
    default: "bg-[#0d1117] text-white",
    buy: "bg-emerald-600 text-white",
    sell: "bg-red-500 text-white",
    hold: "bg-[#6b7280] text-white",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}

export function SectionCard({
  title,
  spacing = "4",
  children,
}: {
  title: string;
  spacing?: "4" | "5";
  children: React.ReactNode;
}) {
  return (
    <section className={`bg-white rounded-2xl p-6 shadow-sm space-y-${spacing}`}>
      <h2 className="text-lg font-semibold text-[#0d1117]">{title}</h2>
      {children}
    </section>
  );
}
