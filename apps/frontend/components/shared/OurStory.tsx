import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import { OurStoryStat } from "@/types/global";
import Image from "next/image";
import { memo } from "react";

export type OurStoryProps = {
  locale: string;
  title: string;
  subtitle: string;
  stats: OurStoryStat[];
};

export const OurStory = memo(function OurStory({ locale, title, subtitle, stats }: OurStoryProps) {
  const isRtl = locale === "ar";
  // RTL: show 1000+, 99%, 200+ right-to-left (closest to heading = 1000+)
  const displayStats = isRtl ? [...stats].reverse() : stats;

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_400px]"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ backgroundColor: "#FCE7F3" }}
    >
      <SectionContainer className="relative">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className={cn("flex flex-1 flex-col max-w-xl section-heading-stack")}>
            <div className="flex items-center gap-2 relative">
              <Image
                src="/our-story.svg"
                alt="Our Story"
                width={86}
                height={60}
                className={cn(
                  "absolute bottom-5 sm:bottom-5 md:bottom-8 mb-3 w-14 h-auto md:w-20 transform-3d",
                  isRtl ? "-right-5 sm:-right-10 md:-right-12" : "-left-5 sm:-left-10 md:-left-12 transform-[rotateY(180deg)]",
                )}
                loading="lazy"
                decoding="async"
                aria-hidden
              />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand)">{title}</h2>
            </div>
            <p className="text-lg md:text-xl max-w-full text-(--color-text-secondary)">{subtitle}</p>
          </div>

          <div className={cn("flex w-full items-center justify-center flex-1 flex-wrap gap-8 lg:gap-12")}>
            {displayStats.map((stat) => (
              <div key={stat.label} className={cn("flex flex-col items-center justify-center")}>
                <span className="text-3xl md:text-6xl font-bold text-secondary tabular-nums ">{stat.value}</span>
                <span className="text-sm md:text-xl text-(--color-text-secondary) mt-1.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});
