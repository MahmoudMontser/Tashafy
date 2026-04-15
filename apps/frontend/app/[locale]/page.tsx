import { Metadata } from "next";
import dynamic from "next/dynamic";
import MainSection from "@/components/home/MainSection";
import { StickyNavbar } from "@/components/shared/navbar/StickyNavbar";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";
import { getFrontendAppSettings } from "@/lib/app-settings";
import { getTranslations } from "@/lib/localization/i18n-server";
import { getNavAndFooterLabels } from "@/data/global";
import {
  getArticles,
  getCertifications,
  getConsultationsDoctors,
  getDestinations,
  getFaqItems,
  getFeatures,
  getMedicalCenters,
  getOurDoctors,
  getOurPartners,
  getOurServices,
  getOurStoryStats,
  getPrograms,
  getSpecialties,
  getStartJourneySteps,
  getTestimonials,
  getWhyChooseFeatures,
  getWhyChooseStats,
} from "@/data/home";
import { JourneySection } from "@/components/shared/journey/JourneySection";

const ServiceSection = dynamic(() => import("@/components/home/services/ServiceSection").then((m) => m.ServiceSection), { ssr: true });
const JourneyPlanSection = dynamic(() => import("@/components/shared/journeyPlan/JourneyPlanSection").then((m) => m.JourneyPlanSection), { ssr: true });
const ProgramsSection = dynamic(() => import("@/components/shared/programs/ProgramsSection").then((m) => m.ProgramsSection), { ssr: true });
const LatestArticlesSection = dynamic(() => import("@/components/home/artical/LatestArticlesSection").then((m) => m.LatestArticlesSection), { ssr: true });
const WhyChooseSection = dynamic(() => import("@/components/home/WhyChooseMe/WhyChooseSection").then((m) => m.WhyChooseSection), { ssr: true });
const OurPartners = dynamic(() => import("@/components/shared/partners/Partners").then((m) => m.OurPartners), { ssr: true });
const FeaturesBanner = dynamic(() => import("@/components/home/features/FeaturesBanner").then((m) => m.FeaturesBanner), { ssr: true });
const Certificationssection = dynamic(() => import("@/components/home/certifications/Certificationssection").then((m) => m.Certificationssection), { ssr: true });
const FaqSection = dynamic(() => import("@/components/shared/FaqSection").then((m) => m.FaqSection), { ssr: true });
const OurStory = dynamic(() => import("@/components/shared/OurStory").then((m) => m.OurStory), { ssr: true });
const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });
const DentistSection = dynamic(() => import("@/components/home/dentist/dentistSection").then((m) => m.DentistSection), { ssr: true });
const ConsultationsDoctorSection = dynamic(() => import("@/components/home/consultations/ConsultationsDoctorSection").then((m) => m.ConsultationsDoctorSection), {
  ssr: true,
});
const SpecialtiesSection = dynamic(() => import("@/components/home/specialties/SpecialtiesSection").then((m) => m.DoctorsSection), { ssr: true });
const OurDoctorsSection = dynamic(() => import("@/components/shared/ourDoctors/OurDoctorsSection").then((m) => m.OurDoctorsSection), { ssr: true });
const MedicalCenterSection = dynamic(() => import("@/components/shared/medicalCanter/MedicalCenterSection").then((m) => m.MedicalCenterSection), { ssr: true });

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Tashafy - Home",
  description: "Home page of Tashafy",
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const services = getOurServices(t, locale);
  const partners = getOurPartners(t);
  const features = getFeatures(t);
  const certifications = getCertifications(t);
  const faqItems = getFaqItems(t);
  const ourStoryStats = getOurStoryStats(t);
  const whyChooseFeatures = getWhyChooseFeatures(t);
  const whyChooseStats = getWhyChooseStats(t);
  const articles = getArticles(t);
  const programs = getPrograms(t, locale);
  const startJourneySteps = getStartJourneySteps(t);
  const testimonials = getTestimonials(t);
  const destinations = getDestinations(t);
  const consultationsDoctors = getConsultationsDoctors(t);
  const ourDoctors = getOurDoctors(t);
  const medicalCenterCategories = getMedicalCenters(t);
  const specialties = getSpecialties(t);
  const cmsPage = await fetchPublicPage("home", locale);
  const appSettings = await getFrontendAppSettings();
  const heroSection = getCmsSection<{ motto?: string; heading?: string }>(cmsPage, "hero");
  const servicesSection = getCmsSection<{ title?: string; subtitle?: string }>(cmsPage, "services");
  const journeySection = getCmsSection<{ title?: string; subtitle?: string; buttonHref?: string }>(cmsPage, "journey");
  const heroMotto = heroSection?.motto || t("hero.motto");
  const heroHeading = heroSection?.heading || t("hero.heading");
  const servicesTitle = servicesSection?.title || t("services.title");
  const servicesSubtitle = servicesSection?.subtitle || t("services.subtitle");

  return (
    <main className="flex flex-col items-center">
      <MainSection
        locale={locale}
        labels={labels}
        motto={heroMotto}
        heading={heroHeading}
        searchPlaceholder={t("nav.searchPlaceholder")}
        loadingLabel={t("common.loading")}
        logoNavAr={appSettings.logoNavAr}
        logoNavEn={appSettings.logoNavEn}
      />

      <StickyNavbar
        locale={locale}
        labels={labels}
        searchPlaceholder={t("nav.searchPlaceholder")}
        loadingLabel={t("common.loading")}
        logoAr={appSettings.logoAr}
        logoEn={appSettings.logoEn}
      />

      <ServiceSection locale={locale} title={servicesTitle} subtitle={servicesSubtitle} services={services} learnMoreLabel={t("services.learnMore")} />

      <OurStory locale={locale} title={t("ourStory.title")} subtitle={t("ourStory.subtitle")} stats={ourStoryStats} />

      <MedicalCenterSection
        locale={locale}
        title={t("medicalCenters.title")}
        subtitle={t("medicalCenters.subtitle")}
        filterPlaceholder={t("medicalCenters.filterPlaceholder")}
        startsFromLabel={t("medicalCenters.startsFrom")}
        categories={medicalCenterCategories}
      />

      <ConsultationsDoctorSection
        locale={locale}
        title={t("doctors.title")}
        subtitle={t("doctors.subtitle")}
        highlightTag={t("doctors.highlightTag")}
        bookNowLabel={t("doctors.bookNowLabel")}
        consultationsDoctors={consultationsDoctors}
      />

      <ProgramsSection
        locale={locale}
        title={t("programs.title")}
        subtitle={t("programs.subtitle")}
        programs={programs}
        bookLabel={t("programs.bookLabel")}
        bestSellerLabel={t("programs.bestSeller")}
      />

      <DentistSection
        locale={locale}
        title={t("destinations.title")}
        subtitle={t("destinations.subtitle")}
        centersLabel={t("destinations.centersLabel")}
        destinations={destinations}
      />

      <SpecialtiesSection locale={locale} title={t("specialties.title")} subtitle={t("specialties.subtitle")} specialties={specialties} />

      <OurPartners locale={locale} title={t("partners.title")} subtitle={t("partners.subtitle")} partners={partners} />

      <OurDoctorsSection locale={locale} title={t("ourDoctors.title")} subtitle={t("ourDoctors.subtitle")} doctors={ourDoctors} />

      <JourneyPlanSection
        locale={locale}
        title={t("recoveryJourney.title")}
        subtitle={t("recoveryJourney.subtitle")}
        steps={startJourneySteps}
        ctaTitle={t("recoveryJourney.cta.title")}
        ctaSubtitle={t("recoveryJourney.cta.subtitle")}
        ctaButtonLabel={t("recoveryJourney.cta.button")}
        ctaButtonHref="https://wa.me/1234567890"
      />

      <TestmoialsSection
        locale={locale}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        durationLabel={t("testimonials.durationLabel")}
        countryLabel={t("testimonials.countryLabel")}
        testimonials={testimonials}
      />

      <Certificationssection locale={locale} title={t("certifications.title")} subtitle={t("certifications.subtitle")} certifications={certifications} />

      <FeaturesBanner locale={locale} features={features} />

      <WhyChooseSection
        locale={locale}
        title={t("whyChoose.title")}
        subtitle={t("whyChoose.subtitle")}
        features={whyChooseFeatures}
        stats={whyChooseStats}
        ctaPrimary={t("whyChoose.ctaPrimary")}
        ctaSecondary={t("whyChoose.ctaSecondary")}
        ctaPrimaryHref={`/${locale}`}
        ctaSecondaryHref={`/${locale}`}
      />

      <LatestArticlesSection
        locale={locale}
        title={t("articles.title")}
        subtitle={t("articles.subtitle")}
        viewAllLabel={t("articles.viewAll")}
        viewAllHref={`/${locale}/blog`}
        readMoreLabel={t("articles.readMore")}
        articles={articles}
      />

      <FaqSection locale={locale} title={t("faq.title")} intro={t("faq.intro")} items={faqItems} />

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
