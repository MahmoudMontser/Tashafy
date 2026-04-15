import type { FaqItem, PartnerItem, TestimonialItem } from "@/types/global";
import type { WellnessDetailFacilityIcon } from "@/types/welness";
import type {
  JourneyStep,
  ProgramDetailAboutContent,
  ProgramDetailBodyContent,
  ProgramDetailHeroContent,
  ProgramDetailJourneySectionContent,
  ProgramDetailMainExtras,
  ProgramDetailPageSectionsContent,
  ProgramDetailRouteId,
  ProgramDetailServicesContent,
  ProgramItem,
  ProgramLabsContent,
  ProgramTestsAnalysesContent,
  ProgramsPageFaqContent,
  ProgramsPageHeroContent,
  ProgramsPagePartnersBlock,
  ProgramsPageProgramsBlock,
  ProgramsPageTestimonialsBlock,
  ProgramsPageWhyImportantContent,
} from "@/types/programs";

const PROGRAM_DETAIL_IDS: readonly ProgramDetailRouteId[] = ["integrated", "comprehensive", "genetic"];

function isProgramDetailId(id: string): id is ProgramDetailRouteId {
  return (PROGRAM_DETAIL_IDS as readonly string[]).includes(id);
}

/** Maps program slug → rehabilitation detail template index (shared i18n under `rehabilitation.detail.{n}.*`). */
const PROGRAM_DETAIL_TO_TPL: Record<ProgramDetailRouteId, string> = {
  integrated: "0",
  comprehensive: "1",
  genetic: "2",
};

const PROGRAM_DETAIL_FACILITY_ICONS: WellnessDetailFacilityIcon[] = ["parking", "cafeteria", "accessibility", "wifi", "gym", "therapy"];

const PROGRAM_DETAIL_WHATSAPP_E164: Record<ProgramDetailRouteId, string> = {
  integrated: "966601111111",
  comprehensive: "966601111112",
  genetic: "966601111113",
};

const PROGRAM_DETAIL_PHONE_TEL: Record<ProgramDetailRouteId, string> = {
  integrated: "+966112345670",
  comprehensive: "+966112345671",
  genetic: "+966112345672",
};

const PROGRAM_DETAIL_IMAGE: Record<ProgramDetailRouteId, string> = {
  integrated: "/service1.svg",
  comprehensive: "/service2.svg",
  genetic: "/service3.svg",
};

const PROGRAM_DETAIL_LAB_HERO_IMAGE =
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80";

export function getPrograms(t: (key: string) => string, locale: string): ProgramItem[] {
  return [
    {
      id: "integrated",
      title: t("programs.integrated.title"),
      price: t("programs.integrated.price"),
      duration: t("programs.integrated.duration"),
      summary: t("programs.integrated.summary"),
      features: [t("programs.integrated.f1"), t("programs.integrated.f2"), t("programs.integrated.f3")],
      image: PROGRAM_DETAIL_IMAGE.integrated,
      href: `/${locale}/tashafy-programs/integrated`,
    },
    {
      id: "comprehensive",
      title: t("programs.comprehensive.title"),
      price: t("programs.comprehensive.price"),
      duration: t("programs.comprehensive.duration"),
      summary: t("programs.comprehensive.summary"),
      features: [t("programs.comprehensive.f1"), t("programs.comprehensive.f2"), t("programs.comprehensive.f3")],
      image: PROGRAM_DETAIL_IMAGE.comprehensive,
      bestSeller: true,
      href: `/${locale}/tashafy-programs/comprehensive`,
    },
    {
      id: "genetic",
      title: t("programs.genetic.title"),
      price: t("programs.genetic.price"),
      duration: t("programs.genetic.duration"),
      summary: t("programs.genetic.summary"),
      features: [t("programs.genetic.f1"), t("programs.genetic.f2"), t("programs.genetic.f3"), t("programs.genetic.f4")],
      image: PROGRAM_DETAIL_IMAGE.genetic,
      href: `/${locale}/tashafy-programs/genetic`,
    },
  ];
}

