import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { wellnessHeroUnderline } from "@/data/icons";
import { HeroBackground } from "./HeroBackground";
import { HeroGallery } from "./HeroGallery";

type MainSectionProps = {
  locale: string;
  labels: NavLabels;
  title: string;
  subtitle: string;
  browseCentersLabel: string;
  browseCentersHref: string;
  searchPlaceholder: string;
  loadingLabel?: string;
  floatingCardTitle: string;
  floatingCardDescription: string;
};

export default function MainSection({
  locale,
  labels,
  title,
  subtitle,
  browseCentersLabel,
  browseCentersHref,
  searchPlaceholder,
  loadingLabel,
  floatingCardTitle,
  floatingCardDescription,
}: MainSectionProps) {
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
          <SectionContainer className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-20">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,644px)] lg:gap-12 xl:gap-16">
              <div className={cn("flex flex-col gap-7")}>
                <div className={cn("flex max-w-[599px] flex-col gap-3")}>
                  <h1 className="text-3xl font-semibold tracking-[-0.72px] text-white md:text-4xl lg:text-4xl lg:leading-[44px]">{title}</h1>
                  <div className={cn("relative h-[14px] w-[min(190px,50vw)]")} aria-hidden>
                    {wellnessHeroUnderline()}
                  </div>
                  <p className="max-w-[443px] text-lg leading-7 text-(--color-text-inactive-subtle) md:text-[18px]">{subtitle}</p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className={
                    "h-14 w-fit gap-2 rounded-lg border-(--color-border-input) bg-white px-6 text-base font-medium text-(--color-text-primary) shadow-[0_1px_2px_0_rgba(15,17,20,0.06)] hover:bg-white/95"
                  }
                >
                  <Link href={browseCentersHref} className={cn("inline-flex items-center gap-2")}>
                    {browseCentersLabel}
                    <Chevron className="size-5 shrink-0" aria-hidden />
                  </Link>
                </Button>
              </div>

              <div className="">
                <HeroGallery isRtl={isRtl} floatingTitle={floatingCardTitle} floatingDescription={floatingCardDescription} />
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}
