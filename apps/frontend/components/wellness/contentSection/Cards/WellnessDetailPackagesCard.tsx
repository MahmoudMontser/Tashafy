"use client";

import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { logAndOpenWhatsapp } from "@/lib/reservations";
import type { WellnessDetailMainContent } from "@/types/welness";
import { SaudiRiyal } from "lucide-react";
import Link from "next/link";

type WellnessDetailPackagesCardProps = {
  main: Pick<WellnessDetailMainContent, "packagesSection">;
  isRtl: boolean;
};

const PLAN_TITLE_CLASS = "text-xl font-medium leading-8 text-[#c92044]";

export function WellnessDetailPackagesCard({ main, isRtl }: WellnessDetailPackagesCardProps) {
  const section = main.packagesSection;
  if (!section) return null;

  const handlePlanReservation = async (e: MouseEvent<HTMLAnchorElement>, planTitle: string, href: string) => {
    e.preventDefault();
    await logAndOpenWhatsapp(
      {
        source: "wellness_detail_package_card",
        reservation_type: "package",
        item_name: planTitle,
      },
      href,
    );
  };

  return (
    <section
      className="flex flex-col gap-6 rounded-2xl border border-black/6 bg-white p-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="wellness-detail-packages-heading"
    >
      <div className="flex w-full flex-col gap-0 text-start">
        <h2 id="wellness-detail-packages-heading" className="text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">
          {section.title}
        </h2>
        <p className="mt-1 text-base leading-6 text-(--color-text-secondary-inverse)">{section.subtitle}</p>
      </div>

      <div className="flex w-full flex-col gap-6">
        {section.plans.map((plan, idx) => (
          <div
            key={`${idx}-${plan.priceFormatted}-${plan.planTitle}`}
            className={cn(
              "flex w-full flex-col gap-4 overflow-hidden rounded-[24px] border border-[#e9ebf0] bg-white px-6 py-4",
              "md:flex-row md:items-center md:justify-between md:gap-6",
            )}
          >
            <div className="flex min-w-0 flex-1 shrink-0 flex-col gap-0.5">
              <p className={PLAN_TITLE_CLASS}>{plan.planTitle}</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold leading-7 tracking-[-0.24px] text-(--color-text-brand)">{plan.priceFormatted}</span>
                <SaudiRiyal className="size-6 shrink-0 fill-(--color-text-brand) text-(--color-text-brand)" aria-hidden />
              </div>
            </div>

            <div className="flex min-w-0 flex-2 flex-col gap-0.5 text-start">
              <p className="text-lg font-bold leading-7 text-(--color-text-brand)">{plan.durationWeeksLabel}</p>
              <p className="text-sm font-normal leading-5 text-[#4e5663]">{plan.detailsLine}</p>
            </div>

            <Link
              href={plan.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handlePlanReservation(e, plan.planTitle, plan.ctaHref)}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-white hover:bg-primary/90 md:self-center"
            >
              {plan.ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
