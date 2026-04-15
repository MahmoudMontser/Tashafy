import type { FaqItem, PartnerItem, TestimonialItem } from "./global";
import type { WellnessCenterHeroContent, WellnessDetailBodyContent, WellnessPageSectionsContent } from "./welness";

export type ProgramDetailAboutContent = {
  aboutTitle: string;
  aboutParagraphs: string[];
};

/** `ProgramDetailServiceCard` — services / inclusion list for program detail. */
export type ProgramDetailServicesContent = {
  title: string;
  subtitle: string;
  items: string[];
};

export type ProgramDetailSidebarContent = {
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

/** Route segment for `/tashafy-programs/[id]` — must match `getPrograms` entries. */
export type ProgramDetailRouteId = "integrated" | "comprehensive" | "genetic";

/** Program card on home and Tashafy programs listing. */
export type ProgramItem = {
  id: ProgramDetailRouteId;
  title: string;
  price: string;
  duration: string;
  summary?: string;
  features: string[];
  image: string;
  bestSeller?: boolean;
  href: string;
};

export type ProgramDetailHeroContent = WellnessCenterHeroContent;

export type ProgramTestsAnalysesCategoryVariant = "analysis" | "test";

export type ProgramTestsAnalysesSubItem = {
  title: string;
  description: string;
};

export type ProgramTestsAnalysesCategory = {
  id: string;
  title: string;
  countBadge: string;
  variant: ProgramTestsAnalysesCategoryVariant;
  subItems?: ProgramTestsAnalysesSubItem[];
};

export type ProgramTestsAnalysesContent = {
  title: string;
  subtitle: string;
  analysesSummaryBadge: string;
  testsSummaryBadge: string;
  categories: ProgramTestsAnalysesCategory[];
};

export type ProgramLabsLogo = {
  src: string;
  alt: string;
};

export type ProgramLabsContent = {
  title: string;
  subtitle: string;
  logos: ProgramLabsLogo[];
};

export type ProgramDetailMainExtras = {
  heroImageSrc: string;
  heroImageAlt: string;
  heroBadgeLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  testsAnalyses: ProgramTestsAnalysesContent;
  labs: ProgramLabsContent;
};

/** Main + sidebar for program detail — reuses wellness-shaped `main` for shared types; UI reads `programAbout` + `programServices`. */
export type ProgramDetailBodyContent = WellnessDetailBodyContent & {
  programAbout: ProgramDetailAboutContent;
  programServices: ProgramDetailServicesContent;
  programExtras?: ProgramDetailMainExtras;
};

/** Testimonials + FAQ block below the detail column. */
export type ProgramDetailPageSectionsContent = Pick<WellnessPageSectionsContent, "testimonials" | "faq">;

/** Props for `JourneySection` on program detail. */
export type ProgramDetailJourneySectionContent = {
  title: string;
  subtitle: string;
  primaryCardTitle: string;
  primaryCardSubtitle: string;
  healthyLifeLabel: string;
  transparentPricesLabel: string;
  buttonLabel: string;
  buttonHref: string;
};

export type JourneyStepIcon = "search" | "phone" | "briefcase" | "tag";

export type JourneyStep = {
  label: string;
  description: string;
  icon: JourneyStepIcon;
  iconBgClass?: string;
  iconColorClass?: string;
};

export type ProgramsHeroStat = {
  value: string;
  label: string;
};

export type ProgramsPageHeroContent = {
  title: string;
  tagline: string;
  description: string;
  stats: ProgramsHeroStat[];
  ctaLabel: string;
  ctaHref: string;
  heroImageSrc: string;
  heroImageAlt: string;
};

/** Programs grid section copy + list. */
export type ProgramsPageProgramsBlock = {
  title: string;
  subtitle: string;
  bookLabel: string;
  bestSellerLabel: string;
  programs: ProgramItem[];
};

/** FAQ block for the programs page. */
export type ProgramsPageFaqContent = {
  title: string;
  intro: string;
  items: FaqItem[];
};

/** Partners strip on `/tashafy-programs`. */
export type ProgramsPagePartnersBlock = {
  title: string;
  subtitle: string;
  partners: PartnerItem[];
};

export type ProgramsPageTestimonialsBlock = {
  title: string;
  subtitle: string;
  durationLabel: string;
  countryLabel: string;
  testimonials: TestimonialItem[];
};

export type ProgramsWhyImportantIcon = "check" | "dna" | "chart" | "ok";

export type ProgramsPageWhyImportantContent = {
  title: string;
  description: string;
  bullets: { label: string; icon: ProgramsWhyImportantIcon }[];
  imageSrc: string;
  imageAlt: string;
};
