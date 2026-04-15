"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { logAndOpenWhatsapp } from "@/lib/reservations";
import { cn } from "@/lib/utils";
import type { ProgramDetailSidebarContent } from "@/types/programs";
import { CircleCheck, SaudiRiyal } from "lucide-react";
import Link from "next/link";

export type ProgramDetailSidebarProps = {
  sidebar: ProgramDetailSidebarContent;
  isRtl: boolean;
};

export function ProgramDetailSidebar({ sidebar, isRtl }: ProgramDetailSidebarProps) {
  const handleReserveClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await logAndOpenWhatsapp(
      {
        source: "program_detail_sidebar",
        reservation_type: "program",
        item_name: sidebar.centerName,
        provider_name: sidebar.centerName,
      },
      sidebar.whatsappHref,
    );
  };

  return (
    <aside className="flex w-full min-w-0 flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]">
      <h2 className={cn("w-full text-[28px] font-semibold leading-8 tracking-[-0.56px] text-[#c92044]", isRtl ? "text-end" : "text-start")}>{sidebar.centerName}</h2>

      <div className={cn("flex flex-col gap-2")}>
        <div dir={isRtl ? "rtl" : "ltr"} className="flex flex-row items-center gap-3">
          <p className="text-[32px] font-semibold leading-9 tracking-[-0.64px] text-(--color-text-brand)">{sidebar.priceFormatted}</p>
          <SaudiRiyal className="size-8 shrink-0 fill-(--color-text-brand) text-(--color-text-brand)" aria-hidden />
        </div>
        <p className={cn("text-sm text-(--color-text-secondary)")}>{sidebar.perSessionLabel}</p>
      </div>

      <div className="h-px w-full bg-(--color-border-subtle)" aria-hidden />

      <ul className="flex flex-col gap-3" dir={isRtl ? "rtl" : "ltr"}>
        {sidebar.packageFeatures?.map((line) => (
          <li key={line} className="flex items-center gap-1 text-sm font-medium text-(--color-text-secondary)">
            <CircleCheck className="size-3 shrink-0 fill-primary text-white" strokeWidth={2.25} aria-hidden />
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ul>

      <div className="h-px w-full bg-(--color-border-subtle)" aria-hidden />

      <Button asChild className="h-14 w-full gap-1 rounded-lg bg-primary text-base font-medium text-white hover:bg-primary/90">
        <Link href={sidebar.whatsappHref} target="_blank" rel="noopener noreferrer" onClick={handleReserveClick} className="inline-flex items-center justify-center gap-1">
          <span>{sidebar.whatsappLabel}</span>
          <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </Link>
      </Button>
    </aside>
  );
}
