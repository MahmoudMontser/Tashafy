import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import type { AboutUsCoreValuesContent } from "@/types/about";
import Image from "next/image";

export type AboutUsCoreValuesSectionProps = {
  locale: string;
  content: AboutUsCoreValuesContent;
};

export default function AboutUsCoreValuesSection({ locale, content }: AboutUsCoreValuesSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full bg-white px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-[160px]" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="about-core-values-heading">
      <SectionContainer className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2
            id="about-core-values-heading"
            className="flex flex-wrap items-baseline justify-center gap-x-0 text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-(--color-text-brand)"
          >
            <span className="relative inline-block px-0.5">
              <span className="absolute -inset-x-1 -top-1.5 bottom-[-6px] rounded-[2px] bg-[#fee2e2]" aria-hidden />
              <span className="relative">{content.titleHighlight}</span>
            </span>
            <span>{content.titleRest}</span>
          </h2>
          <p className="text-lg font-medium leading-6 text-[#4e5663]">{content.subtitle}</p>
        </div>

        <div className="relative w-full rounded-[20px] bg-[#282464] px-6 py-10 md:px-8 md:py-12">
          <div
            className="pointer-events-none absolute -top-5 inset-s-4 rtl:inset-e-4 flex h-[115px] w-[165px] items-center justify-center sm:inset-e-6 md:inset-e-8"
            aria-hidden
          >
            <div className="rotate-y-180 rtl:rotate-y-0">
              <Image src="/about/core-values-highlight.svg" alt="" width={152} height={91} unoptimized className="max-w-[min(140px,35vw)] h-auto" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {content.items.map((item) => {
              const s = item.iconSize ?? 32;
              return (
                <div key={item.title} className="flex flex-col items-center gap-4 text-center">
                  <div className="relative flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#433ca6] py-[15px]">
                    <Image src={item.iconSrc} alt="" width={s} height={s} unoptimized className="h-[34px] w-[34px] object-contain object-center" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold leading-7 tracking-[-0.24px] text-white">{item.title}</h3>
                    <p className="text-base leading-6 text-[#9fa5b2]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
