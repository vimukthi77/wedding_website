"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is at/under the given breakpoint.
 * Used to scale down particle counts / heavy effects on phones so the
 * experience stays buttery smooth on mobile.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
