"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/data/global";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";

type MobileMenuDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
  labels: NavLabels;
  searchPlaceholder?: string;
  closeLabel: string;
};

export function MobileMenuDrawer({ open, onOpenChange, locale, labels, searchPlaceholder, closeLabel }: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const localePrefix = `/${locale}`;
  const isRtl = locale === "ar";
  const [menuSearchQuery, setMenuSearchQuery] = useState("");

  const submitMenuSearch = useCallback(() => {
    const q = menuSearchQuery.trim();
    if (!q) return;
    router.push(`${localePrefix}/search-results?q=${encodeURIComponent(q)}`);
    setMenuSearchQuery("");
    onOpenChange(false);
  }, [localePrefix, menuSearchQuery, onOpenChange, router]);

  const isActive = (path: string) => {
    const fullPath = path ? `${localePrefix}${path}` : localePrefix;
    if (path === "") return pathname === localePrefix || pathname === `${localePrefix}/`;
    return pathname.startsWith(fullPath);
  };

  const ctaButton = (
    <Button asChild className="bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/50 shrink-0">
      <Link href={`${localePrefix}/contact`} className="inline-flex items-center gap-2" onClick={() => onOpenChange(false)}>
        {labels.freeConsultation}
      </Link>
    </Button>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTitle className="sr-only" />
      <SheetDescription className="sr-only" />
      <SheetContent
        side={isRtl ? "right" : "left"}
        showCloseButton={false}
        className="flex flex-col border-0 bg-(--color-surface-overlay-menu) border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-(--color-border-overlay-menu) backdrop-blur-3xl p-0 w-[85vw] max-w-sm sm:max-w-sm overflow-hidden"
      >
        <SheetHeader
          className={cn(
            "flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 shrink-0",
            !isRtl ? "ltr:flex-row-reverse rtl:flex-row" : "ltr:flex-row rtl:flex-row-reverse",
          )}
        >
          <div className={cn("flex items-center gap-2", "flex-row-reverse")}>
            <button
              type="button"
              className="flex size-9 shrink-0 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
              onClick={() => onOpenChange(false)}
            >
              <X className="size-5" />
            </button>
            <span className="min-w-0">{ctaButton}</span>
          </div>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Link href={localePrefix || "/"} className="flex shrink-0 flex-col gap-0" onClick={() => onOpenChange(false)}>
            <Image className="w-25 h-25" src={locale === "ar" ? "/logo_ar.svg" : "/logo_en.svg"} alt="Tashafy Logo" width={100} height={100} loading="eager" />
          </Link>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
          <div className="relative mb-4">
            <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-white/50 ltr:left-3 rtl:right-3 pointer-events-none" aria-hidden />
            <Input
              type="search"
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitMenuSearch();
                }
              }}
              placeholder={searchPlaceholder ?? "Search..."}
              aria-label={searchPlaceholder ?? "Search"}
              className="h-11 w-full rounded-lg border-white/20 bg-white/10 pl-10 pr-4 text-white placeholder:text-white/60 rtl:pl-4 rtl:pr-10 focus-visible:ring-white/30"
            />
          </div>

          <nav className="flex flex-col gap-0" aria-label="Main navigation">
            {NAV_ITEMS.map(({ key, path }) => {
              const href = path ? `${localePrefix}${path}` : localePrefix;
              const active = isActive(path);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => onOpenChange(false)}
                  className={cn("relative px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 rounded-lg", active && "bg-white/5")}
                >
                  {labels[key]}
                  {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/10">
            <LocaleSwitcher locale={locale} triggerClassName="w-full justify-between gap-2 text-white hover:bg-white/10 hover:text-white" />
          </div>
        </div>

        <div className="border-t border-white/10 p-4 shrink-0">
          <Button variant="ghost" className="w-full gap-2 text-white hover:bg-white/10 hover:text-white" onClick={() => onOpenChange(false)}>
            <X className="size-4" />
            {closeLabel}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
