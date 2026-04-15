"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { SearchFilterSectionResolved } from "@/types/search-results";
import { Filter, Plus } from "lucide-react";
import { toggleSelection } from "./search-results-utils";

type SearchResultsFiltersSidebarProps = {
  className?: string;
  filterTitle: string;
  filterSections: SearchFilterSectionResolved[];
  selections: Record<string, Set<string>>;
  setSelections: React.Dispatch<React.SetStateAction<Record<string, Set<string>>>>;
  cityExpanded: boolean;
  setCityExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isRtl: boolean;
};

function getVisibleOptions(section: SearchFilterSectionResolved, cityExpanded: boolean, collapsedIds: Set<string>) {
  if (section.id !== "city" || cityExpanded) return section.options;
  return section.options.filter((o) => !collapsedIds.has(o.id));
}

export function SearchResultsFiltersSidebar({
  className,
  filterTitle,
  filterSections,
  selections,
  setSelections,
  cityExpanded,
  setCityExpanded,
  isRtl,
}: SearchResultsFiltersSidebarProps) {
  const citySection = filterSections.find((s) => s.id === "city");
  const collapsedIds = new Set(citySection?.collapsedOptionIds ?? []);

  return (
    <aside className={cn("min-w-0", className)} aria-label={filterTitle}>
      <Card className="border-(--color-border-subtle) p-6 shadow-[0px_1.75px_4px_0px_rgba(15,17,20,0.1)] lg:sticky lg:top-24">
        <div className="flex items-center gap-2 border-b border-(--color-border-subtle) pb-4">
          <h2 className="flex-1 text-start text-xl font-semibold tracking-tight text-secondary">{filterTitle}</h2>
          <Filter className="size-5 shrink-0 text-secondary" aria-hidden />
        </div>

        <div className="flex flex-col gap-6 pt-6">
          {filterSections.map((section, idx) => (
            <div key={section.id}>
              {idx > 0 ? <div className="mb-4 h-px w-full bg-(--color-border-subtle)" aria-hidden /> : null}
              <p className="mb-4 text-start text-sm font-semibold text-secondary">{section.title}</p>
              <div className="flex flex-col gap-3">
                {getVisibleOptions(section, cityExpanded, collapsedIds).map((opt) => {
                  const checked = selections[section.id]?.has(opt.id) ?? false;
                  return (
                    <div key={opt.id} className={cn("flex w-full max-w-full items-center gap-3 sm:max-w-[220px] text-white")}>
                      <Checkbox
                        id={`${section.id}-${opt.id}`}
                        checked={checked}
                        onCheckedChange={() => setSelections((p) => toggleSelection(p, section.id, opt.id))}
                        className="size-4 rounded-[4px] border border-(--color-border-input) cursor-pointer"
                      />
                      <Label htmlFor={`${section.id}-${opt.id}`} className="mt-1 cursor-pointer text-start text-sm font-medium text-(--color-text-primary)">
                        {opt.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
              {section.id === "city" && section.showMoreLabel && collapsedIds.size > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-3 h-auto cursor-pointer gap-1 px-1 py-1 text-sm font-medium text-(--color-text-brand) shadow-[0px_1px_3px_0px_rgba(15,17,20,0.1)] hover:bg-transparent hover:text-(--color-text-brand)/90"
                  onClick={() => setCityExpanded((e) => !e)}
                >
                  <span>{section.showMoreLabel}</span>
                  <Plus className="size-5" aria-hidden />
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
