interface DotGridProps {
  color: "sage" | "orange" | "sky";
  className?: string;
  rows?: number;
  cols?: number;
}

const colorClass = {
  sage: "bg-sage-green-sat50",
  orange: "bg-burnt-orange",
  sky: "bg-sky-blue",
};

export function DotGrid({ color, className = "", rows = 6, cols = 10 }: DotGridProps) {
  return (
    <div
      aria-hidden="true"
      className={`grid gap-[11px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${colorClass[color]}`} />
      ))}
    </div>
  );
}
