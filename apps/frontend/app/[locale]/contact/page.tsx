import { JourneySection } from "@/components/shared/journey/JourneySection";
import type { Metadata } from "next";
import { getTranslations } from "@/lib/localization/i18n-server";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import { StickyNavbar } from "@/components/shared/navbar/StickyNavbar";
import { getNavAndFooterLabels } from "@/data/global";
import { getContactPageContent } from "@/data/contact";
import ContanFormLayout from "@/components/contact/ContanFormLayout";
import { fetchPublicPage, getCmsSection } from "@/lib/cms";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  return {
    title: t("contact.meta.title"),
    description: t("contact.meta.description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const pageContent = getContactPageContent(t);
  const cmsPage = await fetchPublicPage("contact", locale);
  const heroSection = getCmsSection<{ title?: string; subtitle?: string }>(cmsPage, "hero");
  const journeySection = getCmsSection<{ title?: string; subtitle?: string; buttonHref?: string }>(cmsPage, "journey");
  if (heroSection) {
    pageContent.hero.title = heroSection.title || pageContent.hero.title;
    pageContent.hero.subtitle = heroSection.subtitle || pageContent.hero.subtitle;
  }
  if (journeySection) {
    pageContent.journey.title = journeySection.title || pageContent.journey.title;
    pageContent.journey.subtitle = journeySection.subtitle || pageContent.journey.subtitle;
    pageContent.journey.buttonHref = journeySection.buttonHref || pageContent.journey.buttonHref;
  }
  const { nav, journey } = pageContent;
  return (
    <main className="flex flex-col items-center">
      <ContactHeroSection locale={locale} labels={labels} hero={pageContent.hero} searchPlaceholder={nav.searchPlaceholder} loadingLabel={nav.loadingLabel} />
      <StickyNavbar locale={locale} labels={labels} searchPlaceholder={nav.searchPlaceholder} loadingLabel={nav.loadingLabel} />

      <ContanFormLayout locale={locale} content={pageContent.section} result={pageContent.result} />

      <JourneySection
        locale={locale}
        title={journey.title}
        subtitle={journey.subtitle}
        primaryCardTitle={journey.primaryCardTitle}
        primaryCardSubtitle={journey.primaryCardSubtitle}
        healthyLifeLabel={journey.healthyLifeLabel}
        transparentPricesLabel={journey.transparentPricesLabel}
        buttonLabel={journey.buttonLabel}
        buttonHref={journey.buttonHref}
      />
    </main>
  );
}
