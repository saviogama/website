import type { OutputLine } from "../domain/types";

type TerminalOutputProps = {
  output: OutputLine[];
};

export function TerminalOutput({ output }: TerminalOutputProps) {
  return (
    <div className="space-y-1 pl-2 sm:pl-5">
      {output.map((line) => {
        if (line.kind === "link") {
          return (
            <div key={line.id}>
              <a className="text-[#70D143]" href={line.href} target="_blank" rel="noreferrer">
                {line.href}
              </a>
            </div>
          );
        }

        return (
          <div
            key={line.id}
            className={
              line.kind === "error"
                ? "text-terminal-danger"
                : line.kind === "command"
                  ? "text-terminal-glow"
                  : "text-[#70D143]"
            }
          >
            {line.text || "\u00A0"}
          </div>
        );
      })}
    </div>
  );
}
