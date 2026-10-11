type FilterChipProps = {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

/** Toggle button for client-side filters; group chips in a `role="group"` with an aria-label. */
export default function FilterChip({ pressed, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="min-h-10 border border-line px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper-muted transition-colors hover:border-line-strong hover:text-paper aria-pressed:border-champagne aria-pressed:bg-champagne aria-pressed:text-ink-1"
    >
      {children}
    </button>
  );
}
