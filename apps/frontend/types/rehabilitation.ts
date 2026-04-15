import type { consultationsDoctorItem, FaqItem, MedicalCenterCategory, TestimonialItem } from "./global";

export type RehabilitationMedicalCentersContent = {
  title: string;
  subtitle: string;
  filterPlaceholder: string;
  startsFromLabel: string;
  categories: MedicalCenterCategory[];
};

export type RehabilitationServiceItem = {
  title: string;
  description: string;
  icon: "neuro" | "sports" | "postOp" | "physical";
};

export type RehabilitationServicesSectionContent = {
  title: string;
  subtitle: string;
  items: RehabilitationServiceItem[];
};

export type RehabilitationCenterHeroContent = {
  slides: string[];
  centerName: string;
  badgeLabel: string;
  location: string;
  rating: string;
  reviewsLabel: string;
};

export type RehabilitationDetailFacilityIcon = "parking" | "cafeteria" | "accessibility" | "wifi" | "gym" | "therapy";

export type RehabilitationDetailFacilityItem = {
  icon: RehabilitationDetailFacilityIcon;
  title: string;
  description: string;
};

export type RehabilitationDetailSidebarContent = {
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
};

export type RehabilitationDetailMainContent = {
  aboutTitle: string;
  aboutParagraphs: string[];
  specialtiesTitle: string;
  specialtiesSubtitle: string;
  specialtyTags: string[];
  facilitiesTitle: string;
  facilitiesSubtitle: string;
  facilities: RehabilitationDetailFacilityItem[];
  packagesSection?: RehabilitationDetailPackagesSection;
};

export type RehabilitationDetailPackagePlan = {
  priceFormatted: string;
  durationWeeksLabel: string;
  sessionsCountLabel: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  isHighlighted?: boolean;
};

export type RehabilitationDetailPackagesSection = {
  title: string;
  subtitle: string;
  includesLabel: string;
  plans: RehabilitationDetailPackagePlan[];
};

export type RehabilitationDetailBodyContent = {
  sidebar: RehabilitationDetailSidebarContent;
  main: RehabilitationDetailMainContent;
};

export type RehabilitationPageSectionsContent = {
  services: RehabilitationServicesSectionContent;
  doctors: {
    title: string;
    subtitle: string;
    doctors: consultationsDoctorItem[];
  };
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
