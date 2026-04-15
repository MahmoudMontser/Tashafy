import { fetchPublicSetting } from "@/lib/cms";

export type FrontendAppSettings = {
  siteName: string;
  tagline: string;
  logoAr: string;
  logoEn: string;
  logoNavAr: string;
  logoNavEn: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  socialFacebook: string;
  socialX: string;
  socialInstagram: string;
  siteDomain: string;
  defaultTitle: string;
  defaultDescription: string;
  maintenanceEnabled: boolean;
  maintenanceTitleAr: string;
  maintenanceTitleEn: string;
  maintenanceMessageAr: string;
  maintenanceMessageEn: string;
};

const DEFAULT_SETTINGS: FrontendAppSettings = {
  siteName: "Tashafy",
  tagline: "",
  logoAr: "/logo_ar.svg",
  logoEn: "/logo_en.svg",
  logoNavAr: "/logo_white_ar.svg",
  logoNavEn: "/logo_white_en.svg",
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  socialFacebook: "",
  socialX: "",
  socialInstagram: "",
  siteDomain: "",
  defaultTitle: "Tashafy",
  defaultDescription: "Tashafy is a platform for managing your business.",
  maintenanceEnabled: false,
  maintenanceTitleAr: "الموقع تحت الصيانة",
  maintenanceTitleEn: "Site under maintenance",
  maintenanceMessageAr: "نعتذر، الموقع غير متاح حالياً.",
  maintenanceMessageEn: "Sorry, the site is temporarily unavailable.",
};

export async function getFrontendAppSettings(): Promise<FrontendAppSettings> {
  const setting = await fetchPublicSetting("app.frontend");
  const value = setting?.value ?? {};

  return {
    siteName: asString(value.site_name, DEFAULT_SETTINGS.siteName),
    tagline: asString(value.tagline, DEFAULT_SETTINGS.tagline),
    logoAr: asString(value.logo_ar, DEFAULT_SETTINGS.logoAr),
    logoEn: asString(value.logo_en, DEFAULT_SETTINGS.logoEn),
    logoNavAr: asString(value.logo_nav_ar, DEFAULT_SETTINGS.logoNavAr),
    logoNavEn: asString(value.logo_nav_en, DEFAULT_SETTINGS.logoNavEn),
    contactEmail: asString(value.contact_email, DEFAULT_SETTINGS.contactEmail),
    contactPhone: asString(value.contact_phone, DEFAULT_SETTINGS.contactPhone),
    contactWhatsapp: asString(value.contact_whatsapp, DEFAULT_SETTINGS.contactWhatsapp),
    socialFacebook: asString(value.social_facebook, DEFAULT_SETTINGS.socialFacebook),
    socialX: asString(value.social_x, DEFAULT_SETTINGS.socialX),
    socialInstagram: asString(value.social_instagram, DEFAULT_SETTINGS.socialInstagram),
    siteDomain: asString(value.site_domain, DEFAULT_SETTINGS.siteDomain),
    defaultTitle: asString(value.default_title, DEFAULT_SETTINGS.defaultTitle),
    defaultDescription: asString(value.default_description, DEFAULT_SETTINGS.defaultDescription),
    maintenanceEnabled: Boolean(value.maintenance_enabled ?? DEFAULT_SETTINGS.maintenanceEnabled),
    maintenanceTitleAr: asString(value.maintenance_title_ar, DEFAULT_SETTINGS.maintenanceTitleAr),
    maintenanceTitleEn: asString(value.maintenance_title_en, DEFAULT_SETTINGS.maintenanceTitleEn),
    maintenanceMessageAr: asString(value.maintenance_message_ar, DEFAULT_SETTINGS.maintenanceMessageAr),
    maintenanceMessageEn: asString(value.maintenance_message_en, DEFAULT_SETTINGS.maintenanceMessageEn),
  };
}

function asString(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  return fallback;
}
