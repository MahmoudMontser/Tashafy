/** Navbar label keys and link item type */
export type NavLabels = {
  home: string;
  rehabilitation: string;
  wellness: string;
  tashafyPrograms: string;
  blog: string;
  aboutUs: string;
  contactUs: string;
  freeConsultation: string;
};

export type NavItem = { key: keyof NavLabels; path: string };

/** Footer label keys and link item type */
export type FooterLabels = {
  tagline: string;
  copyright: string;
  mainTitle: string;
  aboutUs: string;
  legal: string;
  rehabilitation: string;
  tashafyPrograms: string;
  medicalTravel: string;
  checkupPackages: string;
  ourDoctors: string;
  blog: string;
  contactUs: string;
  faq: string;
  termsOfUse: string;
  privacyPolicy: string;
  email: string;
  facebook: string;
  x: string;
  instagram: string;
};

export type FooterNavItem = { key: keyof FooterLabels; path: string };

export type FooterColumnProps = {
  title: string;
  links: FooterNavItem[];
  locale: string;
  labels: FooterLabels;
};

export type FooterProps = {
  locale: string;
  labels: FooterLabels;
  settings?: {
    siteName?: string;
    tagline?: string;
    logoAr?: string;
    logoEn?: string;
    contactEmail?: string;
    socialFacebook?: string;
    socialX?: string;
    socialInstagram?: string;
  };
};

export type TestimonialItem = {
  name: string;
  role: string;
  avatar: string;
  avatarBgClass: string;
  quote: string;
  duration: string;
  location: string;
};

export type PartnerItem = {
  name: string;
  logo: string;
  href?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type MedicalCenterItem = {
  image: string;
  /** Display badge (i18n). */
  badgeLabel: string;
  /**
   * Stable id for `[id]` detail routes (e.g. rehabilitation/0, wellness/wellness.0).
   * Aligns with the translation key used for this card’s badge/name block.
   */
  detailId: string;
  priceFormatted: string;
  centerName: string;
  rating: string;
  location: string;
  serviceTags: string[];
  learnAboutLabel: string;
  /** Legacy query-style href without locale; prefer `detailId` + category `detailsSegment`. */
  learnAboutHref: string;
};

export type MedicalCenterCategory = {
  categoryName: string;
  viewAllLabel: string;
  viewAllHref: string;
  learnAboutHref: string;
  /** When set, “Learn about” links to `/${locale}/${detailsSegment}/${detailId}`. */
  detailsSegment?: string;
  centers: MedicalCenterItem[];
};

export type OurStoryStat = {
  value: string;
  label: string;
};

export type consultationsDoctorItem = {
  name: string;
  image: string;
  experience: string;
  specialization: string;
  recommendationText?: string;
  bookButtonLabel: string;
};
