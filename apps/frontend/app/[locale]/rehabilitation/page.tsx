import { getNavAndFooterLabels } from "@/data/global";
import { getRehabilitationMedicalCenters, getRehabilitationPageSections } from "@/data/rehabilitation";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import { getTranslations } from "@/lib/localization/i18n-server";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import MainSection from "@/components/rehabilitation/mainSection/MainSection";

const MedicalCenterSection = dynamic(() => import("@/components/shared/medicalCanter/MedicalCenterSection").then((m) => m.MedicalCenterSection), { ssr: true });
const FaqSection = dynamic(() => import("@/components/shared/FaqSection").then((m) => m.FaqSection), { ssr: true });
const OurDoctorsSection = dynamic(() => import("@/components/shared/ourDoctors/OurDoctorsSection").then((m) => m.OurDoctorsSection), { ssr: true });
const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const RehabilitationServicesSection = dynamic(() => import("@/components/rehabilitation/RehabilitationServicesSection").then((m) => m.RehabilitationServicesSection), {
  ssr: true,
});

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Tashafy - Rehabilitation",
  description: "Rehabilitation page of Tashafy",
};

export default async function RehabilitationPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const rehabilitationCenters = getRehabilitationMedicalCenters(locale, t);
  const pageSections = getRehabilitationPageSections(t);
  const cmsPage = await fetchPublicPage("rehabilitation", locale);
  const heroSection = getCmsSection<{ title?: string; subtitle?: string; browseCentersLabel?: string; browseCentersHref?: string }>(cmsPage, "hero");
  const servicesSection = getCmsSection<{ title?: string; subtitle?: string }>(cmsPage, "services");
  const journeySection = getCmsSection<{ title?: string; subtitle?: string; buttonHref?: string }>(cmsPage, "journey");
  const heroTitle = heroSection?.title || t("rehabilitation.hero.title");
  const heroSubtitle = heroSection?.subtitle || t("rehabilitation.hero.subtitle");
  const heroBrowseCentersLabel = heroSection?.browseCentersLabel || t("rehabilitation.hero.browseCenters");
  const heroBrowseCentersHref = heroSection?.browseCentersHref || `/${locale}/rehabilitation#rehabilitation-medical-centers`;
  if (servicesSection) {
    pageSections.services.title = servicesSection.title || pageSections.services.title;
    pageSections.services.subtitle = servicesSection.subtitle || pageSections.services.subtitle;
  }
  
  return (
    <main className="flex flex-col items-center">
      <MainSection
        locale={locale}
        labels={labels}
        title={heroTitle}
        subtitle={heroSubtitle}
        browseCentersLabel={heroBrowseCentersLabel}
        browseCentersHref={heroBrowseCentersHref}
        searchPlaceholder={t("nav.searchPlaceholder")}
        loadingLabel={t("common.loading")}
      />

      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <RehabilitationServicesSection locale={locale} title={pageSections.services.title} subtitle={pageSections.services.subtitle} items={pageSections.services.items} />

      {/* <div id="rehabilitation-medical-centers"> */}
        <MedicalCenterSection
          locale={locale}
          title={rehabilitationCenters.title}
          subtitle={rehabilitationCenters.subtitle}
          startsFromLabel={rehabilitationCenters.startsFromLabel}
          categories={rehabilitationCenters.categories}
          viewAllLabel={false}
        />
      {/* </div> */}

      <OurDoctorsSection
        locale={locale}
        title={pageSections.doctors.title}
        subtitle={pageSections.doctors.subtitle}
        doctors={pageSections.doctors.doctors}
        backgroundColor="#ffffff"
      />

      <TestmoialsSection
        locale={locale}
        title={pageSections.testimonials.title}
        subtitle={pageSections.testimonials.subtitle}
        durationLabel={pageSections.testimonials.durationLabel}
        countryLabel={pageSections.testimonials.countryLabel}
        testimonials={pageSections.testimonials.testimonials}
      />

      <FaqSection locale={locale} title={pageSections.faq.title} intro={pageSections.faq.intro} items={pageSections.faq.items} />

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