export function getProgramDetailHero(rawId: string, t: (key: string) => string): ProgramDetailHeroContent | null {
  const id = decodeURIComponent(rawId);
  if (!isProgramDetailId(id)) return null;

  const image = PROGRAM_DETAIL_IMAGE[id];
  const slides = [image, image, image];

  return {
    slides,
    centerName: t(`programs.${id}.title`),
    badgeLabel: t("programs.detail.badgeLabel"),
    location: t("programs.detail.locationLine"),
    rating: t("programs.detail.ratingValue"),
    reviewsLabel: t("wellness.detail.reviewsLabel"),
  };
}

function buildProgramDetailAboutContent(id: ProgramDetailRouteId, t: (key: string) => string): ProgramDetailAboutContent {
  const tpl = PROGRAM_DETAIL_TO_TPL[id];
  return {
    aboutTitle: t("programs.detail.about.title"),
    aboutParagraphs: [1, 2, 3].map((n) => t(`rehabilitation.detail.${tpl}.aboutP${n}`)),
  };
}

function buildProgramDetailServicesContent(t: (key: string) => string): ProgramDetailServicesContent {
  return {
    title: t("programs.detail.services.title"),
    subtitle: t("programs.detail.services.subtitle"),
    items: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => t(`wellness.detail.services.items.${i}`)),
  };
}

export function getProgramDetailBody(rawId: string, t: (key: string) => string): ProgramDetailBodyContent | null {
  const id = decodeURIComponent(rawId);
  if (!isProgramDetailId(id)) return null;

  const tpl = PROGRAM_DETAIL_TO_TPL[id];
  const programTitle = t(`programs.${id}.title`);
  const wa = PROGRAM_DETAIL_WHATSAPP_E164[id];
  const whatsappHref = `https://wa.me/${wa}?text=${encodeURIComponent(programTitle)}`;

  const facilities = PROGRAM_DETAIL_FACILITY_ICONS.map((icon, i) => ({
    icon,
    title: t(`rehabilitation.detail.${tpl}.facility${i}.title`),
    description: t(`rehabilitation.detail.${tpl}.facility${i}.desc`),
  }));

  const specialtyTags = [0, 1, 2, 3, 4, 5].map((i) => t(`rehabilitation.detail.${tpl}.specialty${i}`));

  return {
    sidebar: {
      centerName: programTitle,
      startsFromLabel: t("medicalCenters.startsFrom"),
      priceFormatted: t(`programs.${id}.price`),
      currencySuffix: t("rehabilitation.detail.currencySuffix"),
      perSessionLabel: t("programs.detail.sidebar.perPackageLabel"),
      locationLabel: t("rehabilitation.detail.locationLabel"),
      locationLine: t(`rehabilitation.detail.${tpl}.sidebarLocation`),
      ratingLabel: t(`rehabilitation.detail.${tpl}.ratingClientsLabel`),
      rating: t("programs.detail.ratingValue"),
      whatsappLabel: t("rehabilitation.detail.whatsappCta"),
      contactLabel: t("rehabilitation.detail.contactCta"),
      whatsappHref,
      phoneHref: `tel:${PROGRAM_DETAIL_PHONE_TEL[id].replace(/\s/g, "")}`,
      packageFeatures: [0, 1, 2, 3].map((i) => t(`programs.detail.sidebar.features.${id}.${i}`)),
    },
    main: {
      aboutTitle: t("rehabilitation.detail.aboutTitle"),
      aboutParagraphs: [1, 2, 3].map((n) => t(`rehabilitation.detail.${tpl}.aboutP${n}`)),
      specialtiesTitle: t("rehabilitation.detail.specialtiesTitle"),
      specialtiesSubtitle: t(`rehabilitation.detail.${tpl}.specialtiesSubtitle`),
      specialtyTags,
      facilitiesTitle: t("rehabilitation.detail.facilitiesTitle"),
      facilitiesSubtitle: t(`rehabilitation.detail.${tpl}.facilitiesSubtitle`),
      facilities,
      packagesSection: {
        title: t("wellness.detail.packages.title"),
        subtitle: t(`rehabilitation.detail.${tpl}.packagesSubtitle`),
        plans: [0, 1, 2].map((planIndex) => ({
          planTitle: t(`wellness.detail.packages.plans.${planIndex}.planTitle`),
          priceFormatted: t(`rehabilitation.detail.packages.plan${planIndex}.price`),
          durationWeeksLabel: t(`rehabilitation.detail.packages.plan${planIndex}.weeks`),
          detailsLine: t(`wellness.detail.packages.plans.${planIndex}.detailsLine`),
          ctaLabel: t("rehabilitation.detail.packagesCta"),
          ctaHref: whatsappHref,
        })),
      },
      servicesSection: {
        title: t("wellness.detail.services.title"),
        subtitle: t("wellness.detail.services.subtitle"),
        items: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => t(`wellness.detail.services.items.${i}`)),
      },
      exclusiveFeaturesSection: {
        title: t("wellness.detail.exclusive.title"),
        subtitle: t("wellness.detail.exclusive.subtitle"),
        items: [0, 1, 2, 3, 4, 5, 6].map((i) => t(`wellness.detail.exclusive.items.${i}`)),
        note: {
          emphasis: t("wellness.detail.exclusive.noteEmphasis"),
          description: t("wellness.detail.exclusive.noteDescription"),
        },
      },
    },
    programAbout: buildProgramDetailAboutContent(id, t),
    programServices: buildProgramDetailServicesContent(t),
    programExtras: buildProgramDetailMainExtras(id, t),
  };
}

