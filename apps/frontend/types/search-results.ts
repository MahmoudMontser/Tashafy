import type { MedicalCenterItem } from "./global";

export type SearchServiceCategory = "wellness" | "rehabilitation" | "tashafyMed";

/** Center row on the search results page; includes filter/sort facets. */
export type SearchResultCenter = MedicalCenterItem & {
  category: SearchServiceCategory;
  cityId: string;
  minPrice: number;
  detailsSegment: "wellness" | "rehabilitation";
};

export type SearchFilterOptionResolved = {
  id: string;
  label: string;
};

export type SearchFilterSectionResolved = {
  id: "service" | "city" | "price";
  title: string;
  options: SearchFilterOptionResolved[];
  /** Extra options revealed after “Show more” (cities). */
  collapsedOptionIds?: string[];
  showMoreLabel?: string;
};

export type SearchSortValue = "best" | "priceAsc" | "priceDesc";

export type SearchSortOptionResolved = {
  value: SearchSortValue;
  label: string;
};

export type SearchResultsPageCopy = {
  title: string;
  filterTitle: string;
  startsFromLabel: string;
  emptyTitle: string;
  emptyHint: string;
  clearSearchAria: string;
  resultsForPrefix: string;
};

export type SearchResultsPageData = {
  copy: SearchResultsPageCopy;
  filterSections: SearchFilterSectionResolved[];
  sortOptions: SearchSortOptionResolved[];
  centers: SearchResultCenter[];
};
