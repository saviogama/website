import { expect, test } from "@playwright/test";

test("terminal happy path", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("SYSTEM READY")).toBeVisible();

  const input = page.getByLabel("Terminal command input");
  await input.fill("help");
  await input.press("Enter");
  await expect(page.getByText("projects")).toBeVisible();

  await input.fill("projects");
  await input.press("Enter");
  await expect(page.getByRole("link", { name: /github/i })).toBeVisible();

  await input.fill("unknown");
  await input.press("Enter");
  await expect(
    page.getByText('Command not found. Type "help" to list available commands.'),
  ).toBeVisible();

  await input.press("ArrowUp");
  await expect(input).toHaveValue("unknown");

  await input.fill("contact");
  await input.press("Enter");
  await input.fill("Savio");
  await input.press("Enter");
  await input.fill("savio@example.com");
  await input.press("Enter");

  const messageInput = page.getByLabel(
    "Terminal message input. Press Enter to submit, Control Enter for a new line, Escape or Control C to cancel.",
  );
  await messageInput.fill("This is a longer contact message.");
  await messageInput.press("Control+Enter");
  await messageInput.pressSequentially("It should expand with the terminal flow.");

  await expect
    .poll(() => messageInput.evaluate((node) => window.getComputedStyle(node).overflowY))
    .toBe("hidden");
  await expect(messageInput).toHaveValue(
    "This is a longer contact message.\nIt should expand with the terminal flow.",
  );
  await expect.poll(() => messageInput.evaluate((node) => node.clientHeight)).toBeGreaterThan(28);

  await messageInput.press("Control+C");
  await expect(page.getByText("Contact flow cancelled.")).toBeVisible();

  const headerBox = await page.getByText("SYS/").boundingBox();
  const scrollBox = await page.locator(".terminal-scroll").boundingBox();

  expect(headerBox).not.toBeNull();
  expect(scrollBox).not.toBeNull();
  expect(scrollBox!.y).toBeGreaterThan(headerBox!.y + headerBox!.height);
});
