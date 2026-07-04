import { WELCOME_LINES } from "./constants";
import type { OutputLine } from "./types";

export function makeLine(kind: "text" | "error" | "command", text: string): OutputLine {
  return {
    id: crypto.randomUUID(),
    kind,
    text,
  };
}

export function makeLink(label: string, href: string): OutputLine {
  return {
    id: crypto.randomUUID(),
    kind: "link",
    label,
    href,
  };
}

export function getWelcomeOutput(): OutputLine[] {
  return WELCOME_LINES.map((line) => makeLine("text", line));
}
