"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import type { NavLabels } from "@/types/global";

const MAIN_SECTION_ID = "main-section";

type StickyNavbarProps = {
  locale: string;
  labels: NavLabels;
  searchPlaceholder?: string;
  loadingLabel?: string;
  logoAr?: string;
  logoEn?: string;
  /** When there is no `#main-section` hero (e.g. program detail), keep the bar visible as the primary nav. */
  alwaysVisible?: boolean;
};

export function StickyNavbar({ locale, labels, searchPlaceholder, loadingLabel, logoAr, logoEn, alwaysVisible = false }: StickyNavbarProps) {
  /** Shown when `#main-section` is off-screen; ignored when `alwaysVisible` is true. */
  const [revealedByScroll, setRevealedByScroll] = useState(false);
  const visible = alwaysVisible || revealedByScroll;

  useEffect(() => {
    if (alwaysVisible) return;

    let cleanup: (() => void) | undefined;

    function setupObserver(): boolean {
      const mainSection = document.getElementById(MAIN_SECTION_ID);
      if (!mainSection) return false;

      const observer = new IntersectionObserver(([entry]) => setRevealedByScroll(!entry.isIntersecting), { threshold: 0, rootMargin: "0px" });
      observer.observe(mainSection);
      cleanup = () => observer.disconnect();
      return true;
    }

    if (!setupObserver()) {
      const raf = requestAnimationFrame(() => setupObserver());
      return () => {
        cancelAnimationFrame(raf);
        cleanup?.();
      };
    }
    return () => cleanup?.();
  }, [alwaysVisible]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out bg-white shadow-sm border-b border-gray-100 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="z-50 px-4 sm:px-0 sm:w-[96%] w-full mx-auto shrink-0">
        <Navbar
          variant="light"
          className="navbar"
          locale={locale}
          labels={labels}
          logo_ar={logoAr || "/logo_ar.svg"}
          logo_en={logoEn || "/logo_en.svg"}
          searchPlaceholder={searchPlaceholder}
          loadingLabel={loadingLabel}
        />
      </div>
    </div>
  );
}
