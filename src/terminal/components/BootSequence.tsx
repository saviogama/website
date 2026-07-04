const bootLines = [
  "INIT // SIGNAL ARRAY 09-J",
  "0x09 0x9S 0x9G  ::  REROUTE",
  "SYNCING NON-HUMAN SYMBOL TABLE",
  "/\\ 09 09 96 // 69 90 9M",
  "LOADING SHELL MEMORY",
  "#################### 100%",
];

export function BootSequence() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center bg-terminal-bg text-terminal-glow">
      <div className="boot-blackout absolute inset-0" />
      <div className="absolute left-6 top-8 hidden space-y-3 text-[0.62rem] tracking-[0.22em] text-terminal-text sm:block">
        <div>15 01 65 0G</div>
        <div>28 08 75 1D</div>
        <div>09 09 96 2S</div>
      </div>
      <div className="absolute bottom-8 right-6 hidden space-y-3 text-right text-[0.62rem] tracking-[0.22em] text-terminal-text sm:block">
        <div>SIGNAL: LOCK</div>
        <div>CORE: COLD</div>
        <div>MEM: WAKE</div>
      </div>
      <div className="relative w-full max-w-4xl px-6 text-[0.72rem] uppercase tracking-[0.24em] sm:text-sm">
        <div className="mb-6 h-px w-full animate-boot-sweep bg-terminal-glow" />
        <div className="space-y-2">
          {bootLines.map((line, index) => (
            <div
              key={line}
              className="alien-readout animate-boot-line-fade"
              style={{ animationDelay: `${index * 170}ms` }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
