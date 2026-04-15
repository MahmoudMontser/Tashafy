import { getNavAndFooterLabels } from "@/data/global";
import {
  getRehabilitationCenterDetailBody,
  getRehabilitationCenterHeroDetail,
  getRehabilitationPageSections,
  getRehabilitationSimilarCenters,
} from "@/data/rehabilitation";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const MainDetailsSection = dynamic(() => import("@/components/rehabilitation/mainDetailsSection/MainDetailsSection").then((m) => m.default), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const ContentContainer = dynamic(() => import("@/components/rehabilitation/contentSection/contentContainer").then((m) => m.default), { ssr: true });
const RehabDetailSimilarCentersSection = dynamic(
  () => import("@/components/rehabilitation/RehabDetailSimilarCentersSection").then((m) => m.RehabDetailSimilarCentersSection),
  { ssr: true },
);
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export const metadata: Metadata = {
  title: "Tashafy - Rehabilitation Details",
  description: "Rehabilitation details page of Tashafy",
};

export default async function RehabilitationDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  const { t } = getTranslations(locale);
  const hero = getRehabilitationCenterHeroDetail(id, t);
  if (!hero) notFound();

  const detailBody = getRehabilitationCenterDetailBody(id, t);
  if (!detailBody) notFound();
  const { labels } = getNavAndFooterLabels(t);
  const pageSections = getRehabilitationPageSections(t);
  const similarCenters = getRehabilitationSimilarCenters(id, t);

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

      <RehabDetailSimilarCentersSection
        title={t("rehabilitation.detail.similarCentersTitle")}
        centers={similarCenters}
        locale={locale}
        startsFromLabel={t("rehabilitationCenters.startsFrom")}
      />

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
