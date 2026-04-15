import type { AboutUsCoreValueItem, AboutUsPageContent, AboutUsServiceCard } from "@/types/about";
import { getOurDoctors } from "@/data/home";

const ABOUT_HERO_IMAGE = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80";

const ABOUT_PAGE_CTA_HREF = "https://wa.me/1234567890";

const ABOUT_VISION_IMAGE = "/about/vision-photo.jpg";
const ABOUT_MISSION_IMAGE = "/about/mission-photo.jpg";

function coreValueItems(t: (key: string) => string, isRtl: boolean): AboutUsCoreValueItem[] {
  const quality: AboutUsCoreValueItem = {
    iconSrc: "/about/core-values-icon-medal.svg",
    title: t("about.coreValues.quality.title"),
    description: t("about.coreValues.quality.description"),
  };
  const transparency: AboutUsCoreValueItem = {
    iconSrc: "/about/core-values-icon-tag.svg",
    iconSize: 30,
    title: t("about.coreValues.transparency.title"),
    description: t("about.coreValues.transparency.description"),
  };
  const patient: AboutUsCoreValueItem = {
    iconSrc: "/about/core-values-icon-smile.svg",
    iconSize: 34,
    title: t("about.coreValues.patient.title"),
    description: t("about.coreValues.patient.description"),
  };
  return isRtl ? [patient, transparency, quality] : [quality, transparency, patient];
}

function serviceCards(t: (key: string) => string, isRtl: boolean): AboutUsServiceCard[] {
  const support: AboutUsServiceCard = {
    title: t("about.services.support.title"),
    description: t("about.services.support.description"),
  };
  const travel: AboutUsServiceCard = {
    title: t("about.services.travel.title"),
    description: t("about.services.travel.description"),
  };
  const centers: AboutUsServiceCard = {
    title: t("about.services.centers.title"),
    description: t("about.services.centers.description"),
  };
  const referral: AboutUsServiceCard = {
    title: t("about.services.referral.title"),
    description: t("about.services.referral.description"),
  };
  return isRtl ? [referral, centers, travel, support] : [support, travel, centers, referral];
}

export function getAboutUsPageContent(t: (key: string) => string, locale: string): AboutUsPageContent {
  const isRtl = locale === "ar";

  return {
    nav: {
      searchPlaceholder: t("nav.searchPlaceholder"),
      loadingLabel: t("common.loading"),
    },
    hero: {
      tagline: t("about.hero.tagline"),
      brandSubline: t("about.hero.brandSubline"),
      backgroundImageSrc: ABOUT_HERO_IMAGE,
      backgroundImageAlt: t("about.hero.backgroundAlt"),
      logoAlt: t("about.hero.logoAlt"),
    },
    vision: {
      label: t("about.vision.label"),
      title: t("about.vision.title"),
      description: t("about.vision.description"),
      imageSrc: ABOUT_VISION_IMAGE,
      imageAlt: t("about.vision.imageAlt"),
    },
    mission: {
      label: t("about.mission.label"),
      title: t("about.mission.title"),
      description: t("about.mission.description"),
      bullets: [t("about.mission.bullet1"), t("about.mission.bullet2"), t("about.mission.bullet3"), t("about.mission.bullet4")],
      ctaLabel: t("about.mission.cta"),
      ctaHref: ABOUT_PAGE_CTA_HREF,
      imageSrc: ABOUT_MISSION_IMAGE,
      imageAlt: t("about.mission.imageAlt"),
    },
    coreValues: {
      titleHighlight: t("about.coreValues.titleHighlight"),
      titleRest: t("about.coreValues.titleRest"),
      subtitle: t("about.coreValues.subtitle"),
      items: coreValueItems(t, isRtl),
    },
    ceo: {
      message: t("about.ceo.message"),
      callout: t("about.ceo.callout"),
      sectionTitle: t("about.ceo.sectionTitle"),
      name: t("about.ceo.name"),
      role: t("about.ceo.role"),
      avatarSrc: "/about/ceo-avatar.png",
      avatarAlt: t("about.ceo.avatarAlt"),
    },
    services: {
      titleHighlight: t("about.services.titleHighlight"),
      titleRest: t("about.services.titleRest"),
      subtitle: t("about.services.subtitle"),
      cards: serviceCards(t, isRtl),
    },
    ourDoctors: {
      title: t("ourDoctors.title"),
      subtitle: t("ourDoctors.subtitle"),
      doctors: getOurDoctors(t),
    },
    journey: {
      title: t("recoveryJourney.cta.title"),
      subtitle: t("recoveryJourney.cta.subtitle"),
      primaryCardTitle: t("whyChoose.features.accreditedCenters.title"),
      primaryCardSubtitle: t("whyChoose.features.accreditedCenters.subtitle"),
      healthyLifeLabel: t("journey.healthyLife"),
      transparentPricesLabel: t("whyChoose.features.transparentPrices.title"),
      buttonLabel: t("recoveryJourney.cta.button"),
      buttonHref: ABOUT_PAGE_CTA_HREF,
    },
  };
}
