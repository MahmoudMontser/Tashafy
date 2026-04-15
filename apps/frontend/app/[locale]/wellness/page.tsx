import React from "react";
import { Metadata } from "next";
import { getTranslations } from "@/lib/localization/i18n-server";
import MainSection from "@/components/wellness/mainSection/MainSection";
import { getNavAndFooterLabels } from "@/data/global";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import {
  getWellnessAchievementContent,
  getWellnessMedicalCentersSectionContent,
  getWellnessPartners,
  getWellnessServicesSectionContent,
  getWellnessTestimonialsSectionContent,
} from "@/data/wellness";
import dynamic from "next/dynamic";
import { MedicalCenterSection } from "@/components/shared/medicalCanter/MedicalCenterSection";

const OurPartners = dynamic(() => import("@/components/shared/partners/Partners").then((m) => m.OurPartners), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const OurAchievementSection = dynamic(() => import("@/components/wellness/OurAchievementSection").then((m) => m.default), { ssr: true });
const ServiecSection = dynamic(() => import("@/components/wellness/ServiecSection").then((m) => m.ServiecSection), { ssr: true });
const StartJourneySection = dynamic(() => import("@/components/shared/StartJourneySection").then((m) => m.default), { ssr: true });
const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });

export const metadata: Metadata = {
  title: "Tashafy - Wellness",
  description: "Wellness page of Tashafy",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WellnessPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const partners = getWellnessPartners(t);
  const wellnessAchievement = getWellnessAchievementContent(t);
  const wellnessServices = getWellnessServicesSectionContent(t);
  const wellnessTestimonials = getWellnessTestimonialsSectionContent(t);
  const wellnessMedicalCenters = getWellnessMedicalCentersSectionContent(t);
  const cmsPage = await fetchPublicPage("wellness", locale);
  const heroSection = getCmsSection<{ title?: string; subtitle?: string; ctaLabel?: string; ctaHref?: string }>(cmsPage, "hero");
  const servicesSection = getCmsSection<{ title?: string; subtitle?: string }>(cmsPage, "services");
  const journeySection = getCmsSection<{ title?: string; subtitle?: string; buttonHref?: string }>(cmsPage, "journey");
  if (servicesSection) {
    wellnessServices.title = servicesSection.title || wellnessServices.title;
    wellnessServices.subtitle = servicesSection.subtitle || wellnessServices.subtitle;
  }

  return (
    <main className="flex flex-col items-center">
      <MainSection
        locale={locale}
        labels={labels}
        title={heroSection?.title || t("wellness.hero.title")}
        subtitle={heroSection?.subtitle || t("wellness.hero.subtitle")}
        browseCentersLabel={heroSection?.ctaLabel || t("wellness.hero.cta")}
        browseCentersHref={heroSection?.ctaHref || "https://wa.me/1234567890"}
        searchPlaceholder={t("nav.searchPlaceholder")}
        loadingLabel={t("common.loading")}
        floatingCardTitle={t("wellness.hero.floatingCard.title")}
        floatingCardDescription={t("wellness.hero.floatingCard.description")}
      />

      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <OurAchievementSection locale={locale} title={wellnessAchievement.title} subtitle={wellnessAchievement.subtitle} stats={wellnessAchievement.stats} />

      <ServiecSection locale={locale} title={wellnessServices.title} subtitle={wellnessServices.subtitle} items={wellnessServices.items} />

      <MedicalCenterSection
        locale={locale}
        title={wellnessMedicalCenters.title}
        subtitle={wellnessMedicalCenters.subtitle}
        startsFromLabel={wellnessMedicalCenters.startsFromLabel}
        categories={wellnessMedicalCenters.categories}
        viewAllLabel={false}
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

      <TestmoialsSection
        locale={locale}
        title={wellnessTestimonials.title}
        subtitle={wellnessTestimonials.subtitle}
        durationLabel={wellnessTestimonials.durationLabel}
        countryLabel={wellnessTestimonials.countryLabel}
        testimonials={wellnessTestimonials.testimonials}
      />

      <OurPartners locale={locale} title={t("partners.title")} subtitle={t("partners.subtitle")} partners={partners} />

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