export function getProgramDetailPageSections(t: (key: string) => string): ProgramDetailPageSectionsContent {
  const testimonialsBlock = getProgramsPageTestimonialsBlock(t);
  const faq = getProgramsPageFaqContent(t);
  return {
    testimonials: {
      title: testimonialsBlock.title,
      subtitle: testimonialsBlock.subtitle,
      durationLabel: testimonialsBlock.durationLabel,
      countryLabel: testimonialsBlock.countryLabel,
      testimonials: testimonialsBlock.testimonials,
    },
    faq: {
      title: faq.title,
      intro: faq.intro,
      items: faq.items,
    },
  };
}

export function getProgramDetailJourneySectionContent(t: (key: string) => string): ProgramDetailJourneySectionContent {
  return {
    title: t("recoveryJourney.cta.title"),
    subtitle: t("recoveryJourney.cta.subtitle"),
    primaryCardTitle: t("whyChoose.features.accreditedCenters.title"),
    primaryCardSubtitle: t("whyChoose.features.accreditedCenters.subtitle"),
    healthyLifeLabel: t("journey.healthyLife"),
    transparentPricesLabel: t("whyChoose.features.transparentPrices.title"),
    buttonLabel: t("recoveryJourney.cta.button"),
    buttonHref: "https://wa.me/1234567890",
  };
}

export function getProgramsPageHeroContent(t: (key: string) => string, locale: string): ProgramsPageHeroContent {
  return {
    title: t("programsPage.hero.title"),
    tagline: t("programsPage.hero.tagline"),
    description: t("programsPage.hero.description"),
    stats: [
      { value: t("programsPage.hero.stats.0.value"), label: t("programsPage.hero.stats.0.label") },
      { value: t("programsPage.hero.stats.1.value"), label: t("programsPage.hero.stats.1.label") },
      { value: t("programsPage.hero.stats.2.value"), label: t("programsPage.hero.stats.2.label") },
    ],
    ctaLabel: t("programsPage.hero.ctaLabel"),
    ctaHref: `/${locale}/tashafy-programs#tashafy-programs-grid`,
    heroImageSrc: "/tashafy-programs.png",
    heroImageAlt: t("programsPage.hero.imageAlt"),
  };
}

