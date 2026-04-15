import { getFreeConsultationPageContent } from "@/data/freeConsultation";
import { getNavAndFooterLabels } from "@/data/global";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });
const FreeConsultationLayoutSection = dynamic(() => import("@/components/freeConsultation/FreeConsultationLayoutSection").then((m) => m.default), { ssr: true });

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  return {
    title: t("freeConsultation.meta.title"),
    description: t("freeConsultation.meta.description"),
  };
}

export default async function FreeConsultationPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const pageContent = getFreeConsultationPageContent(t);
  const cmsPage = await fetchPublicPage("free-consultation", locale);
  const heroSection = getCmsSection<{ titleBefore?: string; titleHighlight?: string; titleAfter?: string; subtitle?: string }>(cmsPage, "hero");
  if (heroSection) {
    pageContent.hero.titleBefore = heroSection.titleBefore || pageContent.hero.titleBefore;
    pageContent.hero.titleHighlight = heroSection.titleHighlight || pageContent.hero.titleHighlight;
    pageContent.hero.titleAfter = heroSection.titleAfter || pageContent.hero.titleAfter;
    pageContent.hero.subtitle = heroSection.subtitle || pageContent.hero.subtitle;
  }

  return (
    <main className="flex flex-col items-center">
      <StickyNavbar alwaysVisible locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <FreeConsultationLayoutSection
        locale={locale}
        hero={pageContent.hero}
        contactForm={pageContent.contactForm}
        contactOtp={pageContent.contactOtp}
        contactSuccess={pageContent.contactSuccess}
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
