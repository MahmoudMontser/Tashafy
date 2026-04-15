import type { AboutUsJourneyContent } from "@/types/about";

export type ContactHeroContent = {
  title: string;
  subtitle: string;
  decorativeUnderlineAlt: string;
};

export type ContactNavCopy = {
  searchPlaceholder: string;
  loadingLabel: string;
};

export type ContactPageContent = {
  nav: ContactNavCopy;
  hero: ContactHeroContent;
  section: ContactLayoutSectionContent;
  result: {
    success: ContactResultSuccessContent;
    failure: ContactResultFailureContent;
  };
  journey: AboutUsJourneyContent;
};

export type ContactDetailItem = {
  title: string;
  subtitle: string;
  values: string[];
};

export type ContactBranchItem = {
  country: string;
  address: string;
  markerLabel: string;
};

export type ContactResultSuccessContent = {
  title: string;
  description: string;
  whatsappCta: string;
  whatsappHref: string;
  callPrompt: string;
  phoneDisplay: string;
};

export type ContactResultFailureContent = {
  title: string;
  description: string;
  retryCta: string;
};

export type ContactLayoutSectionContent = {
  formHeading: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  emailOptionalLabel: string;
  serviceLabel: string;
  messageLabel: string;
  requiredMark: string;
  placeholderText: string;
  servicePlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  serviceOptions: string[];
  detailsHeading: string;
  details: ContactDetailItem[];
  branchesHeading: string;
  branches: ContactBranchItem[];
  whatsappTitle: string;
  whatsappSubtitle: string;
  whatsappCtaLabel: string;
  whatsappHref: string;
};
