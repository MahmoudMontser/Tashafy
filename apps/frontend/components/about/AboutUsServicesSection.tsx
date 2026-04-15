import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { AboutUsServicesContent } from "@/types/about";

export type AboutUsServicesSectionProps = {
  locale: string;
  content: AboutUsServicesContent;
};

const SERVICE_MASK = "/about/service-icon-mask.png";

export default function AboutUsServicesSection({ locale, content }: AboutUsServicesSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="w-full border-b border-[#e9ebf0] bg-white px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-32"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="about-services-heading"
    >
      <SectionContainer className="flex flex-col gap-12">
        <div className={cn("relative flex flex-col gap-6")}>
          <h2 id="about-services-heading" className="text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-(--color-text-brand)">
            {content.titleRest}
            <span className="relative inline-block">
              <span className="absolute -inset-x-1 -top-0.5 bottom-[-4px] rounded-[2px] bg-[#fee2e2]" aria-hidden />
              <span className="relative">{content.titleHighlight}</span>
            </span>
          </h2>
          <p className="max-w-3xl text-lg leading-7 text-[#4e5663]">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <article key={card.title} className={cn("flex flex-col gap-4 rounded-[24px] bg-[#f9fafc] px-6 py-6 shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)]")}>
              <div
                className="size-12 shrink-0 bg-[#7e22ce]"
                style={{
                  WebkitMaskImage: `url(${SERVICE_MASK})`,
                  maskImage: `url(${SERVICE_MASK})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-medium leading-8 text-(--color-text-brand)">{card.title}</h3>
                <p className="text-base leading-6 text-(--color-text-secondary)">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
