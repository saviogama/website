import { BootSequence } from "./BootSequence";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";
import { TerminalOutput } from "./TerminalOutput";
import type { useTerminalController } from "../hooks/useTerminalController";

type TerminalViewProps = ReturnType<typeof useTerminalController>;

export function TerminalView({ state, dispatch, refs, viewState, handlers }: TerminalViewProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-terminal-bg p-0 font-mono text-terminal-text xl:p-10 2xl:p-14">
      {viewState.isBooting ? <BootSequence /> : null}
      <section
        className={`relative flex h-screen w-full flex-col overflow-hidden bg-transparent transition-opacity duration-700 xl:h-[min(760px,calc(100vh-96px))] xl:max-w-6xl 2xl:max-w-7xl ${
          viewState.isBooting ? "opacity-0" : "opacity-100"
        }`}
        aria-label="Terminal portfolio"
        onClick={() => refs.inputRef.current?.focus()}
      >
        <TerminalHeader />

        <div
          ref={refs.outputRef}
          className="terminal-scroll flex-1 overflow-y-auto px-5 pb-8 text-sm leading-6 text-terminal-text sm:px-10 sm:pb-10 sm:text-base xl:px-16"
        >
          <TerminalOutput output={state.output} />
          <TerminalInput
            input={state.input}
            isMessageStep={viewState.isMessageStep}
            isSubmittingContact={state.isSubmittingContact}
            promptLabel={viewState.promptLabel}
            inputRef={refs.inputRef}
            textareaRef={refs.textareaRef}
            onChange={(input) => dispatch({ type: "setInput", input })}
            onKeyDown={handlers.handleKeyDown}
            onSubmit={handlers.handleSubmit}
          />
        </div>
      </section>
    </main>
  );
}
