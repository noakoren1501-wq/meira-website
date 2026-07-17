import { SearchIcon } from "@/components/shared/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "חיפוש מוצר..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="חיפוש מוצרים"
        className="w-full rounded-full border border-brand-gray bg-brand-white py-3 ps-11 pe-4 text-sm text-brand-black placeholder:text-brand-gray-dark"
      />
    </div>
  );
}
