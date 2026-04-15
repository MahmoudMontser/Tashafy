import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/types/global";
import Image from "next/image";
import { memo } from "react";

type TestmoialsCardProps = {
  testimonial: TestimonialItem;
  isRtl: boolean;
  durationLabel: string;
  countryLabel: string;
};

export const TestmoialsCard = memo(function TestmoialsCard({ testimonial, isRtl, durationLabel, countryLabel }: TestmoialsCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-[576px] shrink-0 rounded-3xl border-(--color-border-subtle) bg-white p-6 sm:p-8",
        "shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 ease-in-out",
        "hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]",
      )}
    >
      <CardContent className="flex flex-col gap-6 sm:gap-8 p-0">
        <div className={cn("flex items-center gap-2.5")}>
          <div className={cn("h-12 w-12 shrink-0 rounded-full overflow-hidden flex items-center justify-center", testimonial.avatarBgClass)}>
            <Image src={testimonial.avatar} alt={testimonial.name} className="h-8 w-8 object-cover" width={32} height={32} />
          </div>
          <div className={cn("flex flex-col gap-0.5 min-w-0", isRtl ? "items-end text-right" : "items-start text-left")}>
            <p className="text-xl font-medium text-(--color-text-brand) ">{testimonial.name}</p>
            <p className="text-sm font-bold text-(--color-text-secondary)  max-w-52">{testimonial.role}</p>
          </div>
        </div>
        <p className={cn("text-lg font-medium text-(--color-text-brand) ", isRtl ? "text-right" : "text-left")}>{testimonial.quote}</p>
        <div className="flex items-center gap-12 sm:gap-16 justify-start h-[50px]">
          <div className={cn("flex flex-col gap-1 min-w-0")}>
            <span className="text-sm font-bold text-(--color-text-secondary-inverse) ">{durationLabel}</span>
            <span className="text-sm font-bold text-(--color-text-accent) ">{testimonial.duration}</span>
          </div>
          <div className={cn("flex flex-col gap-1 min-w-0 max-w-44")}>
            <span className="text-sm font-bold text-(--color-text-secondary-inverse) ">{countryLabel}</span>
            <span className="text-sm font-bold text-(--color-text-accent) ">{testimonial.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
