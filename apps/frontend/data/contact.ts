import type { ContactPageContent } from "@/types/contact";

const CONTACT_PAGE_CTA_HREF = "https://wa.me/1234567890";

export function getContactPageContent(t: (key: string) => string): ContactPageContent {
  return {
    nav: {
      searchPlaceholder: t("nav.searchPlaceholder"),
      loadingLabel: t("common.loading"),
    },
    hero: {
      title: t("contact.hero.title"),
      subtitle: t("contact.hero.subtitle"),
      decorativeUnderlineAlt: t("contact.hero.decorativeUnderlineAlt"),
    },
    section: {
      formHeading: t("contact.section.formHeading"),
      nameLabel: t("contact.section.nameLabel"),
      phoneLabel: t("contact.section.phoneLabel"),
      emailLabel: t("contact.section.emailLabel"),
      emailOptionalLabel: t("contact.section.emailOptionalLabel"),
      serviceLabel: t("contact.section.serviceLabel"),
      messageLabel: t("contact.section.messageLabel"),
      requiredMark: "*",
      placeholderText: t("contact.section.inputPlaceholder"),
      servicePlaceholder: t("contact.section.servicePlaceholder"),
      messagePlaceholder: t("contact.section.messagePlaceholder"),
      submitLabel: t("contact.section.submitLabel"),
      serviceOptions: [t("contact.section.serviceOptions.0"), t("contact.section.serviceOptions.1"), t("contact.section.serviceOptions.2"), t("contact.section.serviceOptions.3")],
      detailsHeading: t("contact.section.detailsHeading"),
      details: [
        {
          title: t("contact.section.details.phone.title"),
          subtitle: t("contact.section.details.phone.subtitle"),
          values: [t("contact.section.details.phone.value1"), t("contact.section.details.phone.value2")],
        },
        {
          title: t("contact.section.details.email.title"),
          subtitle: t("contact.section.details.email.subtitle"),
          values: [t("contact.section.details.email.value1")],
        },
        {
          title: t("contact.section.details.hq.title"),
          subtitle: t("contact.section.details.hq.subtitle"),
          values: [t("contact.section.details.hq.value1")],
        },
      ],
      branchesHeading: t("contact.section.branchesHeading"),
      branches: [
        {
          country: t("contact.section.branches.0.country"),
          address: t("contact.section.branches.0.address"),
          markerLabel: t("contact.section.branches.0.marker"),
        },
        {
          country: t("contact.section.branches.1.country"),
          address: t("contact.section.branches.1.address"),
          markerLabel: t("contact.section.branches.1.marker"),
        },
        {
          country: t("contact.section.branches.2.country"),
          address: t("contact.section.branches.2.address"),
          markerLabel: t("contact.section.branches.2.marker"),
        },
      ],
      whatsappTitle: t("contact.section.whatsapp.title"),
      whatsappSubtitle: t("contact.section.whatsapp.subtitle"),
      whatsappCtaLabel: t("contact.section.whatsapp.cta"),
      whatsappHref: CONTACT_PAGE_CTA_HREF,
    },
    result: {
      success: {
        title: t("contact.result.success.title"),
        description: t("contact.result.success.description"),
        whatsappCta: t("contact.result.success.whatsappCta"),
        whatsappHref: CONTACT_PAGE_CTA_HREF,
        callPrompt: t("contact.result.success.callPrompt"),
        phoneDisplay: t("contact.result.success.phoneDisplay"),
      },
      failure: {
        title: t("contact.result.failure.title"),
        description: t("contact.result.failure.description"),
        retryCta: t("contact.result.failure.retryCta"),
      },
    },
    journey: {
      title: t("recoveryJourney.cta.title"),
      subtitle: t("recoveryJourney.cta.subtitle"),
      primaryCardTitle: t("whyChoose.features.accreditedCenters.title"),
      primaryCardSubtitle: t("whyChoose.features.accreditedCenters.subtitle"),
      healthyLifeLabel: t("journey.healthyLife"),
      transparentPricesLabel: t("whyChoose.features.transparentPrices.title"),
      buttonLabel: t("recoveryJourney.cta.button"),
      buttonHref: CONTACT_PAGE_CTA_HREF,
    },
  };
}
