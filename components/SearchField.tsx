type SearchFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
};

export function SearchField({ id, label, placeholder, value, onChange, dark = false }: SearchFieldProps) {
  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor={id}
        className={`font-body text-xs font-bold tracking-[0.16em] uppercase ${
          dark ? "text-gold" : "text-navy/60"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 block w-full appearance-none border-2 bg-transparent px-4 py-2 font-body text-sm outline-none ${
          dark ? "border-gold/40 text-paper placeholder:text-paper/40" : "border-navy/30 text-navy placeholder:text-navy/40"
        }`}
      />
    </div>
  );
}
