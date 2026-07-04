import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Terminal } from "./Terminal";

vi.mock("./services/contactEmail", () => {
  return {
    sendContactEmail: vi.fn().mockResolvedValue(undefined),
  };
});

describe("Terminal", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("runs commands through the terminal input", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    const input = screen.getByLabelText("Terminal command input");
    await user.type(input, "help{Enter}");

    expect(screen.getByText("All available commands:")).toBeInTheDocument();
    expect(screen.getByText("help | about | projects | contact | clear")).toBeInTheDocument();
  });

  it("shows invalid command output", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal command input"), "wat{Enter}");

    expect(
      screen.getByText('Command not found. Type "help" to list available commands.'),
    ).toBeInTheDocument();
  });

  it("collects contact values through the prompt flow", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal command input"), "contact{Enter}");
    await user.type(screen.getByLabelText("Terminal command input"), "Savio{Enter}");
    await user.type(screen.getByLabelText("Terminal command input"), "savio@example.com{Enter}");
    await user.type(
      screen.getByLabelText(
        "Terminal message input. Press Enter to submit, Control Enter for a new line, Escape or Control C to cancel.",
      ),
      "Hello from the terminal{Enter}",
    );

    expect(await screen.findByText("Message sent.")).toBeInTheDocument();
  });

  it("adds a message newline with control enter", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal command input"), "contact{Enter}");
    await user.type(screen.getByLabelText("Terminal command input"), "Savio{Enter}");
    await user.type(screen.getByLabelText("Terminal command input"), "savio@example.com{Enter}");

    const messageInput = screen.getByLabelText(
      "Terminal message input. Press Enter to submit, Control Enter for a new line, Escape or Control C to cancel.",
    );
    await user.type(messageInput, "Line one{Control>}{Enter}{/Control}Line two");

    expect(messageInput).toHaveValue("Line one\nLine two");
  });

  it("cancels contact prompt flow with escape", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal command input"), "contact{Enter}");
    await user.keyboard("{Escape}");

    expect(screen.getByText("Contact flow cancelled.")).toBeInTheDocument();
    expect(screen.getByLabelText("Terminal command input")).toBeInTheDocument();
  });

  it("cancels contact prompt flow with control c", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal command input"), "contact{Enter}");
    await user.keyboard("{Control>}c{/Control}");

    expect(screen.getByText("Contact flow cancelled.")).toBeInTheDocument();
    expect(screen.getByLabelText("Terminal command input")).toBeInTheDocument();
  });
});
