"use client";

import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import type { SearchResultsPageData, SearchSortValue } from "@/types/search-results";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchResultsFiltersSidebar } from "./SearchResultsFiltersSidebar";
import { SearchResultsGrid } from "./SearchResultsGrid";
import { SearchResultsToolbar } from "./SearchResultsToolbar";
import { initialSelections, matchesCity, matchesPrice, matchesService, matchesText, sortCenters } from "./search-results-utils";

type Props = {
  locale: string;
  isRtl: boolean;
  initialQuery: string;
  data: SearchResultsPageData;
  searchPlaceholder?: string;
};

export function SearchResultsView({ locale, isRtl, initialQuery, data, searchPlaceholder }: Props) {
  const { copy, filterSections, sortOptions, centers } = data;
  const router = useRouter();
  const pathname = usePathname();

  const [queryInput, setQueryInput] = useState(initialQuery);
  useEffect(() => {
    setQueryInput(initialQuery);
  }, [initialQuery]);

  const [selections, setSelections] = useState(() => initialSelections(filterSections));
  const [sort, setSort] = useState<SearchSortValue>("best");
  const [cityExpanded, setCityExpanded] = useState(false);

  const applyQueryToUrl = useCallback(() => {
    const q = queryInput.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, queryInput, router]);

  const clearQuery = useCallback(() => {
    setQueryInput("");
    router.replace(pathname);
  }, [pathname, router]);

  const filtered = useMemo(() => {
    return centers.filter(
      (c) => matchesText(c, queryInput) && matchesService(c, selections.service) && matchesCity(c, selections.city) && matchesPrice(c, selections.price),
    );
  }, [centers, queryInput, selections]);

  const sorted = useMemo(() => sortCenters(filtered, sort), [filtered, sort]);

  return (
    <main lang={locale} className="min-h-svh bg-[#f9fafc] pt-20" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-start">
          <SearchResultsFiltersSidebar
            className="order-1 lg:order-2"
            filterTitle={copy.filterTitle}
            filterSections={filterSections}
            selections={selections}
            setSelections={setSelections}
            cityExpanded={cityExpanded}
            setCityExpanded={setCityExpanded}
            isRtl={isRtl}
          />

          <div className="order-2 flex min-w-0 flex-col gap-8 lg:order-1">
            <SearchResultsToolbar
              title={copy.title}
              searchPlaceholder={searchPlaceholder}
              clearSearchAria={copy.clearSearchAria}
              resultsForPrefix={copy.resultsForPrefix}
              initialQuery={initialQuery}
              queryInput={queryInput}
              onQueryChange={setQueryInput}
              onQuerySubmit={applyQueryToUrl}
              onClearQuery={clearQuery}
              sort={sort}
              onSortChange={setSort}
              sortOptions={sortOptions}
              isRtl={isRtl}
            />

            <SearchResultsGrid
              centers={sorted}
              startsFromLabel={copy.startsFromLabel}
              locale={locale}
              isRtl={isRtl}
              emptyTitle={copy.emptyTitle}
              emptyHint={copy.emptyHint}
            />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
