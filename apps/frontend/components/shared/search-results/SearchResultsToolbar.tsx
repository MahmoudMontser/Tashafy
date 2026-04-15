"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SearchSortOptionResolved, SearchSortValue } from "@/types/search-results";
import { ListFilter, Search, X } from "lucide-react";

type SearchResultsToolbarProps = {
  title: string;
  searchPlaceholder?: string;
  clearSearchAria: string;
  resultsForPrefix: string;
  initialQuery: string;
  queryInput: string;
  onQueryChange: (value: string) => void;
  onQuerySubmit: () => void;
  onClearQuery: () => void;
  sort: SearchSortValue;
  onSortChange: (value: SearchSortValue) => void;
  sortOptions: SearchSortOptionResolved[];
  isRtl: boolean;
};

export function SearchResultsToolbar({
  title,
  searchPlaceholder,
  clearSearchAria,
  resultsForPrefix,
  initialQuery,
  queryInput,
  onQueryChange,
  onQuerySubmit,
  onClearQuery,
  sort,
  onSortChange,
  sortOptions,
  isRtl,
}: SearchResultsToolbarProps) {
  const sortAriaLabel = sortOptions.find((o) => o.value === sort)?.label ?? title;

  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="flex-1 text-start text-xl font-semibold tracking-tight text-secondary">{title}</h1>
        <Search className="size-5 shrink-0 text-secondary" aria-hidden />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4">
        <div className="relative min-w-0 flex-1">
          <Input
            value={queryInput}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onQuerySubmit();
            }}
            placeholder={searchPlaceholder}
            className={cn("h-11 rounded-lg border border-[#E0E0E0] bg-white pe-10 ps-3 shadow-xs", isRtl && "ps-10 pe-3")}
            aria-label={title}
          />
          {queryInput ? (
            <button
              type="button"
              className={cn(
                "absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-(--color-text-secondary) hover:bg-black/5",
                isRtl ? "left-1" : "right-1",
              )}
              aria-label={clearSearchAria}
              onClick={onClearQuery}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        <Select dir={isRtl ? "rtl" : "ltr"} value={sort} onValueChange={(v) => onSortChange(v as SearchSortValue)}>
          <SelectTrigger
            aria-label={sortAriaLabel}
            className="flex h-11 w-full min-w-0 shrink-0 cursor-pointer gap-2 border border-[#E0E0E0] rounded-lg bg-white px-3 py-2 shadow-xs lg:h-auto lg:min-w-[240px] lg:max-w-xs lg:py-5 **:data-[slot=select-value]:text-black"
          >
            <div className="flex items-center gap-2">
              <ListFilter className="size-4 mb-1 shrink-0 text-(--color-text-secondary)" aria-hidden />
              <SelectValue className="text-black" />
            </div>
          </SelectTrigger>
          <SelectContent align={isRtl ? "end" : "start"} className="border border-(--color-border-input) bg-white py-2 text-(--color-text-secondary) shadow-xs">
            {sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="cursor-pointer">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {initialQuery ? (
        <p className="text-sm text-(--color-text-secondary)">
          {resultsForPrefix} &ldquo;{initialQuery}&rdquo;
        </p>
      ) : null}
    </header>
  );
}
