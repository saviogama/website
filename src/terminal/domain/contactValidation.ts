import type { ContactDraft } from "./types";

export type ContactValidationResult =
  | { valid: true }
  | {
      valid: false;
      errors: string[];
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactDraft(draft: ContactDraft): ContactValidationResult {
  const errors: string[] = [];

  if (!draft.name.trim()) {
    errors.push("Name is required.");
  }

  if (!draft.email.trim()) {
    errors.push("Email is required.");
  } else if (!emailPattern.test(draft.email)) {
    errors.push("Email is invalid.");
  }

  if (!draft.message.trim()) {
    errors.push("Message is required.");
  }

  if (draft.honeypot.trim()) {
    errors.push("Submission rejected.");
  }

  return errors.length > 0 ? { valid: false, errors } : { valid: true };
}
