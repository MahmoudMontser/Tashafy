import type { FaqItem, TestimonialItem } from "./global";

export type WellnessAchievementStat = {
  value: string;
  label: string;
};

export type WellnessAchievementContent = {
  title: string;
  subtitle: string;
  stats: WellnessAchievementStat[];
};

export type WellnessServiceItem = {
  title: string;
  description: string;
  icon: "nutrition" | "relaxation" | "hydrotherapy" | "fitness";
};

export type WellnessServicesSectionContent = {
  title: string;
  subtitle: string;
  items: WellnessServiceItem[];
};

export type WellnessDetailFacilityIcon = "parking" | "cafeteria" | "accessibility" | "wifi" | "gym" | "therapy";

export type WellnessDetailFacilityItem = {
  icon: WellnessDetailFacilityIcon;
  title: string;
  description: string;
};

export type WellnessDetailSidebarContent = {
  centerName: string;
  startsFromLabel: string;
  priceFormatted: string;
  currencySuffix: string;
  perSessionLabel: string;
  locationLabel: string;
  locationLine: string;
  ratingLabel: string;
  rating: string;
  whatsappLabel: string;
  contactLabel: string;
  whatsappHref: string;
  phoneHref: string;
  packageFeatures?: string[];
};

/** Full services list block (wellness detail main column). */
export type WellnessDetailServicesSection = {
  title: string;
  subtitle: string;
  items: string[];
};

export type WellnessDetailExclusiveFeaturesNote = {
  emphasis: string;
  description: string;
};

/** Tashafy exclusive perks block (wellness detail main column). */
export type WellnessDetailExclusiveFeaturesSection = {
  title: string;
  subtitle: string;
  items: string[];
  note: WellnessDetailExclusiveFeaturesNote;
};

export type WellnessDetailMainContent = {
  aboutTitle: string;
  aboutParagraphs: string[];
  specialtiesTitle: string;
  specialtiesSubtitle: string;
  specialtyTags: string[];
  facilitiesTitle: string;
  facilitiesSubtitle: string;
  facilities: WellnessDetailFacilityItem[];
  servicesSection: WellnessDetailServicesSection;
  exclusiveFeaturesSection: WellnessDetailExclusiveFeaturesSection;
  packagesSection?: WellnessDetailPackagesSection;
};

export type WellnessDetailPackagePlan = {
  planTitle: string;
  priceFormatted: string;
  durationWeeksLabel: string;
  detailsLine: string;
  ctaLabel: string;
  ctaHref: string;
};

export type WellnessDetailPackagesSection = {
  title: string;
  subtitle: string;
  plans: WellnessDetailPackagePlan[];
};

export type WellnessDetailBodyContent = {
  sidebar: WellnessDetailSidebarContent;
  main: WellnessDetailMainContent;
};

/** Hero / top gallery for a wellness center detail route (`/wellness/[id]`). */
export type WellnessCenterHeroContent = {
  slides: string[];
  centerName: string;
  badgeLabel: string;
  location: string;
  rating: string;
  reviewsLabel: string;
};

/** Sections rendered below the detail body (testimonials + FAQ). */
export type WellnessPageSectionsContent = {
  testimonials: {
    title: string;
    subtitle: string;
    durationLabel: string;
    countryLabel: string;
    testimonials: TestimonialItem[];
  };
  faq: {
    title: string;
    intro: string;
    items: FaqItem[];
  };
};
