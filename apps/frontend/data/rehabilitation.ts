import type { consultationsDoctorItem, FaqItem, MedicalCenterItem, TestimonialItem } from "@/types/global";
import type {
  RehabilitationDetailBodyContent,
  RehabilitationDetailFacilityIcon,
  RehabilitationMedicalCentersContent,
  RehabilitationPageSectionsContent,
  RehabilitationServiceItem,
} from "@/types/rehabilitation";
import { Accessibility, Brain, Dumbbell, HeartPulse, type LucideIcon } from "lucide-react";

const rehabCenterImages = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
];

/** Extra hero slides for rehabilitation center detail Swiper (with center photos = 6 slides). */
const rehabHeroSlidePool = [...rehabCenterImages, "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"];

const REHAB_CENTER_IDS = ["0", "1", "2", "3", "4", "5"] as const;

/** Maps route id to `rehabilitation.detail.{0|1|2}` copy (extra ids reuse templates). */
function rehabilitationDetailTemplateId(routeId: string): string {
  const n = Number(routeId);
  if (!Number.isFinite(n)) return "0";
  return String(((n % 3) + 3) % 3);
}

const DETAIL_FACILITY_ICONS: RehabilitationDetailFacilityIcon[] = ["parking", "cafeteria", "accessibility", "wifi", "gym", "therapy"];

const DETAIL_WHATSAPP_E164: Record<(typeof REHAB_CENTER_IDS)[number], string> = {
  "0": "966501111111",
  "1": "966502222222",
  "2": "966503333333",
  "3": "966504444444",
  "4": "966505555555",
  "5": "966506666666",
};

const DETAIL_PHONE_TEL: Record<(typeof REHAB_CENTER_IDS)[number], string> = {
  "0": "+966112345678",
  "1": "+966163456789",
  "2": "+966148765432",
  "3": "+966112345680",
  "4": "+966112345681",
  "5": "+966112345682",
};

/** Listing + similar-carousel pool (detail pages exist for all). Listing UI still uses `getRehabCenters` only. */
const REHAB_SIMILAR_CENTER_KEYS = ["0", "1", "2", "3", "4", "5"] as const;

export function getRehabilitationCenterHeroDetail(rawId: string, t: (key: string) => string) {
  const id = decodeURIComponent(rawId);
  if (!REHAB_CENTER_IDS.includes(id as (typeof REHAB_CENTER_IDS)[number])) return null;

  const start = Number(id);
  const slides = rehabHeroSlidePool.map((_, j) => rehabHeroSlidePool[(start + j) % rehabHeroSlidePool.length]);

  return {
    slides,
    centerName: t(`rehabilitationCenters.cards.${id}.name`),
    badgeLabel: t(`rehabilitationCenters.cards.${id}.badge`),
    location: t(`rehabilitationCenters.cards.${id}.location`),
    rating: t(`rehabilitationCenters.cards.${id}.rating`),
    reviewsLabel: t("rehabilitation.detail.reviewsLabel"),
  };
}

export function getRehabilitationCenterDetailBody(rawId: string, t: (key: string) => string): RehabilitationDetailBodyContent | null {
  const id = decodeURIComponent(rawId);
  if (!REHAB_CENTER_IDS.includes(id as (typeof REHAB_CENTER_IDS)[number])) return null;

  const centerKey = id as (typeof REHAB_CENTER_IDS)[number];
  const tpl = rehabilitationDetailTemplateId(id);
  const centerName = t(`rehabilitationCenters.cards.${id}.name`);
  const wa = DETAIL_WHATSAPP_E164[centerKey];
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
      startsFromLabel: t("rehabilitationCenters.startsFrom"),
      priceFormatted: t(`rehabilitationCenters.cards.${id}.price`),
      currencySuffix: t("rehabilitation.detail.currencySuffix"),
      perSessionLabel: t("rehabilitation.detail.perSession"),
      locationLabel: t("rehabilitation.detail.locationLabel"),
      locationLine: t(`rehabilitation.detail.${tpl}.sidebarLocation`),
      ratingLabel: t(`rehabilitation.detail.${tpl}.ratingClientsLabel`),
      rating: t(`rehabilitationCenters.cards.${id}.rating`),
      whatsappLabel: t("rehabilitation.detail.whatsappCta"),
      contactLabel: t("rehabilitation.detail.contactCta"),
      whatsappHref,
      phoneHref: `tel:${DETAIL_PHONE_TEL[centerKey].replace(/\s/g, "")}`,
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
        title: t("rehabilitation.detail.packagesTitle"),
        subtitle: t(`rehabilitation.detail.${tpl}.packagesSubtitle`),
        includesLabel: t("rehabilitation.detail.packagesIncludesLabel"),
        plans: [0, 1, 2].map((planIndex) => ({
          priceFormatted: t(`rehabilitation.detail.packages.plan${planIndex}.price`),
          durationWeeksLabel: t(`rehabilitation.detail.packages.plan${planIndex}.weeks`),
          sessionsCountLabel: t(`rehabilitation.detail.packages.plan${planIndex}.sessions`),
          includes: [0, 1, 2, 3, 4, 5].map((n) => t(`rehabilitation.detail.packages.include${n}`)),
          ctaLabel: t("rehabilitation.detail.packagesCta"),
          ctaHref: whatsappHref,
          isHighlighted: planIndex === 1,
        })),
      },
    },
  };
}

