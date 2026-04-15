"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { logAndOpenWhatsapp } from "@/lib/reservations";
import { cn } from "@/lib/utils";
import type { WellnessDetailSidebarContent } from "@/types/welness";
import { SaudiRiyal, Star } from "lucide-react";
import Link from "next/link";

export type WellnessDetailSidebarProps = {
  sidebar: WellnessDetailSidebarContent;
  isRtl: boolean;
};

export function WellnessDetailSidebar({ sidebar, isRtl }: WellnessDetailSidebarProps) {
  const handleReserveClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await logAndOpenWhatsapp(
      {
        source: "wellness_detail_sidebar",
        reservation_type: "provider",
        item_name: sidebar.centerName,
        provider_name: sidebar.centerName,
      },
      sidebar.whatsappHref,
    );
  };

  return (
    <aside className={cn("flex  flex-col gap-6  rounded-[20px] border border-black/6 bg-white p-6 shadow-[0_4px_24px_rgba(15,17,20,0.06)] ")}>
      <h2 className="text-xl font-bold leading-tight text-(--color-accent-rose) md:text-[22px]">{sidebar.centerName}</h2>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-(--color-text-secondary)">{sidebar.startsFromLabel}</p>
        <p className="text-3xl font-bold tracking-tight text-primary md:text-4xl flex items-center gap-1">
          {sidebar.priceFormatted}
          <SaudiRiyal className="size-8 shrink-0 fill-primary text-primary" aria-hidden />
        </p>
        <p className="text-sm text-(--color-text-secondary)">{sidebar.perSessionLabel}</p>
      </div>

      <div className="h-px w-full bg-(--color-border-subtle)" aria-hidden />

      <dl className="flex flex-col gap-4">
        <div className={cn("flex flex-wrap items-start justify-between gap-3 text-sm")}>
          <dt className="shrink-0 font-medium text-(--color-text-secondary)">{sidebar.locationLabel}</dt>
          <dd className={cn("max-w-[min(100%,240px)] font-medium text-(--color-text-primary)")}>{sidebar.locationLine}</dd>
        </div>

        <div className={cn("flex flex-wrap items-center justify-between gap-3 text-sm")}>
          <dt className="shrink-0 font-medium text-(--color-text-secondary)">{sidebar.ratingLabel}</dt>
          <dd className="flex items-center gap-1.5 font-semibold text-(--color-text-brand) text-start">
            <span className="text-start mt-1">{sidebar.rating}</span>
            <Star className="size-4 fill-primary text-primary" aria-hidden />
          </dd>
        </div>
      </dl>

      <div className="h-px w-full bg-(--color-border-subtle)" aria-hidden />

      <div className="flex flex-col gap-3">
        <Button asChild className="h-12 w-full rounded-xl bg-primary text-base font-medium text-white hover:bg-primary/90">
          <Link
            href={sidebar.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleReserveClick}
            className={cn("inline-flex items-center justify-center gap-2")}
          >
            <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {sidebar.whatsappLabel}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 w-full rounded-xl border-primary/35 bg-white text-base font-medium text-(--color-text-brand) hover:bg-primary/5"
        >
          <Link href={sidebar.phoneHref}>{sidebar.contactLabel}</Link>
        </Button>
      </div>
    </aside>
  );
}
