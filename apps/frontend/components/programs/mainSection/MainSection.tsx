import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import type { ProgramsPageHeroContent } from "@/types/programs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { wellnessHeroUnderline } from "@/data/icons";
import { HeroBackground } from "./HeroBackground";
import { ProgramsHeroVisual } from "./ProgramsHeroVisual";

type MainSectionProps = {
  locale: string;
  labels: NavLabels;
  hero: ProgramsPageHeroContent;
  searchPlaceholder: string;
  loadingLabel?: string;
};

export default function MainSection({ locale, labels, hero, searchPlaceholder, loadingLabel }: MainSectionProps) {
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section
      id="main-section"
      className="relative isolate z-50 flex min-h-screen w-[99%] flex-col items-center justify-start overflow-hidden rounded-b-[36px] scroll-smooth"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="z-50 mx-auto w-full shrink-0 px-4 sm:w-[96%] sm:px-0">
        <Navbar className="navbar" locale={locale} labels={labels} searchPlaceholder={searchPlaceholder} loadingLabel={loadingLabel} />
      </div>

      <div className="container min-h-0 w-full flex-1 overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 mx-auto flex min-h-[min(840px,90vh)] w-full flex-col">
          <SectionContainer className="flex flex-1 flex-col justify-center px-4 py-12 md:py-16 lg:py-20">
            <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className={cn("flex max-w-[600px] flex-col gap-5 text-start lg:max-w-none")}>
                <h1 className="text-3xl font-semibold tracking-[-0.72px] text-white md:text-4xl lg:text-[36px] lg:leading-[44px]">{hero.title}</h1>
                <div className="relative h-[14px] w-[min(258px,85%)]" aria-hidden>
                  {wellnessHeroUnderline()}
                </div>
                <p className="text-xl font-semibold tracking-[-0.24px] text-white md:text-2xl md:leading-7">{hero.tagline}</p>
                <p className="max-w-[600px] text-base leading-7 text-(--color-text-inactive-subtle) md:text-lg md:leading-7">{hero.description}</p>

                <div className="flex flex-wrap items-stretch gap-x-10 gap-y-4 pt-1 sm:gap-x-14">
                  {hero.stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="flex min-w-[5.5rem] flex-col gap-1 text-start text-white">
                      <span className="text-lg font-bold leading-7">{stat.value}</span>
                      <span className="text-sm font-normal leading-5">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="h-14 gap-2 rounded-lg border-(--color-text-inactive-subtle) bg-white px-6 text-base font-medium text-(--color-text-primary) shadow-[0_1px_2px_0_rgba(15,17,20,0.06)] hover:bg-white/95"
                  >
                    <Link href={hero.ctaHref} className={cn("inline-flex items-center gap-2")}>
                      {hero.ctaLabel}
                      <Chevron className="size-6 shrink-0" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-center">
                <ProgramsHeroVisual src={hero.heroImageSrc} alt={hero.heroImageAlt} />
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}
