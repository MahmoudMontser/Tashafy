import type { NavLabels, FooterLabels, NavItem, FooterNavItem } from "@/types/global";

/** Navbar main nav links (used in Navbar.tsx) */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", path: "" },
  { key: "rehabilitation", path: "/rehabilitation" },
  { key: "wellness", path: "/wellness" },
  { key: "tashafyPrograms", path: "/tashafy-programs" },
  { key: "blog", path: "/blog" },
  { key: "aboutUs", path: "/about-us" },
  { key: "contactUs", path: "/contact" },
];

/** Footer "Main" column links */
export const FOOTER_MAIN_LINKS: FooterNavItem[] = [
  { key: "rehabilitation", path: "/rehabilitation" },
  { key: "tashafyPrograms", path: "/tashafy-programs" },
  { key: "medicalTravel", path: "/medical-travel" },
  { key: "checkupPackages", path: "/checkup-packages" },
];

/** Footer "About" column links */
export const FOOTER_ABOUT_LINKS: FooterNavItem[] = [
  { key: "ourDoctors", path: "/doctors" },
  { key: "blog", path: "/blog" },
  { key: "contactUs", path: "/contact" },
  { key: "faq", path: "/faq" },
];

/** Footer "Legal" column links */
export const FOOTER_LEGAL_LINKS: FooterNavItem[] = [
  { key: "termsOfUse", path: "/terms" },
  { key: "privacyPolicy", path: "/privacy" },
];

export function getNavAndFooterLabels(t: (key: string) => string): {
  labels: NavLabels;
  footerLabels: FooterLabels;
} {
  const labels: NavLabels = {
    home: t("nav.home"),
    rehabilitation: t("nav.rehabilitation"),
    wellness: t("nav.wellness"),
    tashafyPrograms: t("nav.tashafyPrograms"),
    blog: t("nav.blog"),
    aboutUs: t("nav.aboutUs"),
    contactUs: t("nav.contactUs"),
    freeConsultation: t("nav.freeConsultation"),
  };

  const footerLabels: FooterLabels = {
    tagline: t("footer.tagline"),
    copyright: t("footer.copyright"),
    mainTitle: t("footer.mainTitle"),
    aboutUs: t("footer.aboutUs"),
    legal: t("footer.legal"),
    rehabilitation: t("footer.rehabilitation"),
    tashafyPrograms: t("footer.tashafyPrograms"),
    medicalTravel: t("footer.medicalTravel"),
    checkupPackages: t("footer.checkupPackages"),
    ourDoctors: t("footer.ourDoctors"),
    blog: t("footer.blog"),
    contactUs: t("footer.contactUs"),
    faq: t("footer.faq"),
    termsOfUse: t("footer.termsOfUse"),
    privacyPolicy: t("footer.privacyPolicy"),
    email: t("footer.email"),
    facebook: t("footer.facebook"),
    x: t("footer.x"),
    instagram: t("footer.instagram"),
  };

  return { labels, footerLabels };
}
