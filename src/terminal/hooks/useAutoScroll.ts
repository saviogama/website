import { RefObject, useEffect } from "react";

export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  outputLength: number,
  input: string,
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, outputLength, input]);
}
