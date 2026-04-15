import { cn } from "@/lib/utils";
import type { DestinationItem } from "@/types/home";
import Image from "next/image";
import { memo } from "react";

type DentistCardProps = {
  destination: DestinationItem;
  centersLabel: string;
  isRtl: boolean;
};

export const DentistCard = memo(function DentistCard({ destination, centersLabel, isRtl }: DentistCardProps) {
  return (
    <div className="w-full max-w-[384px] shrink-0 inline-flex flex-col justify-start items-center">
      <div className="relative w-full aspect-380/230 overflow-hidden rounded-2xl">
        <Image src={destination.image} alt="dentist image" className="w-full h-full object-cover" width={380} height={230} loading="lazy" unoptimized />
      </div>
      <div className={cn("w-full p-5 rounded-[20px] flex flex-col gap-5 bg-muted/80", isRtl ? "items-end text-right" : "items-start text-left")}>
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-2xl font-semibold text-(--color-text-brand) ">{destination.city}</h3>
          <p className="text-base font-normal text-(--color-text-secondary) ">{destination.country}</p>
        </div>
        <div className={cn("w-full h-6 inline-flex items-center gap-1.5", isRtl ? "justify-end flex-row-reverse" : "justify-start")}>
          <span className="text-base font-medium text-(--color-text-accent) ">{centersLabel}</span>
          <span className="text-base font-medium text-(--color-text-accent) ">{destination.centersCount}</span>
        </div>
      </div>
    </div>
  );
});