export function getJourneySteps(t: (key: string) => string): JourneyStep[] {
  return [
    {
      label: t("recoveryJourney.steps.discover.title"),
      description: t("recoveryJourney.steps.discover.description"),
      icon: "search",
      iconBgClass: "bg-[#FEE2E2]",
      iconColorClass: "text-[#433CA6]",
    },
    {
      label: t("recoveryJourney.steps.consult.title"),
      description: t("recoveryJourney.steps.consult.description"),
      icon: "phone",
      iconBgClass: "bg-[#FEE2E2]",
      iconColorClass: "text-[#F97373]",
    },
    {
      label: t("recoveryJourney.steps.evaluate.title"),
      description: t("recoveryJourney.steps.evaluate.description"),
      icon: "search",
      iconBgClass: "bg-[#FEE2E2]",
      iconColorClass: "text-[#433CA6]",
    },
    {
      label: t("recoveryJourney.steps.arrange.title"),
      description: t("recoveryJourney.steps.arrange.description"),
      icon: "briefcase",
      iconBgClass: "bg-[#FEE2E2]",
      iconColorClass: "text-[#433CA6]",
    },
    {
      label: t("recoveryJourney.steps.followup.title"),
      description: t("recoveryJourney.steps.followup.description"),
      icon: "tag",
      iconBgClass: "bg-[#FEE2E2]",
      iconColorClass: "text-[#F97373]",
    },
  ];
}
export function getProgramsPageProgramsBlock(t: (key: string) => string, locale: string): ProgramsPageProgramsBlock {
  return {
    title: t("programs.title"),
    subtitle: t("programs.subtitle"),
    bookLabel: t("programs.bookLabel"),
    bestSellerLabel: t("programs.bestSeller"),
    programs: getPrograms(t, locale),
  };
}

export function getProgramsPageWhyImportantContent(t: (key: string) => string): ProgramsPageWhyImportantContent {
  return {
    title: t("programsPage.why.title"),
    description: t("programsPage.why.description"),
    bullets: [
      { label: t("programsPage.why.bullets.0"), icon: "check" },
      { label: t("programsPage.why.bullets.1"), icon: "dna" },
      { label: t("programsPage.why.bullets.2"), icon: "chart" },
      { label: t("programsPage.why.bullets.3"), icon: "ok" },
    ],
    imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=886&q=80",
    imageAlt: t("programsPage.why.imageAlt"),
  };
}

function getProgramsPageFaqItems(t: (key: string) => string): FaqItem[] {
  return [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
    { question: t("faq.q7"), answer: t("faq.a7") },
  ];
}

export function getProgramsPageFaqContent(t: (key: string) => string): ProgramsPageFaqContent {
  return {
    title: t("faq.title"),
    intro: t("faq.intro"),
    items: getProgramsPageFaqItems(t),
  };
}

export function getProgramsPagePartnersBlock(t: (key: string) => string): ProgramsPagePartnersBlock {
  const partners: PartnerItem[] = [
    { name: "GlobeMed", logo: "/our-partners.svg" },
    { name: t("partners.islamicInsurance"), logo: "/our-partners.svg" },
    { name: t("partners.university"), logo: "/our-partners.svg" },
    { name: t("partners.euroArab"), logo: "/our-partners.svg" },
    { name: t("partners.housingBank"), logo: "/our-partners.svg" },
    { name: t("partners.islamicInsurance"), logo: "/our-partners.svg" },
    { name: "AJIB", logo: "/our-partners.svg" },
    { name: "GlobeMed", logo: "/our-partners.svg" },
  ];

  return {
    title: t("partners.title"),
    subtitle: t("partners.subtitle"),
    partners,
  };
}

