"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LOCALES } from "@/lib/localization/i18n-config";
import { LoadingOverlay } from "@/components/shared/loading/LoadingOverlay";

type LocaleSwitcherProps = {
  locale: string;
  triggerClassName?: string;
  contentClassName?: string;
  loadingLabel?: string;
  variant?: "dark" | "light";
};

export function LocaleSwitcher({ locale, triggerClassName, contentClassName, loadingLabel, variant = "dark" }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const isRtl = locale === "ar";
  const [isChangingLocale, setIsChangingLocale] = useState(false);

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname.startsWith(`/${locale}`)) return `/${newLocale}`;
    return pathname.replace(new RegExp(`^/${locale}`), `/${newLocale}`);
  };

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = getLocalizedPath(newLocale);
    setIsChangingLocale(true);
    // Allow overlay to paint before full-page redirect
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.location.assign(newPath);
      }, 80);
    });
  };

  const isLight = variant === "light";

  return (
    <>
      <LoadingOverlay open={isChangingLocale} message={loadingLabel} />
      <Select value={locale} onValueChange={handleLocaleChange} dir={isRtl ? "rtl" : "ltr"}>
        <SelectTrigger
          size="sm"
          disabled={isChangingLocale}
          className={cn(
            "w-fit gap-1.5 cursor-pointer border-0 bg-transparent shadow-none",
            isLight ? "text-(--color-text-primary hover:text-(--color-text-primary)" : "text-white/80  hover:text-white",
            triggerClassName,
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align={isRtl ? "start" : "end"}
          className={cn(
            "cursor-pointer top-12",
            isLight ? "border-gray-200 bg-white text-(--color-text-primary) shadow-md" : "border-white/10 bg-[#1A1D21] text-white",
            contentClassName,
          )}
        >
          {LOCALES.map((code) => (
            <SelectItem
              key={code}
              value={code}
              className={cn(
                "cursor-pointer my-1",
                isLight ? "focus:bg-gray-100 focus:text-(--color-text-primary)" : "focus:bg-white/10 focus:text-white",
                code === locale && (isLight ? "bg-gray-100 font-medium text-(--color-text-primary)" : "bg-white/10 font-medium"),
              )}
              disabled={code === locale || isChangingLocale}
            >
              {code === "en" ? "En" : "Ar"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
