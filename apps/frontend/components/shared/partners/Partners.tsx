import { cn } from "@/lib/utils";
import type { PartnerItem } from "@/types/global";
import Image from "next/image";
import { PartnerCard } from "./PartnerCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";

type OurPartnersProps = {
  locale: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  partners: PartnerItem[];
};

export function OurPartners({ locale, title, subtitle, partners }: OurPartnersProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="relative">
        <div className={cn("section-heading-stack mb-12 md:mb-16", isRtl ? "text-right" : "text-left")}>
          <h2 className="relative text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand) inline-flex items-center gap-2 flex-wrap">
            {title}
            <Image src="/cursor.svg" alt="Partners highlight" width={28} height={28} className={cn("shrink-0 mt-6", !isRtl && "transform rotate-270")} aria-hidden />
          </h2>
          {subtitle != null && subtitle.trim() !== "" && (
            <p className={cn("text-base md:text-xl w-full max-w-[1000px]", "text-(--color-text-secondary)", isRtl ? "text-right" : "text-left")}>{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)]">
              <PartnerCard partner={partner} />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
