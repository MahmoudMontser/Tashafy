import { getProgramDetailBody, getProgramDetailHero, getProgramDetailJourneySectionContent, getProgramDetailPageSections } from "@/data/programs";
import { getNavAndFooterLabels } from "@/data/global";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });
const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const ContentContainer = dynamic(() => import("@/components/programs/contentSection/contentContainer").then((m) => m.default), { ssr: true });

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const { t } = getTranslations(locale);
  const hero = getProgramDetailHero(id, t);
  if (!hero) {
    return { title: "Tashafy - Programs" };
  }
  return {
    title: `Tashafy - ${hero.centerName}`,
    description: t("programs.detail.metaDescription"),
  };
}

export default async function TashafyProgramsDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  const { t } = getTranslations(locale);

  const detailBody = getProgramDetailBody(id, t);
  if (!detailBody) notFound();

  const { labels } = getNavAndFooterLabels(t);
  const pageSections = getProgramDetailPageSections(t);
  const journey = getProgramDetailJourneySectionContent(t);

  return (
    <main className="flex flex-col items-center pt-16 pt-18">
      <StickyNavbar alwaysVisible locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <ContentContainer locale={locale} detail={detailBody} testimonialsAndFaq={pageSections} />

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