function getProgramTestsAnalysesContent(t: (key: string) => string): ProgramTestsAnalysesContent {
  return {
    title: t("programs.detail.tests.title"),
    subtitle: t("programs.detail.tests.subtitle"),
    analysesSummaryBadge: t("programs.detail.tests.analysesBadge"),
    testsSummaryBadge: t("programs.detail.tests.testsBadge"),
    categories: [
      {
        id: "liver",
        title: t("programs.detail.tests.liver.title"),
        countBadge: t("programs.detail.tests.liver.badge"),
        variant: "analysis",
      },
      {
        id: "kidney",
        title: t("programs.detail.tests.kidney.title"),
        countBadge: t("programs.detail.tests.kidney.badge"),
        variant: "analysis",
      },
      {
        id: "sleep",
        title: t("programs.detail.tests.sleep.title"),
        countBadge: t("programs.detail.tests.sleep.badge"),
        variant: "test",
        subItems: [0, 1, 2].map((i) => ({
          title: t(`programs.detail.tests.sleep.items.${i}.title`),
          description: t(`programs.detail.tests.sleep.items.${i}.description`),
        })),
      },
      {
        id: "heart",
        title: t("programs.detail.tests.heart.title"),
        countBadge: t("programs.detail.tests.heart.badge"),
        variant: "test",
      },
    ],
  };
}

function getProgramLabsContentFromPartners(t: (key: string) => string): ProgramLabsContent {
  const { partners } = getProgramsPagePartnersBlock(t);
  const logos = Array.from({ length: 9 }, (_, i) => {
    const p = partners[i % partners.length];
    return { src: p.logo, alt: p.name };
  });
  return {
    title: t("programs.detail.labs.title"),
    subtitle: t("programs.detail.labs.subtitle"),
    logos,
  };
}

function buildProgramDetailMainExtras(id: ProgramDetailRouteId, t: (key: string) => string): ProgramDetailMainExtras {
  const programTitle = t(`programs.${id}.title`);
  return {
    heroImageSrc: PROGRAM_DETAIL_LAB_HERO_IMAGE,
    heroImageAlt: `${programTitle} — ${t("programs.detail.heroImageAlt")}`,
    heroBadgeLabel: t("programs.detail.hero.badgeLabel"),
    heroTitle: programTitle,
    heroSubtitle: t(`programs.detail.hero.subtitle.${id}`),
    testsAnalyses: getProgramTestsAnalysesContent(t),
    labs: getProgramLabsContentFromPartners(t),
  };
}

export function getProgramsPageTestimonialsBlock(t: (key: string) => string): ProgramsPageTestimonialsBlock {
  const testimonials: TestimonialItem[] = [
    {
      name: t("testimonials.items.0.name"),
      role: t("testimonials.items.0.role"),
      avatar: "/placehold1.svg",
      avatarBgClass: "bg-fuchsia-200",
      quote: t("testimonials.items.0.quote"),
      duration: t("testimonials.items.0.duration"),
      location: t("testimonials.items.0.location"),
    },
    {
      name: t("testimonials.items.1.name"),
      role: t("testimonials.items.1.role"),
      avatar: "/placehold2.svg",
      avatarBgClass: "bg-amber-200",
      quote: t("testimonials.items.1.quote"),
      duration: t("testimonials.items.1.duration"),
      location: t("testimonials.items.1.location"),
    },
    {
      name: t("testimonials.items.2.name"),
      role: t("testimonials.items.2.role"),
      avatar: "/placehold1.svg",
      avatarBgClass: "bg-pink-200",
      quote: t("testimonials.items.2.quote"),
      duration: t("testimonials.items.2.duration"),
      location: t("testimonials.items.2.location"),
    },
    {
      name: t("testimonials.items.3.name"),
      role: t("testimonials.items.3.role"),
      avatar: "/placehold2.svg",
      avatarBgClass: "bg-rose-200",
      quote: t("testimonials.items.3.quote"),
      duration: t("testimonials.items.3.duration"),
      location: t("testimonials.items.3.location"),
    },
    {
      name: t("testimonials.items.4.name"),
      role: t("testimonials.items.4.role"),
      avatar: "/placehold1.svg",
      avatarBgClass: "bg-teal-200",
      quote: t("testimonials.items.4.quote"),
      duration: t("testimonials.items.4.duration"),
      location: t("testimonials.items.4.location"),
    },
  ];

  return {
    title: t("testimonials.title"),
    subtitle: t("testimonials.subtitle"),
    durationLabel: t("testimonials.durationLabel"),
    countryLabel: t("testimonials.countryLabel"),
    testimonials,
  };
}
