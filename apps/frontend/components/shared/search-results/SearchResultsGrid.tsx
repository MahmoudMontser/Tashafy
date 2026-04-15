"use client";

import type { SearchResultCenter } from "@/types/search-results";
import { Search } from "lucide-react";
import { MedicalCenterCard } from "./MedicalCenterCard";

type SearchResultsGridProps = {
  centers: SearchResultCenter[];
  startsFromLabel: string;
  locale: string;
  isRtl: boolean;
  emptyTitle: string;
  emptyHint: string;
};

export function SearchResultsGrid({ centers, startsFromLabel, locale, isRtl, emptyTitle, emptyHint }: SearchResultsGridProps) {
  if (centers.length === 0) {
    return (
      <section
        className="flex min-h-[min(60vh,520px)] w-full flex-col items-center justify-center gap-2.5 px-4 py-16 text-center"
        aria-labelledby="search-results-empty-title"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M78.7754 71.275H74.8254L73.4254 69.925C78.3254 64.225 81.2754 56.825 81.2754 48.775C81.2754 30.825 66.7254 16.275 48.7754 16.275C30.8254 16.275 16.2754 30.825 16.2754 48.775C16.2754 66.725 30.8254 81.275 48.7754 81.275C56.8254 81.275 64.2254 78.325 69.9254 73.425L71.2754 74.825V78.775L96.2754 103.725L103.725 96.275L78.7754 71.275ZM48.7754 71.275C36.3254 71.275 26.2754 61.225 26.2754 48.775C26.2754 36.325 36.3254 26.275 48.7754 26.275C61.2254 26.275 71.2754 36.325 71.2754 48.775C71.2754 61.225 61.2254 71.275 48.7754 71.275Z"
            fill="#4E5663"
          />
        </svg>
        <h2 id="search-results-empty-title" className="max-w-2xl text-[28px] font-semibold leading-8 tracking-[-0.02em] text-(--color-text-secondary)">
          {emptyTitle}
        </h2>
        <p className="max-w-2xl text-xl font-normal leading-8 text-(--color-text-secondary-inverse)">{emptyHint}</p>
      </section>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-8" role="list">
      {centers.map((c) => (
        <li key={c.detailId} className="min-w-0">
          <MedicalCenterCard center={c} isRtl={isRtl} startsFromLabel={startsFromLabel} locale={locale} detailsSegment={c.detailsSegment} />
        </li>
      ))}
    </ul>
  );
}
