import { cn } from "@/lib/utils";
import { DetailCard } from "./DetailCard";
import type { WellnessDetailMainContent } from "@/types/welness";

type WellnessDetailSpecialtiesCardProps = {
  main: Pick<WellnessDetailMainContent, "specialtiesTitle" | "specialtiesSubtitle" | "specialtyTags">;
  isRtl: boolean;
};

export function WellnessDetailSpecialtiesCard({ main, isRtl }: WellnessDetailSpecialtiesCardProps) {
  return (
    <DetailCard>
      <div className={cn("mb-2 flex items-center gap-2.5")}>
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
