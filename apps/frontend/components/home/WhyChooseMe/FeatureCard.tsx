import { cn } from "@/lib/utils";
import type { WhyChooseFeature } from "@/types/home";

import { Tag, Building2, Smile, Star } from "lucide-react";

const iconMap = {
  tag: Tag,
  building: Building2,
  smile: Smile,
  star: Star,
};

type FeatureCardProps = {
  feature: WhyChooseFeature;
  isRtl: boolean;
};

export function FeatureCard({ feature, isRtl }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon];

  return (
    <div className={cn("flex items-start gap-3 sm:gap-4", isRtl && "flex-row-reverse")}>
      <div
        className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-white border border-(--color-border-subtle) flex items-center justify-center"
        aria-hidden
      >
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-(--color-text-brand)" />
      </div>
      <div className={cn("min-w-0 flex-1", isRtl ? "text-right" : "text-left")}>
        <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-(--color-text-brand)">{feature.title}</h3>
        <p className="mt-1 text-sm sm:text-base md:text-lg text-(--color-text-secondary)  text-pretty">{feature.subtitle}</p>
      </div>
    </div>
  );
}
