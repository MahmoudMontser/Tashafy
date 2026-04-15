import type { SearchResultsPageData, SearchResultCenter } from "@/types/search-results";

const SEARCH_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
];

function buildCenter(
  t: (key: string) => string,
  key: string,
  image: string,
  meta: Pick<SearchResultCenter, "category" | "cityId" | "minPrice" | "detailsSegment">,
): SearchResultCenter {
  return {
    image,
    badgeLabel: t(`searchResults.centers.${key}.badge`),
    detailId: key,
    priceFormatted: t(`searchResults.centers.${key}.price`),
    centerName: t(`searchResults.centers.${key}.name`),
    rating: t(`searchResults.centers.${key}.rating`),
    location: t(`searchResults.centers.${key}.location`),
    serviceTags: [
      t(`searchResults.centers.${key}.tag1`),
      t(`searchResults.centers.${key}.tag2`),
      t(`searchResults.centers.${key}.tag3`),
      t(`searchResults.centers.${key}.extraTag`),
    ],
    learnAboutLabel: t("medicalCenters.learnAboutLabel"),
    learnAboutHref: `/${meta.detailsSegment}`,
    ...meta,
  };
}

export function getSearchResultsPageData(t: (key: string) => string): SearchResultsPageData {
  const centers: SearchResultCenter[] = [
    buildCenter(t, "0", SEARCH_IMAGES[0], {
      category: "wellness",
      cityId: "hail",
      minPrice: 3000,
      detailsSegment: "wellness",
    }),
    buildCenter(t, "1", SEARCH_IMAGES[1], {
      category: "rehabilitation",
      cityId: "jeddah",
      minPrice: 1200,
      detailsSegment: "rehabilitation",
    }),
    buildCenter(t, "2", SEARCH_IMAGES[2], {
      category: "wellness",
      cityId: "dubai",
      minPrice: 4000,
      detailsSegment: "wellness",
    }),
    buildCenter(t, "3", SEARCH_IMAGES[3], {
      category: "tashafyMed",
      cityId: "cairo",
      minPrice: 300,
      detailsSegment: "rehabilitation",
    }),
    buildCenter(t, "4", SEARCH_IMAGES[4], {
      category: "rehabilitation",
      cityId: "qatar",
      minPrice: 4000,
      detailsSegment: "rehabilitation",
    }),
    buildCenter(t, "5", SEARCH_IMAGES[5], {
      category: "wellness",
      cityId: "thailand",
      minPrice: 1200,
      detailsSegment: "wellness",
    }),
  ];

  return {
    copy: {
      title: t("searchResults.title"),
      filterTitle: t("searchResults.filterTitle"),
      startsFromLabel: t("searchResults.startsFrom"),
      emptyTitle: t("searchResults.emptyTitle"),
      emptyHint: t("searchResults.emptyHint"),
      clearSearchAria: t("searchResults.clearSearchAria"),
      resultsForPrefix: t("searchResults.resultsForPrefix"),
    },
    filterSections: [
      {
        id: "service",
        title: t("searchResults.filter.serviceTitle"),
        options: [
          { id: "all", label: t("searchResults.filter.all") },
          { id: "wellness", label: t("searchResults.filter.wellness") },
          { id: "rehabilitation", label: t("searchResults.filter.rehabilitation") },
          { id: "tashafyMed", label: t("searchResults.filter.tashafyMed") },
        ],
      },
      {
        id: "city",
        title: t("searchResults.filter.cityTitle"),
        options: [
          { id: "all", label: t("searchResults.filter.all") },
          { id: "jeddah", label: t("searchResults.filter.jeddah") },
          { id: "dubai", label: t("searchResults.filter.dubai") },
          { id: "cairo", label: t("searchResults.filter.cairo") },
          { id: "qatar", label: t("searchResults.filter.qatar") },
          { id: "thailand", label: t("searchResults.filter.thailand") },
          { id: "hail", label: t("searchResults.filter.hail") },
          { id: "riyadh", label: t("searchResults.filter.riyadh") },
        ],
        collapsedOptionIds: ["hail", "riyadh"],
        showMoreLabel: t("searchResults.filter.showMore"),
      },
      {
        id: "price",
        title: t("searchResults.filter.priceTitle"),
        options: [
          { id: "all", label: t("searchResults.filter.all") },
          { id: "300", label: t("searchResults.filter.price300") },
          { id: "1200", label: t("searchResults.filter.price1200") },
          { id: "4000", label: t("searchResults.filter.price4000") },
        ],
      },
    ],
    sortOptions: [
      { value: "best", label: t("searchResults.sort.best") },
      { value: "priceAsc", label: t("searchResults.sort.priceAsc") },
      { value: "priceDesc", label: t("searchResults.sort.priceDesc") },
    ],
    centers,
  };
}
