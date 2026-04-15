export type ArticleItem = {
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image: string;
  href: string;
};

export type CertificationItem = {
  name: string;
  description: string;
  logo: string;
};

export type DestinationItem = {
  city: string;
  country: string;
  image: string;
  centersCount: string;
};

export type FeatureItem = {
  title: string;
  subtitle: string;
  icon: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export type { ProgramItem } from "./programs";

/** Same shape as `JourneyStep` (journey plan section). */
export type { JourneyStep as StartJourneyStep } from "./programs";

export type SpecialtyItem = {
  title: string;
  description: string;
  icon?: string;
};

export type WhyChooseFeature = {
  title: string;
  subtitle: string;
  icon: "tag" | "building" | "smile" | "star";
};

export type WhyChooseStat = {
  value: string;
  label: string;
};
