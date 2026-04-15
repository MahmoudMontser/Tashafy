import { getNavAndFooterLabels } from "@/data/global";
import { getWellnessCenterDetailBody, getWellnessCenterHeroDetail, getWellnessPageSections, getWellnessSimilarCenters } from "@/data/wellness";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const MainDetailsSection = dynamic(() => import("@/components/wellness/mainDetailsSection/MainDetailsSection").then((m) => m.default), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const ContentContainer = dynamic(() => import("@/components/wellness/contentSection/contentContainer").then((m) => m.default), { ssr: true });
const SimilarCentersSection = dynamic(() => import("@/components/wellness/SimilarCentersSection").then((m) => m.SimilarCentersSection), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });

export const metadata: Metadata = {
  title: "Tashafy - Wellness Details",
  description: "Wellness details page of Tashafy",
};

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function WellnessDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  const { t } = getTranslations(locale);

  const hero = getWellnessCenterHeroDetail(id, t);
  if (!hero) notFound();

  const detailBody = getWellnessCenterDetailBody(id, t);
  if (!detailBody) notFound();

  const { labels } = getNavAndFooterLabels(t);
  const pageSections = getWellnessPageSections(t);
  const similarCenters = getWellnessSimilarCenters(id, t);

  return (
    <main className="flex flex-col items-center">
      <MainDetailsSection
        locale={locale}
        labels={labels}
        searchPlaceholder={t("nav.searchPlaceholder")}
        loadingLabel={t("common.loading")}
        slides={hero.slides}
        centerName={hero.centerName}
        badgeLabel={hero.badgeLabel}
        location={hero.location}
        rating={hero.rating}
        reviewsLabel={hero.reviewsLabel}
      />

      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <ContentContainer locale={locale} detail={detailBody} testimonialsAndFaq={{ testimonials: pageSections.testimonials, faq: pageSections.faq }} />

      <SimilarCentersSection title={t("wellness.detail.similarCentersTitle")} centers={similarCenters} locale={locale} startsFromLabel={t("medicalCenters.startsFrom")} />

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
