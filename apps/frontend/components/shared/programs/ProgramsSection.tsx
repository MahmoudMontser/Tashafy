import { cn } from "@/lib/utils";
import type { ProgramItem } from "@/types/programs";
import Image from "next/image";
import { memo } from "react";
import { ProgramCard } from "./ProgramCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";

type ProgramsSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  programs: ProgramItem[];
  bookLabel: string;
  bestSellerLabel: string;
};
export const ProgramsSection = memo(function ProgramsSection({ locale, title, subtitle, programs, bookLabel, bestSellerLabel }: ProgramsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="tashafy-programs-grid"
      className="relative w-full overflow-hidden bg-muted/30 py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_800px]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SectionContainer className="relative">
        <div className="flex flex-col gap-6">
          <div className={cn("section-heading-stack relative flex-1 min-w-0", isRtl ? "text-right" : "text-left")}>
            <h2 className="text-2xl font-bold  text-(--color-text-brand) md:text-4xl lg:text-5xl">
              {title}
              <span className="inline-block">
                <Image
                  className={cn("w-7 h-7 md:w-10 md:h-10 object-contain ", !isRtl && "rotate-120")}
                  src="/Highlight_05.svg"
                  alt="Highlight"
                  width={50}
                  height={50}
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
              </span>
            </h2>
            <p className="text-lg font-normal text-(--color-text-secondary) md:text-xl w-full max-w-[1000px]">{subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={`${program.title}-${index}`}
                locale={locale}
                program={program}
                bookLabel={bookLabel}
                bestSellerLabel={bestSellerLabel}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});
