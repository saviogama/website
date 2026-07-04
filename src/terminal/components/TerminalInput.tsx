import { FormEventHandler, KeyboardEventHandler, RefObject } from "react";

type TerminalInputProps = {
  input: string;
  isMessageStep: boolean;
  isSubmittingContact: boolean;
  promptLabel: string;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (input: string) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function TerminalInput({
  input,
  isMessageStep,
  isSubmittingContact,
  promptLabel,
  inputRef,
  textareaRef,
  onChange,
  onKeyDown,
  onSubmit,
}: TerminalInputProps) {
  return (
    <form className="mt-4 flex items-start gap-2 pl-2 leading-6 sm:pl-5" onSubmit={onSubmit}>
      <label className="h-6 shrink-0 leading-6 text-terminal-glow" htmlFor="terminal-input">
        {promptLabel}
      </label>
      {isMessageStep ? (
        <div className="relative flex-1">
          <textarea
            ref={(node) => {
              inputRef.current = node;
              textareaRef.current = node;
            }}
            id="terminal-input"
            rows={1}
            className="min-h-6 w-full resize-none overflow-hidden border-none bg-transparent leading-6 text-transparent caret-transparent outline-none"
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal message input. Press Enter to submit, Control Enter for a new line, Escape or Control C to cancel."
          />
          <pre
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words leading-6 text-terminal-text"
          >
            {input}
            <span className="inline-block h-[1em] w-2 align-[-0.12em] bg-terminal-glow animate-blink" />
          </pre>
        </div>
      ) : (
        <div className="relative flex-1">
          <input
            ref={inputRef as RefObject<HTMLInputElement>}
            id="terminal-input"
            className="h-6 w-full border-none bg-transparent leading-6 text-transparent caret-transparent outline-none"
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            disabled={isSubmittingContact}
            autoComplete="off"
            aria-label="Terminal command input"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 flex h-6 items-center whitespace-pre leading-6 text-terminal-text"
          >
            {input}
            <span className="inline-block h-[1em] w-2 bg-terminal-glow animate-blink" />
          </span>
        </div>
      )}
      <button className="sr-only" type="submit">
        Run
      </button>
    </form>
  );
}
