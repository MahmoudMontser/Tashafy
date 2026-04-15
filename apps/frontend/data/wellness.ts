import type { LucideIcon } from "lucide-react";
import { Apple, Dumbbell, WavesLadder, Wind } from "lucide-react";
import type {
  WellnessAchievementContent,
  WellnessCenterHeroContent,
  WellnessDetailBodyContent,
  WellnessDetailFacilityIcon,
  WellnessPageSectionsContent,
  WellnessServiceItem,
  WellnessServicesSectionContent,
} from "@/types/welness";
import type { FaqItem, MedicalCenterCategory, MedicalCenterItem, PartnerItem, TestimonialItem } from "@/types/global";

function buildWellnessMedicalCenter(t: (key: string) => string, key: string, learnAboutLabel: string, categoryBasePath: string): MedicalCenterItem {
  const tags: string[] = [];
  const extra = t(`medicalCenters.${key}.extraTag`);
  if (extra) tags.push(extra);
  for (let i = 1; i <= 3; i++) {
    const tag = t(`medicalCenters.${key}.tag${i}`);
    if (tag) tags.push(tag);
  }
  return {
    image: "https://placehold.co/384x256",
    badgeLabel: t(`medicalCenters.${key}.badge`),
    detailId: key,
    priceFormatted: t(`medicalCenters.${key}.price`),
    centerName: t(`medicalCenters.${key}.name`),
    rating: t(`medicalCenters.${key}.rating`),
    location: t(`medicalCenters.${key}.location`),
    serviceTags: tags,
    learnAboutLabel,
    learnAboutHref: `${categoryBasePath}?center=${encodeURIComponent(key)}`,
  };
}

/** Medical centers block for the wellness listing page (wellness category only). */
export function getWellnessMedicalCentersSectionContent(t: (key: string) => string) {
  const learnAboutLabel = t("medicalCenters.learnAboutLabel");
  const categories: MedicalCenterCategory[] = [
    {
      categoryName: t("medicalCenters.categories.wellness"),
      viewAllLabel: t("medicalCenters.viewAllLabel"),
      viewAllHref: "wellness",
      learnAboutHref: "/wellness?center=wellness.0",
      detailsSegment: "wellness",
      centers: WELLNESS_DETAIL_IDS.map((key) => buildWellnessMedicalCenter(t, key, learnAboutLabel, "/wellness")),
    },
  ];

  return {
    title: t("medicalCenters.title"),
    subtitle: t("medicalCenters.subtitle"),
    startsFromLabel: t("medicalCenters.startsFrom"),
    categories,
  };
}

export function getWellnessAchievementContent(t: (key: string) => string): WellnessAchievementContent {
  return {
    title: t("wellness.achievements.title"),
    subtitle: t("wellness.achievements.subtitle"),
    stats: [
      { value: "9,000+", label: t("wellness.achievements.statHappyClients") },
      { value: "98.8%", label: t("wellness.achievements.statSuccessRate") },
      { value: "15+", label: t("wellness.achievements.statYearsExperience") },
      { value: "20+", label: t("wellness.achievements.statAccreditedCenters") },
    ],
  };
}

function getWellnessServiceItems(t: (key: string) => string): WellnessServiceItem[] {
  return [
    {
      icon: "nutrition",
      title: t("wellnessServices.cards.nutrition.title"),
      description: t("wellnessServices.cards.nutrition.description"),
    },
    {
      icon: "relaxation",
      title: t("wellnessServices.cards.relaxation.title"),
      description: t("wellnessServices.cards.relaxation.description"),
    },
    {
      icon: "hydrotherapy",
      title: t("wellnessServices.cards.hydrotherapy.title"),
      description: t("wellnessServices.cards.hydrotherapy.description"),
    },
    {
      icon: "fitness",
      title: t("wellnessServices.cards.fitness.title"),
      description: t("wellnessServices.cards.fitness.description"),
    },
  ];
}

export function getWellnessServicesSectionContent(t: (key: string) => string): WellnessServicesSectionContent {
  return {
    title: t("wellnessServices.title"),
    subtitle: t("wellnessServices.subtitle"),
    items: getWellnessServiceItems(t),
  };
}

export function getWellnessTestimonialsSectionContent(t: (key: string) => string) {
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

export function getWellnessPartners(t: (key: string) => string): PartnerItem[] {
  return [
    { name: "GlobeMed", logo: "/our-partners.svg" },
    { name: t("partners.islamicInsurance"), logo: "/our-partners.svg" },
    { name: t("partners.university"), logo: "/our-partners.svg" },
    { name: t("partners.euroArab"), logo: "/our-partners.svg" },
    { name: t("partners.housingBank"), logo: "/our-partners.svg" },
    { name: t("partners.islamicInsurance"), logo: "/our-partners.svg" },
    { name: "AJIB", logo: "/our-partners.svg" },
    { name: "GlobeMed", logo: "/our-partners.svg" },
  ];
}

const wellnessCenterImages = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
];

const wellnessHeroSlidePool = [...wellnessCenterImages, "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"];

const WELLNESS_DETAIL_IDS = ["wellness.0", "wellness.1", "wellness.2", "wellness.3", "wellness.4", "wellness.5"] as const;
type WellnessDetailRouteId = (typeof WELLNESS_DETAIL_IDS)[number];

const DETAIL_FACILITY_ICONS: WellnessDetailFacilityIcon[] = ["parking", "cafeteria", "accessibility", "wifi", "gym", "therapy"];

