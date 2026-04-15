import { Navbar } from "@/components/shared/navbar/Navbar";
import type { AboutUsHeroContent } from "@/types/about";
import type { NavLabels } from "@/types/global";
import Image from "next/image";

export type AboutUsHeroSectionProps = {
  locale: string;
  labels: NavLabels;
  hero: AboutUsHeroContent;
  searchPlaceholder: string;
  loadingLabel?: string;
};

export default function AboutUsHeroSection({ locale, labels, hero, searchPlaceholder, loadingLabel }: AboutUsHeroSectionProps) {
  const isRtl = locale === "ar";
  const logoSrc = locale === "ar" ? "/logo_ar.svg" : "/logo_en.svg";

  return (
    <section id="main-section" className="relative isolate w-[99%] overflow-hidden rounded-b-[36px] " dir={isRtl ? "rtl" : "ltr"}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image src={"/about/aboutUs.svg"} alt="about us background image" fill className="object-cover object-center blur-[6px] scale-105" sizes="100vw" priority />
        {/* Photo-like overlay: full-bleed + mask avoids a hard seam from a partial-height blur layer */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(40, 36, 100, 0.00) 0%, rgba(40, 36, 100, 0.50) 100%)",
            filter: "blur(21px)",
            backdropFilter: "blur(0.5px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 28%, black 42%, black 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 28%, black 42%, black 100%)",
          }}
        />
        {/* Subtle vignette — full area so it blends with the layer above */}
        {/* <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(180deg, rgba(40, 36, 100, 0.00) 0%, rgba(40, 36, 100, 0.50) 100%)",
          }}
        /> */}
      </div>

      <div className="z-50 px-4 sm:px-0 sm:w-[96%] w-full mx-auto shrink-0">
        <Navbar className="navbar" locale={locale} labels={labels} searchPlaceholder={searchPlaceholder} loadingLabel={loadingLabel} />
      </div>

      <div className="relative z-10 flex min-h-[min(70vh,640px)] flex-col items-center justify-center px-4 pb-16 pt-10 md:pb-20 md:pt-14">
        <span className="sr-only">{hero.backgroundImageAlt}</span>
        <div className="flex max-w-[579px] flex-col items-center gap-4 text-center">
          <Image src={logoSrc} width={220} height={100} className="h-[69px] w-auto max-w-[min(100%,220px)]" alt={hero.logoAlt} priority />
          <p className="text-lg font-bold leading-7 text-white">{hero.tagline}</p>
        </div>
      </div>
    </section>
  );
}
