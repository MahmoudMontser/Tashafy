import type {
  ArticleItem,
  CertificationItem,
  DestinationItem,
  FeatureItem,
  ServiceItem,
  SpecialtyItem,
  StartJourneyStep,
  WhyChooseFeature,
  WhyChooseStat,
} from "@/types/home";
import type { consultationsDoctorItem, FaqItem, MedicalCenterCategory, MedicalCenterItem, OurStoryStat, PartnerItem, TestimonialItem } from "@/types/global";

export function getArticles(t: (key: string) => string): ArticleItem[] {
  return [
    {
      title: t("articles.rehab.title"),
      description: t("articles.rehab.description"),
      category: t("articles.rehab.category"),
      date: t("articles.rehab.date"),
      author: t("articles.rehab.author"),
      image: "/service1.svg",
      href: "#",
    },
    {
      title: t("articles.medicalTourism.title"),
      description: t("articles.medicalTourism.description"),
      category: t("articles.medicalTourism.category"),
      date: t("articles.medicalTourism.date"),
      author: t("articles.rehab.author"),
      image: "/service2.svg",
      href: "#",
    },
    {
      title: t("articles.nutrition.title"),
      description: t("articles.nutrition.description"),
      category: t("articles.nutrition.category"),
      date: t("articles.nutrition.date"),
      author: t("articles.rehab.author"),
      image: "/service3.svg",
      href: "#",
    },
  ];
}

export function getCertifications(t: (key: string) => string): CertificationItem[] {
  return [
    { name: "WHO", description: t("certifications.who"), logo: "/Certifications.svg" },
    { name: "CBAHI", description: t("certifications.cbahi"), logo: "/Certifications.svg" },
    { name: "ISO 9001", description: t("certifications.iso9001"), logo: "/Certifications.svg" },
    { name: "JCI", description: t("certifications.jci"), logo: "/Certifications.svg" },
    { name: "WHO", description: t("certifications.who"), logo: "/Certifications.svg" },
    { name: "CBAHI", description: t("certifications.cbahi"), logo: "/Certifications.svg" },
    { name: "JCI", description: t("certifications.jci"), logo: "/Certifications.svg" },
  ];
}

export function getConsultationsDoctors(t: (key: string) => string): consultationsDoctorItem[] {
  return [
    {
      name: t("doctors.items.0.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.0.experience"),
      specialization: t("doctors.items.0.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookConsultationLabel"),
    },
    {
      name: t("doctors.items.1.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.1.experience"),
      specialization: t("doctors.items.1.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookNowLabel"),
    },
    {
      name: t("doctors.items.2.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.2.experience"),
      specialization: t("doctors.items.2.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookNowLabel"),
    },
    {
      name: t("doctors.items.3.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.3.experience"),
      specialization: t("doctors.items.3.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookConsultationLabel"),
    },
    {
      name: t("doctors.items.4.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.4.experience"),
      specialization: t("doctors.items.4.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookConsultationLabel"),
    },
    {
      name: t("doctors.items.5.name"),
      image: "https://placehold.co/384x384",
      experience: t("doctors.items.5.experience"),
      specialization: t("doctors.items.5.specialization"),
      recommendationText: t("doctors.recommendationLabel"),
      bookButtonLabel: t("doctors.bookConsultationLabel"),
    },
  ];
}

export function getDestinations(t: (key: string) => string): DestinationItem[] {
  return [
    {
      city: t("destinations.items.0.city"),
      country: t("destinations.items.0.country"),
      image: "/Dentist.svg",
      centersCount: t("destinations.items.0.centersCount"),
    },
    {
      city: t("destinations.items.1.city"),
      country: t("destinations.items.1.country"),
      image: "/Dentist.svg",
      centersCount: t("destinations.items.1.centersCount"),
    },
    {
      city: t("destinations.items.2.city"),
      country: t("destinations.items.2.country"),
      image: "https://placehold.co/380x230",
      centersCount: t("destinations.items.2.centersCount"),
    },
    {
      city: t("destinations.items.2.city"),
      country: t("destinations.items.2.country"),
      image: "https://placehold.co/380x230",
      centersCount: t("destinations.items.2.centersCount"),
    },
    {
      city: t("destinations.items.2.city"),
      country: t("destinations.items.2.country"),
      image: "https://placehold.co/380x230",
      centersCount: t("destinations.items.2.centersCount"),
    },
  ];
}

export function getFaqItems(t: (key: string) => string): FaqItem[] {
  return [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
    {
      question: t("faq.q7"),
      answer: t("faq.a7"),
    },
  ];
}

export function getFeatures(t: (key: string) => string): FeatureItem[] {
  return [
    {
      title: t("features.certified.title"),
      subtitle: t("features.certified.subtitle"),
      icon: "/support-icon.svg",
    },
    {
      title: t("features.reviews.title"),
      subtitle: t("features.reviews.subtitle"),
      icon: "/support-icon.svg",
    },
    {
      title: t("features.support.title"),
      subtitle: t("features.support.subtitle"),
      icon: "/support-icon.svg",
    },
  ];
}

