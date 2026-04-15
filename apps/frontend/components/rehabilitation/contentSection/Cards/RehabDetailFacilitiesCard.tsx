import { cn } from "@/lib/utils";
import type { RehabilitationDetailFacilityIcon, RehabilitationDetailMainContent } from "@/types/rehabilitation";
import { Accessibility, Building2, Car, Coffee, Dumbbell, HeartPulse, Wifi, type LucideIcon } from "lucide-react";

import { DetailCard } from "./DetailCard";

const FACILITY_ICONS: Record<RehabilitationDetailFacilityIcon, LucideIcon> = {
  parking: Car,
  cafeteria: Coffee,
  accessibility: Accessibility,
  wifi: Wifi,
  gym: Dumbbell,
  therapy: HeartPulse,
};

const FACILITY_ICON_SHELL = [
  "bg-[color-mix(in_oklab,var(--color-accent-rose)_22%,white)] text-[var(--color-accent-rose)]",
  "bg-[color-mix(in_oklab,var(--primary)_14%,white)] text-primary",
  "bg-[color-mix(in_oklab,var(--color-accent-rose)_10%,var(--primary)_10%,white)] text-(--color-text-brand)",
] as const;

type RehabDetailFacilitiesCardProps = {
  main: Pick<RehabilitationDetailMainContent, "facilitiesTitle" | "facilitiesSubtitle" | "facilities">;
  isRtl: boolean;
};

export function RehabDetailFacilitiesCard({ main }: RehabDetailFacilitiesCardProps) {
  return (
    <DetailCard>
      <div className={cn("mb-2 flex items-center gap-2.5")}>
        <h2 className="text-2xl font-bold tracking-tight text-(--color-text-brand) md:text-[26px]">{main.facilitiesTitle}</h2>
      </div>

      <p className="mb-6 text-sm text-(--color-text-secondary) md:text-base">{main.facilitiesSubtitle}</p>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {main.facilities.map((item, index) => {
          const Icon = FACILITY_ICONS[item.icon];

          return (
            <li key={`${item.title}-${index}`} className="flex flex-col gap-2.5">
              <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] text-(--color-accent-rose) [&_svg]:size-5")}>
                <Icon aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-(--color-text-brand)">{item.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </DetailCard>
  );
}
