import { aboutLines } from "../../content/about";
import { projects } from "../../content/projects";
import { INVALID_COMMAND_MESSAGE } from "./constants";
import { makeLine, makeLink } from "./output";
import type { CommandName, OutputLine } from "./types";

type CommandDefinition = {
  name: CommandName;
  description: string;
};

export const commandRegistry: CommandDefinition[] = [
  { name: "help", description: "List available commands." },
  { name: "about", description: "Show background information." },
  { name: "projects", description: "Show selected projects." },
  { name: "contact", description: "Start the contact prompt flow." },
  { name: "clear", description: "Clear output and restore the welcome line." },
];

export function isCommandName(value: string): value is CommandName {
  return commandRegistry.some((command) => command.name === value);
}

export function executeStaticCommand(
  command: Exclude<CommandName, "contact" | "clear">,
): OutputLine[] {
  if (command === "help") {
    return [
      makeLine("text", "All available commands:"),
      makeLine("text", commandRegistry.map((item) => item.name).join(" | ")),
    ];
  }

  if (command === "about") {
    return aboutLines.map((line) => makeLine("text", line));
  }

  return projects.flatMap((project, index) => {
    const lines: OutputLine[] = [
      makeLine("text", `// ${project.name}_`),
      makeLine("text", `${project.description}`),
      makeLine("text", `Technologies: ${project.technologies.join(", ")}`),
      makeLink("GitHub", project.githubUrl),
    ];

    if (project.liveUrl) {
      lines.push(makeLink("Live", project.liveUrl));
    }

    if (index < projects.length - 1) {
      lines.push(makeLine("text", ""));
    }

    return lines;
  });
}

export function getInvalidCommandOutput(): OutputLine[] {
  return [makeLine("error", INVALID_COMMAND_MESSAGE)];
}
