"use client";

import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { logAndOpenWhatsapp } from "@/lib/reservations";
import type { RehabilitationDetailMainContent } from "@/types/rehabilitation";
import { DetailCard } from "./DetailCard";
import { Check, SaudiRiyal } from "lucide-react";
import Link from "next/link";

type RehabDetailPackagesCardProps = {
  main: Pick<RehabilitationDetailMainContent, "packagesSection">;
  isRtl: boolean;
};

export function RehabDetailPackagesCard({ main }: RehabDetailPackagesCardProps) {
  const section = main.packagesSection;
  if (!section) return null;

  const handlePlanReservation = async (e: MouseEvent<HTMLAnchorElement>, planTitle: string, href: string) => {
    e.preventDefault();
    await logAndOpenWhatsapp(
      {
        source: "rehab_detail_package_card",
        reservation_type: "package",
        item_name: planTitle,
      },
      href,
    );
  };

  return (
    <DetailCard className="p-6">
      <div className={cn("flex flex-col gap-2")}>
        <h2 className="text-2xl font-semibold tracking-tight text-(--color-text-brand) md:text-[26px]">{section.title}</h2>
        <p className="text-sm text-(--color-text-secondary) md:text-base">{section.subtitle}</p>
      </div>

      <div className="mt-6 flex flex-col  gap-4">
        {section.plans.map((plan, idx) => (
          <div
            key={`${idx}-${plan.priceFormatted}`}
            className={cn(
              "flex flex-col gap-4 overflow-hidden rounded-[24px] border border-[#e9ebf0] px-[24px] py-[16px]",
              plan.isHighlighted ? "bg-[#f6f6fe]" : "bg-white",
              "md:flex-row md:items-center md:justify-between md:gap-6",
            )}
          >
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-3 md:w-[160px]">
              <div className="flex items-center gap-3">
                <span className="text-[24px] font-semibold tracking-[-0.24px] text-(--color-text-brand)">{plan.priceFormatted}</span>
                <SaudiRiyal className="size-8 shrink-0 fill-(--color-text-brand) text-(--color-text-brand)" aria-hidden />
              </div>

              <div className="flex items-start gap-6 text-[14px] font-medium text-(--color-text-brand)">
                <span className="shrink-0">{plan.durationWeeksLabel}</span>
                <span className="shrink-0">{plan.sessionsCountLabel}</span>
              </div>
            </div>

            <div className={cn("flex flex-2 flex-col gap-2.5")}>
              <p className="text-xs font-medium text-(--color-text-secondary)">{section.includesLabel}</p>

              <div className={cn("flex flex-wrap gap-2")}>
                {plan.includes.map((item) => (
                  <div key={item} className="inline-flex items-center gap-1.5 text-[12px] font-medium text-(--color-text-secondary)">
                    <Check className="size-4 shrink-0 fill-primary text-white mt-0.5" aria-hidden />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={plan.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handlePlanReservation(e, plan.durationWeeksLabel, plan.ctaHref)}
              className="inline-flex h-[44px] items-center justify-center rounded-[8px] bg-primary px-[20px] py-0 text-base font-medium text-white hover:bg-primary/90 md:self-auto"
            >
              {plan.ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
