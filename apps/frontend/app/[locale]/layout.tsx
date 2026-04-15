import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/localization/i18n-config";
import { getTranslations } from "@/lib/localization/i18n-server";
import { Footer } from "@/components/shared/footer/Footer";
import { getNavAndFooterLabels } from "@/data/global";
import { getFrontendAppSettings } from "@/lib/app-settings";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect(`/${DEFAULT_LOCALE}`);
  }

  const { t } = getTranslations(locale);
  const { footerLabels } = getNavAndFooterLabels(t);
  const settings = await getFrontendAppSettings();
  const maintenanceTitle = locale === "ar" ? settings.maintenanceTitleAr : settings.maintenanceTitleEn;
  const maintenanceMessage = locale === "ar" ? settings.maintenanceMessageAr : settings.maintenanceMessageEn;

  return (
    <>
      {settings.maintenanceEnabled ? (
        <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6 text-center">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-(--color-text-brand) mb-4">{maintenanceTitle}</h1>
            <p className="text-(--color-text-secondary)">{maintenanceMessage}</p>
          </div>
        </main>
      ) : (
        <>
          {children}
          <Footer
            locale={locale}
            labels={footerLabels}
            settings={{
              siteName: settings.siteName,
              tagline: settings.tagline,
              logoAr: settings.logoAr,
              logoEn: settings.logoEn,
              contactEmail: settings.contactEmail,
              socialFacebook: settings.socialFacebook,
              socialX: settings.socialX,
              socialInstagram: settings.socialInstagram,
            }}
          />
        </>
      )}
    </>
  );
}
