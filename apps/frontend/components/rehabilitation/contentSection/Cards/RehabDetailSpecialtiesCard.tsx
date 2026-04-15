import { cn } from "@/lib/utils";
import type { RehabilitationDetailMainContent } from "@/types/rehabilitation";
import { Star } from "lucide-react";

import { DetailCard } from "./DetailCard";

type RehabDetailSpecialtiesCardProps = {
  main: Pick<RehabilitationDetailMainContent, "specialtiesTitle" | "specialtiesSubtitle" | "specialtyTags">;
  isRtl: boolean;
};

export function RehabDetailSpecialtiesCard({ main, isRtl }: RehabDetailSpecialtiesCardProps) {
  return (
    <DetailCard>
      <div className={cn("mb-2 flex items-center gap-2.5")}>
        <Star className="size-7 shrink-0 fill-primary/20 text-primary" aria-hidden />
        <h2 className="text-2xl font-bold tracking-tight text-(--color-text-brand) md:text-[26px]">{main.specialtiesTitle}</h2>
      </div>

      <p className="mb-5 text-sm text-(--color-text-secondary) md:text-base">{main.specialtiesSubtitle}</p>

      <ul className="flex flex-wrap gap-2.5">
        {main.specialtyTags.map((tag) => (
          <li key={tag} className="inline-flex items-center rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-(--color-text-primary)">
            {tag}
          </li>
        ))}
      </ul>
    </DetailCard>
  );
}
