import { getAboutUsPageContent } from "@/data/about";
import { getNavAndFooterLabels } from "@/data/global";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutUsHeroSection = dynamic(() => import("@/components/about/AboutUsHeroSection").then((m) => m.default), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const AboutUsVisionSection = dynamic(() => import("@/components/about/AboutUsVisionSection").then((m) => m.default), { ssr: true });
const AboutUsMissionSection = dynamic(() => import("@/components/about/AboutUsMissionSection").then((m) => m.default), { ssr: true });
const AboutUsCoreValuesSection = dynamic(() => import("@/components/about/AboutUsCoreValuesSection").then((m) => m.default), { ssr: true });
const AboutUsCeoMessageSection = dynamic(() => import("@/components/about/AboutUsCeoMessageSection").then((m) => m.default), { ssr: true });
const AboutUsServicesSection = dynamic(() => import("@/components/about/AboutUsServicesSection").then((m) => m.default), { ssr: true });
const OurDoctorsSection = dynamic(() => import("@/components/shared/ourDoctors/OurDoctorsSection").then((m) => m.OurDoctorsSection), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  return {
    title: t("about.meta.title"),
    description: t("about.meta.description"),
  };
}

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const pageContent = getAboutUsPageContent(t, locale);
  const cmsPage = await fetchPublicPage("about", locale);
  const heroSection = getCmsSection<{ tagline?: string; brandSubline?: string }>(cmsPage, "hero");
  const visionSection = getCmsSection<{ title?: string; description?: string }>(cmsPage, "vision");
  const missionSection = getCmsSection<{ title?: string; description?: string; ctaHref?: string }>(cmsPage, "mission");

  if (heroSection) {
    pageContent.hero.tagline = heroSection.tagline || pageContent.hero.tagline;
    pageContent.hero.brandSubline = heroSection.brandSubline || pageContent.hero.brandSubline;
  }
  if (visionSection) {
    pageContent.vision.title = visionSection.title || pageContent.vision.title;
    pageContent.vision.description = visionSection.description || pageContent.vision.description;
  }
  if (missionSection) {
    pageContent.mission.title = missionSection.title || pageContent.mission.title;
    pageContent.mission.description = missionSection.description || pageContent.mission.description;
    pageContent.mission.ctaHref = missionSection.ctaHref || pageContent.mission.ctaHref;
  }
  const { nav } = pageContent;

  return (
    <main className="flex flex-col items-center">
      <AboutUsHeroSection locale={locale} labels={labels} hero={pageContent.hero} searchPlaceholder={nav.searchPlaceholder} loadingLabel={nav.loadingLabel} />
      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={nav.searchPlaceholder} loadingLabel={nav.loadingLabel} />

      <AboutUsVisionSection locale={locale} content={pageContent.vision} />

      <AboutUsMissionSection locale={locale} content={pageContent.mission} />

      <AboutUsCoreValuesSection locale={locale} content={pageContent.coreValues} />

      <AboutUsCeoMessageSection locale={locale} content={pageContent.ceo} />

      <AboutUsServicesSection locale={locale} content={pageContent.services} />

      <OurDoctorsSection locale={locale} {...pageContent.ourDoctors} backgroundColor="transparent" />

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
