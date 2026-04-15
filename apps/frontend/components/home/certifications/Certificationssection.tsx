import { CertificationCard } from "@/components/home/certifications/CertificationCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { CertificationItem } from "@/types/home";
import Image from "next/image";

type CertificationsSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  certifications: CertificationItem[];
};
export function Certificationssection({ locale, title, subtitle, certifications }: CertificationsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="relative">
        <div className={cn("section-heading-stack mb-12 md:mb-16", isRtl ? "text-right" : "text-left")}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand) w-fit">
            {title}
            <Image
              className="md:ms-auto ms-0"
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
            <p className={cn("text-base md:text-xl w-full max-w-[1000px]", "text-muted-foreground dark:text-muted-foreground", isRtl ? "text-right" : "text-left")}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {certifications.map((certification, index) => (
            <div key={`${certification.name}-${index}`} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-1.125rem)]">
              <CertificationCard certification={certification} />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
