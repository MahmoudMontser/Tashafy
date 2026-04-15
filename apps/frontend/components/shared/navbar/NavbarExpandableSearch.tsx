"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavbarExpandableSearchProps = {
  localePrefix: string;
  searchPlaceholder?: string;
  variant: "dark" | "light";
  className?: string;
};

export function NavbarExpandableSearch({ localePrefix, searchPlaceholder, variant, className }: NavbarExpandableSearchProps) {
  const router = useRouter();
  const isLight = variant === "light";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    router.push(`${localePrefix}/search-results?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setQuery("");
  }, [localePrefix, query, router]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={cn("flex min-w-0 justify-end transition-[flex-grow,flex-basis] duration-300 ease-out", open ? "flex-1 basis-0" : "shrink-0 basis-9", className)}
    >
      <div
        className={cn(
          "flex h-9 min-w-0 items-center overflow-hidden rounded-lg transition-[width,box-shadow,background-color,border-color] duration-300 ease-out",
          open ? "w-full max-w-full gap-2 px-2" : "w-9 shrink-0 justify-center",
          open &&
            (isLight
              ? "border border-(--color-border-brand-secondary) bg-(--color-surface-overlay-dark) shadow-[0_1px_2px_0_rgba(17,24,39,0.05)]"
              : "border border-(--color-border-input) bg-white shadow-[0_1px_2px_0_rgba(17,24,39,0.05)]"),
        )}
      >
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer",
            open ? "size-7" : "size-9",
            !open && (!isLight ? "text-(--color-text-secondary) " : "text-white/80"),
            open && (isLight ? "text-white" : "text-(--color-text-secondary) hover:bg-black/5"),
          )}
          aria-label={searchPlaceholder ?? "Search"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Search className="size-5 mb-1" />
        </button>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={searchPlaceholder ?? "Search..."}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm outline-none",
            open ? "w-full opacity-100" : "pointer-events-none w-0 min-w-0 overflow-hidden opacity-0",
            isLight ? "text-white placeholder:text-white/70" : "text-(--color-text-primary) placeholder:text-(--color-text-secondary)",
          )}
          aria-hidden={!open}
          tabIndex={open ? 0 : -1}
        />
      </div>
    </div>
  );
}
