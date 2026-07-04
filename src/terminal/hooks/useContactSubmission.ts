import { Dispatch, useEffect, useRef } from "react";
import { validateContactDraft } from "../domain/contactValidation";
import { sendContactEmail } from "../services/contactEmail";
import { getPendingContactDraft, type TerminalAction } from "../state/terminalReducer";
import type { TerminalState } from "../domain/types";

export function useContactSubmission(state: TerminalState, dispatch: Dispatch<TerminalAction>) {
  const processedDraftRef = useRef<string | null>(null);

  useEffect(() => {
    const draft = getPendingContactDraft(state);

    if (!draft || state.isSubmittingContact) {
      return;
    }

    const draftKey = JSON.stringify(draft);

    if (processedDraftRef.current === draftKey) {
      return;
    }

    processedDraftRef.current = draftKey;
    dispatch({ type: "contactSubmitStart" });

    const validation = validateContactDraft(draft);

    if (!validation.valid) {
      dispatch({ type: "contactValidationFailure", errors: validation.errors });
      return;
    }

    sendContactEmail(draft)
      .then(() => {
        dispatch({ type: "contactSubmitSuccess" });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Message delivery failed.";
        dispatch({ type: "contactSubmitFailure", error: message });
      });
  }, [dispatch, state]);
}
