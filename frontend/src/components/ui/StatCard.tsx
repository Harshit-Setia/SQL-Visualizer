export const StatCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) => (
  <div className="bg-surface-low p-6 rounded-md flex-1">
    <p className="font-display text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/50 mb-2">
      {label}
    </p>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-4xl font-bold text-primary">
        {value}
      </span>
      <span className="font-mono text-xs text-primary/60">{unit}</span>
    </div>
  </div>
);
