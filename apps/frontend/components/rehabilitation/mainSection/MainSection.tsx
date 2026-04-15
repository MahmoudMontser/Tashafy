import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar/Navbar";
import { rehabilitationMainVector } from "@/data/icons";
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
};

export default function MainSection({ locale, labels, title, subtitle, browseCentersLabel, browseCentersHref, searchPlaceholder, loadingLabel }: MainSectionProps) {
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
            <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col items-start gap-7">
                <div className="flex max-w-xl flex-col gap-3">
                  <h1 className="text-3xl font-semibold text-white md:text-4xl lg:text-[38px]">{title}</h1>
                  <div className="relative h-[14px] w-[min(190px,50vw)]" aria-hidden>
                    {rehabilitationMainVector()}
                  </div>
                  <p className="max-w-md text-lg text-(--color-text-inactive-subtle) md:text-[18px]">{subtitle}</p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className={
                    "h-14 gap-2 rounded-lg border-(--color-border-input) bg-white px-6 text-base font-medium text-(--color-text-primary) shadow-[0_1px_2px_0_rgba(15,17,20,0.06)] hover:bg-white/95"
                  }
                >
                  <Link href={browseCentersHref} className={cn("inline-flex items-center gap-2")}>
                    {browseCentersLabel}
                    <Chevron className="size-5 shrink-0" aria-hidden />
                  </Link>
                </Button>
              </div>

              <HeroGallery isRtl={isRtl} />
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}