function buildCenter(t: (key: string) => string, key: string, learnAboutLabel: string, categoryBasePath: string): MedicalCenterItem {
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

export function getMedicalCenters(t: (key: string) => string): MedicalCenterCategory[] {
  const learnAboutLabel = t("medicalCenters.learnAboutLabel");
  return [
    {
      categoryName: t("medicalCenters.categories.wellness"),
      viewAllLabel: t("medicalCenters.viewAllLabel"),
      viewAllHref: `/wellness`,
      learnAboutHref: `/wellness?center=wellness.0`,
      detailsSegment: "wellness",
      centers: [
        buildCenter(t, "wellness.0", learnAboutLabel, "/wellness"),
        buildCenter(t, "wellness.1", learnAboutLabel, "/wellness"),
        buildCenter(t, "wellness.2", learnAboutLabel, "/wellness"),
        buildCenter(t, "wellness.2", learnAboutLabel, "/wellness"),
        buildCenter(t, "wellness.2", learnAboutLabel, "/wellness"),
      ],
    },
    {
      categoryName: t("medicalCenters.categories.rehabilitation"),
      viewAllLabel: t("medicalCenters.viewAllLabel"),
      viewAllHref: `/rehabilitation`,
      learnAboutHref: `/rehabilitation?center=rehab.0`,
      detailsSegment: "rehabilitation",
      centers: [
        buildCenter(t, "rehab.0", learnAboutLabel, "/rehabilitation"),
        buildCenter(t, "rehab.1", learnAboutLabel, "/rehabilitation"),
        buildCenter(t, "rehab.2", learnAboutLabel, "/rehabilitation"),
        buildCenter(t, "rehab.2", learnAboutLabel, "/rehabilitation"),
        buildCenter(t, "rehab.2", learnAboutLabel, "/rehabilitation"),
      ],
    },
  ];
}

export function getOurDoctors(t: (key: string) => string): consultationsDoctorItem[] {
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

export function getOurPartners(t: (key: string) => string): PartnerItem[] {
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

export function getOurServices(t: (key: string) => string, locale: string): ServiceItem[] {
  return [
    {
      title: t("services.rehabilitation.title"),
      description: t("services.rehabilitation.description"),
      image: "/service1.svg",
      href: `/${locale}/services/rehabilitation`,
    },
    {
      title: t("services.wellness.title"),
      description: t("services.wellness.description"),
      image: "/service2.svg",
      href: `/${locale}/services/wellness`,
    },
    {
      title: t("services.med.title"),
      description: t("services.med.description"),
      image: "/service3.svg",
      href: `/${locale}/services/med`,
    },
  ];
}

export function getOurStoryStats(t: (key: string) => string): OurStoryStat[] {
  return [
    { value: "200+", label: t("ourStory.statSpecialists") },
    { value: "99%", label: t("ourStory.statSuccessRate") },
    { value: "1000+", label: t("ourStory.statPatients") },
  ];
}

export { getPrograms } from "@/data/programs";

export function getStartJourneySteps(t: (key: string) => string): StartJourneyStep[] {
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

export function getSpecialties(t: (key: string) => string): SpecialtyItem[] {
  return [
    { title: t("specialties.items.0.title"), icon: "/mask-group.svg", description: t("specialties.items.0.description") },
    { title: t("specialties.items.1.title"), icon: "/mask-group.svg", description: t("specialties.items.1.description") },
    { title: t("specialties.items.2.title"), icon: "/mask-group.svg", description: t("specialties.items.2.description") },
    { title: t("specialties.items.3.title"), icon: "/mask-group.svg", description: t("specialties.items.3.description") },
    { title: t("specialties.items.4.title"), icon: "/mask-group.svg", description: t("specialties.items.4.description") },
    { title: t("specialties.items.5.title"), icon: "/mask-group.svg", description: t("specialties.items.5.description") },
    { title: t("specialties.items.6.title"), icon: "/mask-group.svg", description: t("specialties.items.6.description") },
    { title: t("specialties.items.7.title"), icon: "/mask-group.svg", description: t("specialties.items.7.description") },
    { title: t("specialties.items.8.title"), icon: "/mask-group.svg", description: t("specialties.items.8.description") },
    { title: t("specialties.items.9.title"), icon: "/mask-group.svg", description: t("specialties.items.9.description") },
    { title: t("specialties.items.10.title"), icon: "/mask-group.svg", description: t("specialties.items.10.description") },
  ];
}

export function getTestimonials(t: (key: string) => string): TestimonialItem[] {
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

export function getWhyChooseFeatures(t: (key: string) => string): WhyChooseFeature[] {
  return [
    {
      title: t("whyChoose.features.transparentPrices.title"),
      subtitle: t("whyChoose.features.transparentPrices.subtitle"),
      icon: "tag",
    },
    {
      title: t("whyChoose.features.accreditedCenters.title"),
      subtitle: t("whyChoose.features.accreditedCenters.subtitle"),
      icon: "building",
    },
    {
      title: t("whyChoose.features.fastProcess.title"),
      subtitle: t("whyChoose.features.fastProcess.subtitle"),
      icon: "smile",
    },
    {
      title: t("whyChoose.features.integratedJourney.title"),
      subtitle: t("whyChoose.features.integratedJourney.subtitle"),
      icon: "star",
    },
  ];
}

export function getWhyChooseStats(t: (key: string) => string): WhyChooseStat[] {
  return [
    { value: "200+", label: t("whyChoose.stats.patientsPerDay") },
    { value: "1000+", label: t("whyChoose.stats.medicalTeam") },
  ];
}
