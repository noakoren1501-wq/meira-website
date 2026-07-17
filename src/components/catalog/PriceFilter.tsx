interface PriceFilterValue {
  min: number | null;
  max: number | null;
}

interface PriceFilterProps {
  bounds: { min: number; max: number };
  value: PriceFilterValue;
  onChange: (value: PriceFilterValue) => void;
}

export function PriceFilter({ bounds, value, onChange }: PriceFilterProps) {
  const hasActiveFilter = value.min !== null || value.max !== null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-brand-gray-dark">
        <span>ממחיר</span>
        <input
          type="number"
          inputMode="numeric"
          min={bounds.min}
          max={bounds.max}
          placeholder={String(bounds.min)}
          value={value.min ?? ""}
          onChange={(event) =>
            onChange({ ...value, min: event.target.value === "" ? null : Number(event.target.value) })
          }
          className="w-24 rounded-full border border-brand-gray bg-brand-white px-4 py-3 text-sm text-brand-black"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-brand-gray-dark">
        <span>עד מחיר</span>
        <input
          type="number"
          inputMode="numeric"
          min={bounds.min}
          max={bounds.max}
          placeholder={String(bounds.max)}
          value={value.max ?? ""}
          onChange={(event) =>
            onChange({ ...value, max: event.target.value === "" ? null : Number(event.target.value) })
          }
          className="w-24 rounded-full border border-brand-gray bg-brand-white px-4 py-3 text-sm text-brand-black"
        />
      </label>
      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => onChange({ min: null, max: null })}
          className="text-sm text-brand-black underline underline-offset-4"
        >
          נקה סינון
        </button>
      )}
    </div>
  );
}
