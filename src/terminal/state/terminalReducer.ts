import { executeStaticCommand, getInvalidCommandOutput, isCommandName } from "../domain/commands";
import { PROMPT } from "../domain/constants";
import { getWelcomeOutput, makeLine } from "../domain/output";
import type { ContactDraft, TerminalState } from "../domain/types";

export type TerminalAction =
  | { type: "setInput"; input: string }
  | { type: "submitInput" }
  | { type: "historyPrevious" }
  | { type: "historyNext" }
  | { type: "contactSubmitStart" }
  | { type: "contactSubmitSuccess" }
  | { type: "contactSubmitFailure"; error: string }
  | { type: "contactValidationFailure"; errors: string[] }
  | { type: "cancelContact" };

const emptyContactDraft: ContactDraft = {
  name: "",
  email: "",
  message: "",
  honeypot: "",
};

export const initialTerminalState: TerminalState = {
  input: "",
  output: getWelcomeOutput(),
  history: [],
  historyIndex: null,
  mode: { type: "command" },
  isSubmittingContact: false,
};

export function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "setInput":
      return { ...state, input: action.input, historyIndex: null };

    case "submitInput":
      return submitInput(state);

    case "historyPrevious":
      return moveHistory(state, -1);

    case "historyNext":
      return moveHistory(state, 1);

    case "contactSubmitStart":
      return { ...state, isSubmittingContact: true };

    case "contactSubmitSuccess":
      return {
        ...state,
        mode: { type: "command" },
        isSubmittingContact: false,
        output: [...state.output, makeLine("text", "Message sent.")],
      };

    case "contactSubmitFailure":
      return {
        ...state,
        mode: { type: "command" },
        isSubmittingContact: false,
        output: [...state.output, makeLine("error", action.error)],
      };

    case "contactValidationFailure":
      return {
        ...state,
        mode: { type: "command" },
        isSubmittingContact: false,
        output: [...state.output, ...action.errors.map((error) => makeLine("error", error))],
      };

    case "cancelContact":
      return {
        ...state,
        input: "",
        mode: { type: "command" },
        isSubmittingContact: false,
        output:
          state.mode.type === "contact"
            ? [...state.output, makeLine("text", "Contact flow cancelled.")]
            : state.output,
      };
  }
}

function submitInput(state: TerminalState): TerminalState {
  const rawInput = state.input;
  const input = rawInput.trim();

  if (state.mode.type === "contact") {
    return submitContactInput(state, rawInput);
  }

  if (!input) {
    return { ...state, input: "" };
  }

  const commandLine = makeLine("command", `${PROMPT} ${input}`);
  const nextHistory = [...state.history, input];

  if (!isCommandName(input)) {
    return {
      ...state,
      input: "",
      history: nextHistory,
      historyIndex: null,
      output: [...state.output, commandLine, ...getInvalidCommandOutput()],
    };
  }

  if (input === "clear") {
    return {
      ...state,
      input: "",
      history: nextHistory,
      historyIndex: null,
      output: getWelcomeOutput(),
    };
  }

  if (input === "contact") {
    return {
      ...state,
      input: "",
      history: nextHistory,
      historyIndex: null,
      mode: { type: "contact", step: "name", draft: emptyContactDraft },
      output: [...state.output, commandLine, makeLine("text", "Name:")],
    };
  }

  return {
    ...state,
    input: "",
    history: nextHistory,
    historyIndex: null,
    output: [...state.output, commandLine, ...executeStaticCommand(input)],
  };
}

function submitContactInput(state: TerminalState, rawInput: string): TerminalState {
  if (state.mode.type !== "contact") {
    return state;
  }

  const { step, draft } = state.mode;
  const visibleInput = step === "message" ? "[multiline message]" : rawInput;
  const commandLine = makeLine("command", `${step}> ${visibleInput}`);
  const output = [...state.output, commandLine];

  if (step === "name") {
    return {
      ...state,
      input: "",
      output: [...output, makeLine("text", "Email:")],
      mode: { type: "contact", step: "email", draft: { ...draft, name: rawInput } },
    };
  }

  if (step === "email") {
    return {
      ...state,
      input: "",
      output: [...output, makeLine("text", "Message:")],
      mode: { type: "contact", step: "message", draft: { ...draft, email: rawInput } },
    };
  }

  return {
    ...state,
    input: "",
    output: [...output, makeLine("text", "Sending message...")],
    mode: { type: "contact", step: "confirm", draft: { ...draft, message: rawInput } },
  };
}

function moveHistory(state: TerminalState, direction: -1 | 1): TerminalState {
  if (state.history.length === 0 || state.mode.type !== "command") {
    return state;
  }

  const currentIndex = state.historyIndex ?? state.history.length;
  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), state.history.length);

  return {
    ...state,
    historyIndex: nextIndex === state.history.length ? null : nextIndex,
    input: nextIndex === state.history.length ? "" : state.history[nextIndex],
  };
}

export function getPendingContactDraft(state: TerminalState): ContactDraft | null {
  if (state.mode.type !== "contact" || state.mode.step !== "confirm") {
    return null;
  }

  return state.mode.draft;
}
