"use client";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/data/global";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { NavbarExpandableSearch } from "./NavbarExpandableSearch";

export type NavbarProps = {
  locale: string;
  labels: NavLabels;
  searchPlaceholder?: string;
  loadingLabel?: string;
  className?: string;
  variant?: "dark" | "light";
  logo_ar?: string;
  logo_en?: string;
};

const Navbar = memo(function Navbar({ locale, labels, searchPlaceholder, loadingLabel, className, variant = "dark", logo_ar, logo_en }: NavbarProps) {
  const pathname = usePathname();
  const localePrefix = `/${locale}`;
  const isRtl = locale === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = useCallback(
    (path: string) => {
      const fullPath = path ? `${localePrefix}${path}` : localePrefix;
      if (path === "") return pathname === localePrefix || pathname === `${localePrefix}/`;
      return pathname.startsWith(fullPath);
    },
    [pathname, localePrefix],
  );

  const ctaButton = useMemo(
    () => (
      <Button asChild className="bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/50 shrink-0">
        <Link href={`${localePrefix}/free-consultation`} className="inline-flex items-center gap-2">
          {labels.freeConsultation}
          {isRtl ? <ChevronLeft className="size-4" aria-hidden /> : <ChevronRight className="size-4" aria-hidden />}
        </Link>
      </Button>
    ),
    [localePrefix, labels.freeConsultation, isRtl],
  );

  const isLight = variant === "light";

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map(({ key, path }) => {
        const href = path ? `${localePrefix}${path}` : localePrefix;
        const active = isActive(path);
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-colors",
              isLight ? "text-(--color-text-primary) hover:text-(--color-text-primary)/90" : "text-white hover:text-white/90",
              active && (isLight ? "text-(--color-text-primary)" : "text-white"),
            )}
          >
            {labels[key]}
            {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />}
          </Link>
        );
      }),
    [localePrefix, labels, isActive, isLight],
  );

  return (
    <>
      <header className={cn("w-full mx-auto", className)} dir={isRtl ? "rtl" : "ltr"}>
        <SectionContainer className="flex h-14 items-center justify-between gap-4 min-w-0">
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4 md:justify-start md:gap-8">
            <Link href={localePrefix || "/"} className={cn("flex shrink-0 flex-col gap-0", isRtl ? "items-end" : "items-start")} aria-label="Tashafy Home">
              <Image
                src={locale === "ar" ? logo_ar || "/logo_white_ar.svg" : logo_en || "/logo_white_en.svg"}
                width={100}
                height={100}
                className="w-25 h-25"
                alt="Tashafy Logo"
                loading="eager"
              />
            </Link>
            <div className="flex items-center gap-2 ms-auto xl:hidden">
              <span className="flex shrink-0">{ctaButton}</span>
              <button
                type="button"
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer",
                  isLight ? "text-(--color-text-secondary) hover:bg-black/5 hover:text-(--color-text-primary)" : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="size-6" />
              </button>
            </div>

            <nav className="hidden min-w-0 flex-1 items-center xl:flex" aria-label="Main navigation">
              <div className="flex min-w-0 flex-1 items-center justify-start">
                <div className="flex shrink-0 items-center gap-1">{navLinks}</div>
                <NavbarExpandableSearch localePrefix={localePrefix} searchPlaceholder={searchPlaceholder} variant={isLight ? "dark" : "light"} />
              </div>
            </nav>
          </div>

          <div className="hidden xl:flex shrink-0 items-center gap-2 sm:gap-3">
            <LocaleSwitcher locale={locale} loadingLabel={loadingLabel} variant={variant} />
            {ctaButton}
          </div>
        </SectionContainer>
      </header>

      <MobileMenuDrawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        locale={locale}
        labels={labels}
        searchPlaceholder={searchPlaceholder}
        closeLabel={isRtl ? "اغلاق" : "Close"}
      />
    </>
  );
});

export { Navbar };
