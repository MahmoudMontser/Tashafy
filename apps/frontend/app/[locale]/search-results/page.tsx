import { SearchResultsView } from "@/components/shared/search-results/SearchResultsView";
import { getSearchResultsPageData } from "@/data/search-results";
import { getNavAndFooterLabels } from "@/data/global";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JourneySection } from "@/components/shared/journey/JourneySection";

const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  return { title: t("searchResults.metaTitle") };
}

export default async function SearchResultsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const raw = sp.q;
  const query = typeof raw === "string" ? raw.trim() : "";

  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const isAr = locale === "ar";
  const pageData = getSearchResultsPageData(t);

  return (
    <main className="flex w-full flex-col">
      <StickyNavbar alwaysVisible locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />
      <SearchResultsView locale={locale} isRtl={isAr} initialQuery={query} data={pageData} searchPlaceholder={t("nav.searchPlaceholder")} />

      <JourneySection
        locale={locale}
        title={t("recoveryJourney.cta.title")}
        subtitle={t("recoveryJourney.cta.subtitle")}
        primaryCardTitle={t("whyChoose.features.accreditedCenters.title")}
        primaryCardSubtitle={t("whyChoose.features.accreditedCenters.subtitle")}
        healthyLifeLabel={t("journey.healthyLife")}
        transparentPricesLabel={t("whyChoose.features.transparentPrices.title")}
        buttonLabel={t("recoveryJourney.cta.button")}
        buttonHref="https://wa.me/1234567890"
      />
    </main>
  );
}
