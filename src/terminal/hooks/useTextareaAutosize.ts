import { RefObject, useEffect } from "react";

export function useTextareaAutosize(ref: RefObject<HTMLTextAreaElement | null>, value: string) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.height = "0px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [ref, value]);
}