const DETAIL_WHATSAPP_E164: Record<WellnessDetailRouteId, string> = {
  "wellness.0": "966601111111",
  "wellness.1": "966602222222",
  "wellness.2": "966603333333",
  "wellness.3": "966604444444",
  "wellness.4": "966605555555",
  "wellness.5": "966606666666",
};

const DETAIL_PHONE_TEL: Record<WellnessDetailRouteId, string> = {
  "wellness.0": "+966112345670",
  "wellness.1": "+966112345671",
  "wellness.2": "+966112345672",
  "wellness.3": "+966112345673",
  "wellness.4": "+966112345674",
  "wellness.5": "+966112345675",
};

function isWellnessDetailId(id: string): id is WellnessDetailRouteId {
  return (WELLNESS_DETAIL_IDS as readonly string[]).includes(id);
}

function wellnessDetailIdToListingSuffix(id: WellnessDetailRouteId): string {
  return id.slice("wellness.".length);
}

/** Maps `wellness.N` route id to `rehabilitation.detail.{0|1|2}` template (cycles; extra listing ids reuse copy). */
function wellnessDetailIdToRehabTemplateIndex(id: WellnessDetailRouteId): string {
  const n = Number(wellnessDetailIdToListingSuffix(id));
  if (!Number.isFinite(n)) return "0";
  return String(((n % 3) + 3) % 3);
}

export function getWellnessCenterHeroDetail(rawId: string, t: (key: string) => string): WellnessCenterHeroContent | null {
  const id = decodeURIComponent(rawId);
  if (!isWellnessDetailId(id)) return null;
  const suf = wellnessDetailIdToListingSuffix(id);
  const start = Number(suf);
  const slides = wellnessHeroSlidePool.map((_, j) => wellnessHeroSlidePool[(start + j) % wellnessHeroSlidePool.length]);

  return {
    slides,
    centerName: t(`medicalCenters.wellness.${suf}.name`),
    badgeLabel: t(`medicalCenters.wellness.${suf}.badge`),
    location: t(`medicalCenters.wellness.${suf}.location`),
    rating: t(`medicalCenters.wellness.${suf}.rating`),
    reviewsLabel: t("wellness.detail.reviewsLabel"),
  };
}

export function getWellnessCenterDetailBody(rawId: string, t: (key: string) => string): WellnessDetailBodyContent | null {
  const id = decodeURIComponent(rawId);
  if (!isWellnessDetailId(id)) return null;
  const suf = wellnessDetailIdToListingSuffix(id);
  const tpl = wellnessDetailIdToRehabTemplateIndex(id);
  const centerName = t(`medicalCenters.wellness.${suf}.name`);
  const wa = DETAIL_WHATSAPP_E164[id];
  const whatsappHref = `https://wa.me/${wa}?text=${encodeURIComponent(centerName)}`;

  const facilities = DETAIL_FACILITY_ICONS.map((icon, i) => ({
    icon,
    title: t(`rehabilitation.detail.${tpl}.facility${i}.title`),
    description: t(`rehabilitation.detail.${tpl}.facility${i}.desc`),
  }));

  const specialtyTags = [0, 1, 2, 3, 4, 5].map((i) => t(`rehabilitation.detail.${tpl}.specialty${i}`));

  return {
    sidebar: {
      centerName,
      startsFromLabel: t("medicalCenters.startsFrom"),
      priceFormatted: t(`medicalCenters.wellness.${suf}.price`),
      currencySuffix: t("rehabilitation.detail.currencySuffix"),
      perSessionLabel: t("rehabilitation.detail.perSession"),
      locationLabel: t("rehabilitation.detail.locationLabel"),
      locationLine: t(`rehabilitation.detail.${tpl}.sidebarLocation`),
      ratingLabel: t(`rehabilitation.detail.${tpl}.ratingClientsLabel`),
      rating: t(`medicalCenters.wellness.${suf}.rating`),
      whatsappLabel: t("rehabilitation.detail.whatsappCta"),
      contactLabel: t("rehabilitation.detail.contactCta"),
      whatsappHref,
      phoneHref: `tel:${DETAIL_PHONE_TEL[id].replace(/\s/g, "")}`,
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
  };
}

function getWellnessFaqItems(t: (key: string) => string): FaqItem[] {
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

export function getWellnessPageSections(t: (key: string) => string): WellnessPageSectionsContent {
  const testimonials = getWellnessTestimonialsSectionContent(t);
  return {
    testimonials,
    faq: {
      title: t("faq.title"),
      intro: t("faq.intro"),
      items: getWellnessFaqItems(t),
    },
  };
}

export function getWellnessSimilarCenters(rawId: string, t: (key: string) => string): MedicalCenterItem[] {
  const id = decodeURIComponent(rawId);
  if (!isWellnessDetailId(id)) return [];
  const learnAboutLabel = t("medicalCenters.learnAboutLabel");
  const centers = WELLNESS_DETAIL_IDS.map((key) => buildWellnessMedicalCenter(t, key, learnAboutLabel, "/wellness"));
  return centers.filter((c) => c.detailId !== id);
}

export const wellnessIconMap: Record<WellnessServiceItem["icon"], LucideIcon> = {
  nutrition: Apple,
  relaxation: Wind,
  hydrotherapy: WavesLadder,
  fitness: Dumbbell,
};