function buildCenter(t: (key: string) => string, key: string, image: string): MedicalCenterItem {
  return {
    image,
    badgeLabel: t(`rehabilitationCenters.cards.${key}.badge`),
    detailId: key,
    priceFormatted: t(`rehabilitationCenters.cards.${key}.price`),
    centerName: t(`rehabilitationCenters.cards.${key}.name`),
    rating: t(`rehabilitationCenters.cards.${key}.rating`),
    location: t(`rehabilitationCenters.cards.${key}.location`),
    serviceTags: [
      t(`rehabilitationCenters.cards.${key}.tag1`),
      t(`rehabilitationCenters.cards.${key}.tag2`),
      t(`rehabilitationCenters.cards.${key}.tag3`),
      t(`rehabilitationCenters.cards.${key}.extraTag`),
    ],
    learnAboutLabel: t("rehabilitationCenters.learnAboutLabel"),
    learnAboutHref: `/rehabilitation?center=${key}`,
  };
}

function getRehabCenters(t: (key: string) => string): MedicalCenterItem[] {
  return [buildCenter(t, "0", rehabCenterImages[0]), buildCenter(t, "1", rehabCenterImages[1]), buildCenter(t, "2", rehabCenterImages[2])];
}

/** Other rehabilitation centers for the detail-page carousel (excludes the viewed center). */
export function getRehabilitationSimilarCenters(rawId: string, t: (key: string) => string): MedicalCenterItem[] {
  const id = decodeURIComponent(rawId);
  if (!REHAB_CENTER_IDS.includes(id as (typeof REHAB_CENTER_IDS)[number])) return [];
  return REHAB_SIMILAR_CENTER_KEYS.map((key) => buildCenter(t, key, rehabCenterImages[Number(key) % 3])).filter((c) => c.detailId !== id);
}

function buildRepeatedCenters(t: (key: string) => string): MedicalCenterItem[] {
  const centers = getRehabCenters(t);
  return [...centers, ...centers, ...centers];
}

export function getRehabilitationMedicalCenters(_locale: string, t: (key: string) => string): RehabilitationMedicalCentersContent {
  return {
    title: t("rehabilitationCenters.title"),
    subtitle: t("rehabilitationCenters.subtitle"),
    filterPlaceholder: t("rehabilitationCenters.filterPlaceholder"),
    startsFromLabel: t("rehabilitationCenters.startsFrom"),
    categories: [
      {
        categoryName: t("rehabilitationCenters.categoryName"),
        viewAllLabel: t("rehabilitationCenters.viewAllLabel"),
        viewAllHref: `/rehabilitation`,
        learnAboutHref: `/rehabilitation?center=rehab.0`,
        detailsSegment: "rehabilitation",
        centers: buildRepeatedCenters(t),
      },
    ],
  };
}

export function getRehabilitationOurDoctors(t: (key: string) => string): consultationsDoctorItem[] {
  return [
    {
      name: t("ourDoctors.items.0.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.0.experience"),
      specialization: t("ourDoctors.items.0.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
    {
      name: t("ourDoctors.items.1.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.1.experience"),
      specialization: t("ourDoctors.items.1.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
    {
      name: t("ourDoctors.items.2.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.2.experience"),
      specialization: t("ourDoctors.items.2.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
    {
      name: t("ourDoctors.items.3.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.3.experience"),
      specialization: t("ourDoctors.items.3.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
    {
      name: t("ourDoctors.items.4.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.4.experience"),
      specialization: t("ourDoctors.items.4.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
    {
      name: t("ourDoctors.items.5.name"),
      image: "https://placehold.co/384x384",
      experience: t("ourDoctors.items.5.experience"),
      specialization: t("ourDoctors.items.5.specialization"),
      bookButtonLabel: t("ourDoctors.bookNowLabel"),
    },
  ];
}

export function getRehabilitationTestimonials(t: (key: string) => string): TestimonialItem[] {
  return [
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
}

export function getRehabilitationFaqItems(t: (key: string) => string): FaqItem[] {
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

function getRehabilitationServiceItems(t: (key: string) => string): RehabilitationServiceItem[] {
  return [
    {
      icon: "neuro",
      title: t("rehabilitationServices.cards.neuro.title"),
      description: t("rehabilitationServices.cards.neuro.description"),
    },
    {
      icon: "sports",
      title: t("rehabilitationServices.cards.sports.title"),
      description: t("rehabilitationServices.cards.sports.description"),
    },
    {
      icon: "postOp",
      title: t("rehabilitationServices.cards.postOp.title"),
      description: t("rehabilitationServices.cards.postOp.description"),
    },
    {
      icon: "physical",
      title: t("rehabilitationServices.cards.physical.title"),
      description: t("rehabilitationServices.cards.physical.description"),
    },
  ];
}

export function getRehabilitationPageSections(t: (key: string) => string): RehabilitationPageSectionsContent {
  return {
    services: {
      title: t("rehabilitationServices.title"),
      subtitle: t("rehabilitationServices.subtitle"),
      items: getRehabilitationServiceItems(t),
    },
    doctors: {
      title: t("ourDoctors.title"),
      subtitle: t("ourDoctors.subtitle"),
      doctors: getRehabilitationOurDoctors(t),
    },
    testimonials: {
      title: t("testimonials.title"),
      subtitle: t("testimonials.subtitle"),
      durationLabel: t("testimonials.durationLabel"),
      countryLabel: t("testimonials.countryLabel"),
      testimonials: getRehabilitationTestimonials(t),
    },
    faq: {
      title: t("faq.title"),
      intro: t("faq.intro"),
      items: getRehabilitationFaqItems(t),
    },
  };
}

export const iconMap: Record<RehabilitationServiceItem["icon"], LucideIcon> = {
  neuro: Brain,
  sports: Dumbbell,
  postOp: HeartPulse,
  physical: Accessibility,
};

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
] as const;
