import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import type { AboutUsMissionContent } from "@/types/about";
import Image from "next/image";
import Link from "next/link";

export type AboutUsMissionSectionProps = {
  locale: string;
  content: AboutUsMissionContent;
};

export default function AboutUsMissionSection({ locale, content }: AboutUsMissionSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full bg-white pb-16 md:pb-20 lg:pb-24" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="about-mission-heading">
      <SectionContainer className="px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="flex flex-col items-center justify-between gap-12 py-12 md:py-16 lg:flex-row lg:gap-16 lg:py-[96px]">
          <div className="flex w-full max-w-[533px] flex-col gap-10 text-start">
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-semibold leading-7 tracking-[-0.24px] text-(--color-accent-rose)">{content.label}</p>
              <h2 id="about-mission-heading" className="text-[32px] font-semibold leading-[44px] tracking-[-0.64px] text-(--color-text-brand)">
                {content.title}
              </h2>
              <p className="text-sm leading-5 text-(--color-text-secondary)">{content.description}</p>
            </div>

            <ul className="flex flex-col gap-3.5 text-sm font-medium leading-5 text-(--color-text-primary)">
              {content.bullets.map((line) => (
                <li
                  key={line}
                  className="relative ps-5 before:absolute before:start-0 before:top-[0.45em] before:size-1.5 before:rounded-full before:bg-(--color-text-primary)"
                >
                  {line}
                </li>
              ))}
            </ul>

            <Button asChild className="h-14 w-fit text-white bg-(--color-text-brand) min-w-[160px] rounded-lg px-6 text-base font-medium">
              <Link href={content.ctaHref}>{content.ctaLabel}</Link>
            </Button>
          </div>

          <div className="relative h-[min(52vh,480px)] w-full max-w-[565px] shrink-0">
            <div className="absolute inset-[1%_4%_5%_3%] z-0">
              <Image src="/about/mission-stroke.svg" alt="" fill className="object-contain object-top-left" sizes="565px" />
            </div>
            <div
              className="absolute inset-[12%_0.1%_0.1%_0.1%] z-1"
              style={{
                WebkitMaskImage: "url(/about/mission-image-mask.svg)",
                maskImage: "url(/about/mission-image-mask.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              <Image src={content.imageSrc} alt={content.imageAlt} fill className="object-cover object-center" sizes="(min-width: 1024px) 520px, 90vw" priority />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
