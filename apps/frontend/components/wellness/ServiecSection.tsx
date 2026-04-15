import { Card } from "@/components/ui/card";
import { wellnessIconMap } from "@/data/wellness";
import { cn } from "@/lib/utils";
import type { WellnessServiceItem } from "@/types/welness";
import { memo } from "react";
import dynamic from "next/dynamic";

const SectionContainer = dynamic(() => import("@/components/shared/layout/SectionContainer").then((m) => m.SectionContainer), { ssr: true });

export type ServiecSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  items: WellnessServiceItem[];
};

export const ServiecSection = memo(function ServiecSection({ locale, title, subtitle, items }: ServiecSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-16 md:py-24 lg:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_500px]"
      aria-label={title}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SectionContainer className="relative flex flex-col items-center gap-6 md:gap-8">
        <div className={cn("section-heading-stack flex max-w-[631px] flex-col items-center text-center")}>
          <h2 className="text-3xl font-bold text-(--color-text-brand) md:text-5xl">{title}</h2>
          <p className="text-lg text-(--color-text-secondary) md:text-xl">{subtitle}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const Icon = wellnessIconMap[item.icon];
            return (
              <Card
                key={`${item.icon}-${item.title}`}
                className="flex min-h-[210px] flex-col items-center gap-4 border-0 bg-background px-4 py-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)] md:rounded-2xl md:py-6"
              >
                <div className="flex size-12 shrink-0 items-center justify-center text-(--color-accent-rose)" aria-hidden>
                  <Icon className="size-12 stroke-[1.5]" />
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <h3 className="text-xl font-semibold text-(--color-text-brand) md:text-2xl">{item.title}</h3>
                  <p className="text-base text-(--color-text-secondary) md:text-xl">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
});
