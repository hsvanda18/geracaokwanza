export function PlaceholderTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block border border-dashed px-2 py-0.5 font-body text-[10px] font-semibold tracking-[0.14em] uppercase opacity-70 ${className}`}
    >
      Por preencher
    </span>
  );
}
