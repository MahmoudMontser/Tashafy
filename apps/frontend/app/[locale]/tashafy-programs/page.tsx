import { getNavAndFooterLabels } from "@/data/global";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import {
  getJourneySteps,
  getProgramsPageFaqContent,
  getProgramsPageHeroContent,
  getProgramsPagePartnersBlock,
  getProgramsPageProgramsBlock,
  getProgramsPageTestimonialsBlock,
  getProgramsPageWhyImportantContent,
} from "@/data/programs";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const MainSection = dynamic(() => import("@/components/programs/mainSection/MainSection").then((m) => m.default), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const WhyProgramsImportant = dynamic(() => import("@/components/programs/WhyProgramsImportantSection").then((m) => m.default), { ssr: true });
const ProgramsSection = dynamic(() => import("@/components/shared/programs/ProgramsSection").then((m) => m.ProgramsSection), { ssr: true });
const JourneyPlanSection = dynamic(() => import("@/components/shared/journeyPlan/JourneyPlanSection").then((m) => m.JourneyPlanSection), { ssr: true });
const StartJourneySection = dynamic(() => import("@/components/shared/StartJourneySection").then((m) => m.default), { ssr: true });
const OurPartners = dynamic(() => import("@/components/shared/partners/Partners").then((m) => m.OurPartners), { ssr: true });
const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });
const FaqSection = dynamic(() => import("@/components/shared/FaqSection").then((m) => m.FaqSection), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });

export const metadata: Metadata = {
  title: "Tashafy - Tashafy Programs",
  description: "Tashafy Programs page of Tashafy",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TashafyProgramsPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const hero = getProgramsPageHeroContent(t, locale);
  const programsBlock = getProgramsPageProgramsBlock(t, locale);
  const faq = getProgramsPageFaqContent(t);
  const partnersBlock = getProgramsPagePartnersBlock(t);
  const testimonialsBlock = getProgramsPageTestimonialsBlock(t);
  const whyImportant = getProgramsPageWhyImportantContent(t);
  const JourneySteps = getJourneySteps(t);
  const cmsPage = await fetchPublicPage("tashafy-programs", locale);
  const heroSection = getCmsSection<{ title?: string; tagline?: string; description?: string; ctaLabel?: string; ctaHref?: string }>(cmsPage, "hero");
  const whySection = getCmsSection<{ title?: string; description?: string }>(cmsPage, "why");
  const journeySection = getCmsSection<{ title?: string; subtitle?: string; buttonHref?: string }>(cmsPage, "journey");
  if (heroSection) {
    hero.title = heroSection.title || hero.title;
    hero.tagline = heroSection.tagline || hero.tagline;
    hero.description = heroSection.description || hero.description;
    hero.ctaLabel = heroSection.ctaLabel || hero.ctaLabel;
    hero.ctaHref = heroSection.ctaHref || hero.ctaHref;
  }
  if (whySection) {
    whyImportant.title = whySection.title || whyImportant.title;
    whyImportant.description = whySection.description || whyImportant.description;
  }

  return (
    <main className="flex flex-col items-center">
      <MainSection locale={locale} labels={labels} hero={hero} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <WhyProgramsImportant locale={locale} content={whyImportant} />

      <ProgramsSection
        locale={locale}
        title={programsBlock.title}
        subtitle={programsBlock.subtitle}
        programs={programsBlock.programs}
        bookLabel={programsBlock.bookLabel}
        bestSellerLabel={programsBlock.bestSellerLabel}
      />

      <JourneyPlanSection
        locale={locale}
        title={t("recoveryJourney.title")}
        subtitle={t("recoveryJourney.subtitle")}
        steps={JourneySteps}
        ctaTitle={t("recoveryJourney.cta.title")}
        ctaSubtitle={t("recoveryJourney.cta.subtitle")}
        ctaButtonLabel={t("recoveryJourney.cta.button")}
        ctaButtonHref="https://wa.me/1234567890"
        backgroundColor="transparent"
      />

      <StartJourneySection
        locale={locale}
        preHighlightTitle={t("wellness.startJourney.preHighlightTitle")}
        highlightedTitle={t("wellness.startJourney.highlightedTitle")}
        postHighlightTitle={t("wellness.startJourney.postHighlightTitle")}
        subtitle={t("wellness.startJourney.subtitle")}
        buttonLabel={t("wellness.startJourney.button")}
        buttonHref="https://wa.me/1234567890"
      />

      <OurPartners locale={locale} title={partnersBlock.title} subtitle={partnersBlock.subtitle} partners={partnersBlock.partners} />

      <TestmoialsSection
        locale={locale}
        title={testimonialsBlock.title}
        subtitle={testimonialsBlock.subtitle}
        durationLabel={testimonialsBlock.durationLabel}
        countryLabel={testimonialsBlock.countryLabel}
        testimonials={testimonialsBlock.testimonials}
      />

      <FaqSection locale={locale} title={faq.title} intro={faq.intro} items={faq.items} />

      <JourneySection
        locale={locale}
        title={journeySection?.title || t("recoveryJourney.cta.title")}
        subtitle={journeySection?.subtitle || t("recoveryJourney.cta.subtitle")}
        primaryCardTitle={t("whyChoose.features.accreditedCenters.title")}
        primaryCardSubtitle={t("whyChoose.features.accreditedCenters.subtitle")}
        healthyLifeLabel={t("journey.healthyLife")}
        transparentPricesLabel={t("whyChoose.features.transparentPrices.title")}
        buttonLabel={t("recoveryJourney.cta.button")}
        buttonHref={journeySection?.buttonHref || "https://wa.me/1234567890"}
      />
    </main>
  );
}
