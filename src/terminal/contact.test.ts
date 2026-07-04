import { describe, expect, it } from "vitest";
import { validateContactDraft } from "./domain/contactValidation";

describe("validateContactDraft", () => {
  it("accepts complete contact data", () => {
    expect(
      validateContactDraft({
        name: "Savio",
        email: "savio@example.com",
        message: "Hello\nThis is multiline.",
        honeypot: "",
      }),
    ).toEqual({ valid: true });
  });

  it("rejects empty required fields and invalid email", () => {
    expect(
      validateContactDraft({
        name: "",
        email: "invalid",
        message: "",
        honeypot: "",
      }),
    ).toEqual({
      valid: false,
      errors: ["Name is required.", "Email is invalid.", "Message is required."],
    });
  });

  it("rejects honeypot submissions", () => {
    expect(
      validateContactDraft({
        name: "Savio",
        email: "savio@example.com",
        message: "Hello",
        honeypot: "bot",
      }),
    ).toEqual({
      valid: false,
      errors: ["Submission rejected."],
    });
  });
});
