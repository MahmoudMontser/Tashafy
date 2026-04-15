import type { FreeConsultationHeroContent } from "@/types/freeConsultation";
import Image from "next/image";

export type FreeConsultationHeroSectionProps = {
  locale: string;
  content: FreeConsultationHeroContent;
};

export default function HeroSection({ locale, content }: FreeConsultationHeroSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full bg-transparent px-4 py-12 md:py-16" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="free-consultation-hero-heading">
      <div className="mx-auto flex w-full max-w-[1416px] flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 id="free-consultation-hero-heading" className="max-w-4xl text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">
            <span className="inline-block">
              {content.titleBefore}
              <span className="relative inline-block pb-2 align-baseline">
                <span className="relative z-1">{content.titleHighlight}</span>
                <span className="pointer-events-none absolute bottom-0 left-1/2 w-[min(200px,70vw)] max-w-[220%] -translate-x-1/2" aria-hidden>
                  <Image src={content.underlineSrc} alt={content.underlineAlt} width={200} height={6} unoptimized className="h-auto w-full object-contain" />
                </span>
              </span>
              {content.titleAfter}
            </span>
          </h1>

          <div className="max-w-[535px]">
            <p className="text-sm leading-5 text-[#4e5663]">{content.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
