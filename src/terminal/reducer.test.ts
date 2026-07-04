import { describe, expect, it } from "vitest";
import { initialTerminalState, terminalReducer } from "./state/terminalReducer";

function submit(command: string) {
  const withInput = terminalReducer(initialTerminalState, { type: "setInput", input: command });
  return terminalReducer(withInput, { type: "submitInput" });
}

describe("terminalReducer", () => {
  it("restores the welcome output when clear runs", () => {
    const state = submit("clear");

    expect(state.output.map((line) => ("text" in line ? line.text : line.label))).toEqual([
      "SYSTEM READY",
      'Type "help" to list available commands.',
    ]);
  });

  it("stores command history for the current reducer session", () => {
    const afterAbout = submit("about");
    const afterProjectsInput = terminalReducer(afterAbout, { type: "setInput", input: "projects" });
    const afterProjects = terminalReducer(afterProjectsInput, { type: "submitInput" });
    const previous = terminalReducer(afterProjects, { type: "historyPrevious" });

    expect(previous.input).toBe("projects");
  });

  it("starts the contact prompt flow", () => {
    const state = submit("contact");

    expect(state.mode).toEqual({
      type: "contact",
      step: "name",
      draft: { name: "", email: "", message: "", honeypot: "" },
    });
    expect(state.output.at(-1)).toEqual(expect.objectContaining({ kind: "text", text: "Name:" }));
  });

  it("cancels the contact prompt flow", () => {
    const contactState = submit("contact");
    const cancelled = terminalReducer(contactState, { type: "cancelContact" });

    expect(cancelled.mode).toEqual({ type: "command" });
    expect(cancelled.output.at(-1)).toEqual(
      expect.objectContaining({ kind: "text", text: "Contact flow cancelled." }),
    );
  });
});
