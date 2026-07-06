export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
      {children}
    </h2>
  );
}
