import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/home";
import Image from "next/image";
import { memo } from "react";
import { ServiceCard } from "./ServiceCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";

type OurServiceProps = {
  locale: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
  learnMoreLabel: string;
  profileImage?: string;
};

export const ServiceSection = memo(function OurService({ locale, title, subtitle, services, learnMoreLabel }: OurServiceProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_800px]" dir={isRtl ? "rtl" : "ltr"}>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 w-full from-primary/10 via-primary/3 to-transparent",
          isRtl ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
        )}
        aria-hidden
      />
      <SectionContainer className="relative">
        <div className="">
          <div className={cn("section-heading-stack mb-12 md:mb-16", isRtl ? "text-right" : "text-left")}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand) w-fit">
              {title}
              <Image
                className="ms-auto"
                src="/title-highlight.svg"
                alt="title highlight"
                width={200}
                height={24}
                sizes="200px"
                loading="lazy"
                decoding="async"
                aria-hidden
              />
            </h2>
            {subtitle != null && subtitle.trim() !== "" && (
              <p className={cn("text-base md:text-xl w-full max-w-[1000px] font-normal text-(--color-text-secondary)", isRtl ? "text-right" : "text-left")}>{subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.href} service={service} learnMoreLabel={learnMoreLabel} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
});
