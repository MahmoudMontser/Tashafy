import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MedicalCenterItem } from "@/types/global";
import { MapPin, SaudiRiyal, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type MedicalCenterCardProps = {
  center: MedicalCenterItem;
  isRtl: boolean;
  startsFromLabel: string;
  locale: string;
  detailsSegment?: string;
};

function buildLearnAboutUrl(locale: string, center: MedicalCenterItem, detailsSegment?: string): string {
  if (detailsSegment && center.detailId) {
    return `/${locale}/${detailsSegment}/${encodeURIComponent(center.detailId)}`;
  }
  const path = center.learnAboutHref.replace(/^\//, "");
  return `/${locale}/${path}`;
}

export const MedicalCenterCard = memo(function MedicalCenterCard({ center, isRtl, startsFromLabel, locale, detailsSegment }: MedicalCenterCardProps) {
  const countTag = center.serviceTags.find((tag) => /^\+\d+$/.test(tag));
  const regularTags = center.serviceTags.filter((tag) => !/^\+\d+$/.test(tag));
  const orderedServiceTags = countTag ? [...regularTags, countTag] : regularTags;
  const hasImage = typeof center.image === "string" && center.image.trim().length > 0;

  return (
    <div
      className={cn(
        "w-full max-w-[450px] h-[400px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.10)]",
        "inline-flex flex-col items-stretch",
      )}
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        {hasImage ? (
          <Image src={center.image} alt={center.centerName} className="absolute inset-0 h-full w-full object-cover" width={384} height={300} loading="lazy" unoptimized />
        ) : (
          <div className="absolute inset-0 bg-[#F4F5F7]" aria-hidden />
        )}
        <div className="absolute inset-x-0 bottom-0 h-5 bg-linear-to-t from-[#433ca640] to-[#36308500]" />
        <div className={cn("absolute top-3 z-10 flex h-7 items-center justify-center rounded-full bg-(--color-accent-rose) px-3", !isRtl ? "right-3" : "left-3")}>
          <span className="text-sm font-medium text-pink-50">{center.badgeLabel}</span>
        </div>
      </div>

      <div className="flex  flex-col gap-4 p-3 h-[200px]">
        <div className="flex flex-col gap-2 h-[150px]">
          <div className={cn("flex items-center justify-between gap-2")}>
            <div className={cn("flex min-w-0 flex-1 flex-col gap-1")}>
              <div className={cn("flex w-full max-w-[288px] items-center gap-2")}>
                <h3 className="truncate text-lg font-bold text-(--color-text-brand)">{center.centerName}</h3>
                <div className={cn("flex items-center gap-1")}>
                  <Star className="size-3 fill-neutral-400 text-neutral-400 mb-1" aria-hidden />
                  <span className="text-xs text-(--color-text-secondary)">{center.rating}</span>
                </div>
              </div>
              <div className={cn("flex items-center gap-1 text-xs text-(--color-text-secondary)")}>
                <MapPin className="size-4 mb-1 shrink-0 text-(--color-text-secondary)" aria-hidden />
                <span className="truncate">{center.location}</span>
              </div>
            </div>

            <div className={cn("flex flex-col")}>
              <span className="text-xs text-(--color-text-secondary)">{startsFromLabel}</span>
              <div className={cn("inline-flex items-center gap-1")}>
                <span className="text-xl font-bold text-(--color-text-brand) flex items-center gap-1" aria-hidden>
                  {center.priceFormatted}
                  <SaudiRiyal className="size-4 shrink-0 text-(--color-text-brand) fill-current" aria-hidden />
                </span>
              </div>
            </div>
          </div>
          <div className={cn("flex flex-wrap justify-start items-center gap-3")}>
            {orderedServiceTags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="flex h-6 items-center justify-center rounded-full border border-(--color-border-input) bg-[#E9EBF0] px-2 text-xs font-medium  text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Button
          variant="default"
          size="lg"
          className="h-11 w-full rounded-lg border border-(--color-border-input) bg-white hover:bg-[#E0E0E0]/20 px-5 text-(--color-text-secondary) text-base font-medium shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)]"
          asChild
        >
          <Link href={buildLearnAboutUrl(locale, center, detailsSegment)}>{center.learnAboutLabel}</Link>
        </Button>
      </div>
    </div>
  );
});
