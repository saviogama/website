export type CommandName = "help" | "about" | "projects" | "contact" | "clear";

export type OutputLine =
  | {
      id: string;
      kind: "text" | "error" | "command";
      text: string;
    }
  | {
      id: string;
      kind: "link";
      label: string;
      href: string;
    };

export type ContactDraft = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

export type ContactStep = "name" | "email" | "message" | "confirm";

export type TerminalMode =
  | { type: "command" }
  | {
      type: "contact";
      step: ContactStep;
      draft: ContactDraft;
    };

export type TerminalState = {
  input: string;
  output: OutputLine[];
  history: string[];
  historyIndex: number | null;
  mode: TerminalMode;
  isSubmittingContact: boolean;
};
