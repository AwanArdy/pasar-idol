import { useEffect } from "react";

export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [active]);
};