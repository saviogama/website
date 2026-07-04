import { useEffect, useMemo, useState } from "react";
import { SESSION_BOOT_KEY } from "../domain/constants";

const BOOT_DURATION_MS = 2750;

export function useBootSequence() {
  const hasBooted = useMemo(() => sessionStorage.getItem(SESSION_BOOT_KEY) === "true", []);
  const [isBooting, setIsBooting] = useState(!hasBooted);

  useEffect(() => {
    if (!isBooting) {
      sessionStorage.setItem(SESSION_BOOT_KEY, "true");
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsBooting(false);
    }, BOOT_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [isBooting]);

  return isBooting;
}
