export function TerminalHeader() {
  return (
    <header className="pointer-events-none z-10 flex h-16 shrink-0 items-center justify-between px-5 text-[0.62rem] uppercase tracking-[0.22em] text-terminal-text sm:h-20 sm:px-10 xl:px-16">
      <div className="flex items-center gap-4">
        <span>SYS/</span>
        <span className="hidden text-terminal-text sm:inline">INTERACTIVE SHELL</span>
      </div>
      <div className="text-terminal-glow">ONLINE</div>
    </header>
  );
}
