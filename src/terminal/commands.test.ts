import { describe, expect, it } from "vitest";
import { commandRegistry, executeStaticCommand, getInvalidCommandOutput } from "./domain/commands";

describe("command registry", () => {
  it("lists MVP commands only", () => {
    expect(commandRegistry.map((command) => command.name)).toEqual([
      "help",
      "about",
      "projects",
      "contact",
      "clear",
    ]);
  });

  it("renders help as command names without examples", () => {
    expect(
      executeStaticCommand("help").map((line) => ("text" in line ? line.text : line.label)),
    ).toEqual(["All available commands:", "help | about | projects | contact | clear"]);
  });

  it("suggests help for invalid commands", () => {
    expect(getInvalidCommandOutput()).toEqual([
      expect.objectContaining({
        kind: "error",
        text: 'Command not found. Type "help" to list available commands.',
      }),
    ]);
  });
});
