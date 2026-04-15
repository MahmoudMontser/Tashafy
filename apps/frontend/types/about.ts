import type { consultationsDoctorItem } from "@/types/global";

export type AboutUsHeroContent = {
  tagline: string;
  /** e.g. domain under logo, accent color */
  brandSubline: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  logoAlt: string;
};

export type AboutUsVisionContent = {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutUsMissionContent = {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutUsCoreValueItem = {
  iconSrc: string;
  iconSize?: number;
  title: string;
  description: string;
};

export type AboutUsCoreValuesContent = {
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  items: AboutUsCoreValueItem[];
};

export type AboutUsCeoContent = {
  message: string;
  callout: string;
  sectionTitle: string;
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
};

export type AboutUsServiceCard = {
  title: string;
  description: string;
};

export type AboutUsServicesContent = {
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  cards: AboutUsServiceCard[];
};

/** Shared doctors strip — `OurDoctorsSection`. */
export type AboutUsOurDoctorsContent = {
  title: string;
  subtitle: string;
  doctors: consultationsDoctorItem[];
};

/** Closing CTA — `JourneySection`. */
export type AboutUsJourneyContent = {
  title: string;
  subtitle: string;
  primaryCardTitle: string;
  primaryCardSubtitle: string;
  healthyLifeLabel: string;
  transparentPricesLabel: string;
  buttonLabel: string;
  buttonHref: string;
};

/** Nav copy used by hero + sticky navbar on about-us. */
export type AboutUsNavCopy = {
  searchPlaceholder: string;
  loadingLabel: string;
};

/** Data bundle for `/[locale]/about-us`. */
export type AboutUsPageContent = {
  nav: AboutUsNavCopy;
  hero: AboutUsHeroContent;
  vision: AboutUsVisionContent;
  mission: AboutUsMissionContent;
  coreValues: AboutUsCoreValuesContent;
  ceo: AboutUsCeoContent;
  services: AboutUsServicesContent;
  ourDoctors: AboutUsOurDoctorsContent;
  journey: AboutUsJourneyContent;
};
