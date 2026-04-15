import type { SearchFilterSectionResolved, SearchResultCenter, SearchSortValue } from "@/types/search-results";

export function initialSelections(sections: SearchFilterSectionResolved[]): Record<string, Set<string>> {
  const o: Record<string, Set<string>> = {};
  for (const s of sections) {
    o[s.id] = new Set(["all"]);
  }
  return o;
}

export function toggleSelection(prev: Record<string, Set<string>>, sectionId: string, optionId: string): Record<string, Set<string>> {
  const copy: Record<string, Set<string>> = {};
  for (const k of Object.keys(prev)) {
    copy[k] = new Set(prev[k]);
  }
  const set = new Set(copy[sectionId]);
  if (optionId === "all") {
    copy[sectionId] = new Set(["all"]);
    return copy;
  }
  set.delete("all");
  if (set.has(optionId)) set.delete(optionId);
  else set.add(optionId);
  if (set.size === 0) set.add("all");
  copy[sectionId] = set;
  return copy;
}

export function parseRating(rating: string): number {
  const n = Number.parseFloat(rating.replace(/,/g, "."));
  return Number.isFinite(n) ? n : 0;
}

export function matchesText(center: SearchResultCenter, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const hay = [center.centerName, center.location, center.badgeLabel, ...center.serviceTags].join(" ").toLowerCase();
  return hay.includes(s);
}

export function matchesService(center: SearchResultCenter, sel: Set<string>): boolean {
  if (sel.has("all") || sel.size === 0) return true;
  return sel.has(center.category);
}

export function matchesCity(center: SearchResultCenter, sel: Set<string>): boolean {
  if (sel.has("all") || sel.size === 0) return true;
  return sel.has(center.cityId);
}

export function matchesPrice(center: SearchResultCenter, sel: Set<string>): boolean {
  if (sel.has("all") || sel.size === 0) return true;
  const tiers = [...sel].filter((x) => x !== "all") as ("300" | "1200" | "4000")[];
  if (tiers.length === 0) return true;
  const floor: Record<string, number> = { "300": 300, "1200": 1200, "4000": 4000 };
  return tiers.some((t) => center.minPrice >= floor[t]);
}

export function sortCenters(list: SearchResultCenter[], sort: SearchSortValue): SearchResultCenter[] {
  const next = [...list];
  if (sort === "priceAsc") next.sort((a, b) => a.minPrice - b.minPrice);
  else if (sort === "priceDesc") next.sort((a, b) => b.minPrice - a.minPrice);
  else next.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
  return next;
}
