import { FormEvent, KeyboardEvent, useEffect, useReducer, useRef } from "react";
import { PROMPT } from "../domain/constants";
import { insertTextAtSelection } from "../domain/inputText";
import { useAutoScroll } from "./useAutoScroll";
import { useBootSequence } from "./useBootSequence";
import { useContactSubmission } from "./useContactSubmission";
import { useTextareaAutosize } from "./useTextareaAutosize";
import { initialTerminalState, terminalReducer } from "../state/terminalReducer";

export function useTerminalController() {
  const [state, dispatch] = useReducer(terminalReducer, initialTerminalState);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isBooting = useBootSequence();
  const isMessageStep = state.mode.type === "contact" && state.mode.step === "message";
  const promptLabel = state.mode.type === "contact" ? `${state.mode.step}>` : PROMPT;

  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [isBooting, state.mode.type, state.output.length]);

  useAutoScroll(outputRef, state.output.length, state.input);
  useTextareaAutosize(textareaRef, isMessageStep ? state.input : "");
  useContactSubmission(state, dispatch);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "submitInput" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.ctrlKey && event.key.toLowerCase() === "c" && state.mode.type === "contact") {
      event.preventDefault();
      dispatch({ type: "cancelContact" });
      return;
    }

    if (event.key === "Escape" && state.mode.type === "contact") {
      event.preventDefault();
      dispatch({ type: "cancelContact" });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({ type: "historyPrevious" });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      dispatch({ type: "historyNext" });
      return;
    }

    if (isMessageStep && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      const target = event.currentTarget;
      const selectionStart = target.selectionStart ?? state.input.length;
      const selectionEnd = target.selectionEnd ?? state.input.length;
      target.setRangeText("\n", selectionStart, selectionEnd, "end");
      const nextInput = insertTextAtSelection(state.input, "\n", selectionStart, selectionEnd);
      dispatch({ type: "setInput", input: nextInput });
      return;
    }

    if (isMessageStep && event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "submitInput" });
    }
  }

  return {
    state,
    dispatch,
    refs: {
      inputRef,
      outputRef,
      textareaRef,
    },
    viewState: {
      isBooting,
      isMessageStep,
      promptLabel,
    },
    handlers: {
      handleSubmit,
      handleKeyDown,
    },
  };
}
