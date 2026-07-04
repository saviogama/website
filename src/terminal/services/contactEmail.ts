import emailjs from "@emailjs/browser";
import type { ContactDraft } from "../domain/types";

export async function sendContactEmail(draft: ContactDraft): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured.");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: draft.name,
      from_email: draft.email,
      message: draft.message,
      honeypot: draft.honeypot,
    },
    {
      publicKey,
    },
  );
}
