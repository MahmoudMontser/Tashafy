import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { AboutUsVisionContent } from "@/types/about";
import Image from "next/image";

export type AboutUsVisionSectionProps = {
  locale: string;
  content: AboutUsVisionContent;
};

export default function AboutUsVisionSection({ locale, content }: AboutUsVisionSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="about-vision-heading">
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-[64px]">
          <div className="relative mx-auto w-full max-w-[557px] shrink-0 lg:mx-0 lg:justify-self-start">
            <div className="relative aspect-557/565 w-full min-h-[280px] sm:min-h-[360px]">
              {/* Vector — inset & rotate match dev mode */}
              <div className="pointer-events-none absolute inset-[-9.73%_-4.65%_-1.46%_1.16%] z-0 flex items-center justify-center overflow-visible">
                <div className="flex h-[81%] w-[94.5%] max-h-[455px] max-w-[528px] shrink-0 rotate-75 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="497" height="501" viewBox="0 0 497 501" fill="none">
                    <path
                      d="M418.472 237.208C463.732 256.363 486.909 286.181 493.003 318.848C499.102 351.546 488.114 387.239 464.752 418.153C418.032 479.978 321.975 522.489 215.221 483.341C108.354 444.151 37.968 367.41 12.513 282.8C-12.9385 198.202 6.50864 105.682 79.4114 34.823C95.8594 18.8359 111.667 9.27653 126.947 4.84061C142.22 0.406724 157.007 1.08033 171.443 5.62435C200.353 14.7251 227.86 39.3488 254.913 69.6133C268.43 84.7347 281.814 101.239 295.189 117.88C308.561 134.517 321.924 151.292 335.387 166.933C362.297 198.195 389.685 225.025 418.472 237.208Z"
                      stroke="#FCA5A5"
                      strokeWidth="3.75734"
                      strokeDasharray="7.51 7.51"
                    />
                  </svg>
                </div>
              </div>

              <div
                className="pointer-events-none absolute left-[0.5%] top-[43%] z-1 size-[min(78vw,341px)] rounded-full border-[3px] border-dashed border-[#433ca6] max-sm:left-1/2 max-sm:top-[38%] max-sm:-translate-x-1/2 sm:left-[3px]"
                aria-hidden
              />

              <div
                className={cn(
                  "absolute z-2 overflow-hidden border-4 border-(--color-border-subtle) shadow-[0px_10px_10px_-5px_rgba(15,17,20,0.06),0px_20px_25px_-5px_rgba(15,17,20,0.08)]",
                  "left-[3%] right-[8%] top-[calc(50%+34px)] h-[min(72vw,495px)] max-h-[495px] -translate-y-1/2 sm:left-[17px] sm:right-[45px] sm:h-[495px]",
                  "rounded-tl-[120px] rounded-tr-[48px] rounded-br-[120px] rounded-bl-[48px]",
                )}
              >
                <Image src={content.imageSrc} alt={content.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 500px, 90vw" priority />
              </div>
            </div>
          </div>

          <div className={cn("flex max-w-xl flex-col lg:justify-self-end lg:self-center")}>
            <div className="flex w-full flex-col gap-3">
              <p className="text-2xl font-semibold leading-7 tracking-[-0.24px] text-(--color-accent-rose) whitespace-nowrap">{content.label}</p>

              <div className={cn("flex w-full flex-col gap-10")}>
                <h2 id="about-vision-heading" className={cn("text-[32px] font-semibold leading-[44px] tracking-[-0.64px] text-(--color-text-brand)")}>
                  {content.title}
                </h2>
                <p className={cn("text-sm leading-5 text-(--color-text-secondary)")}>{content.description}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
