import { FaqSection } from "@/components/shared/FaqSection";
import { TestmoialsSection } from "@/components/shared/testmonials/TestmoialsSection";
import type { RehabilitationDetailMainContent, RehabilitationPageSectionsContent } from "@/types/rehabilitation";
import { RehabDetailAboutCard } from "./Cards/RehabDetailAboutCard";
import { RehabDetailSpecialtiesCard } from "./Cards/RehabDetailSpecialtiesCard";
import { RehabDetailFacilitiesCard } from "./Cards/RehabDetailFacilitiesCard";
import { RehabDetailPackagesCard } from "./Cards/RehabDetailPackagesCard";

type RehabDetailTestimonialsAndFaqPayload = Pick<RehabilitationPageSectionsContent, "testimonials" | "faq">;

export type RehabDetailMainColumnProps = {
  main: RehabilitationDetailMainContent;
  isRtl: boolean;
  locale: string;
  testimonialsAndFaq: RehabDetailTestimonialsAndFaqPayload;
};

export function RehabDetailMainColumn({ main, isRtl, locale, testimonialsAndFaq }: RehabDetailMainColumnProps) {
  const { testimonials, faq } = testimonialsAndFaq;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <RehabDetailAboutCard main={main} isRtl={isRtl} />
      <RehabDetailSpecialtiesCard main={main} isRtl={isRtl} />
      <RehabDetailPackagesCard main={main} isRtl={isRtl} />
      <RehabDetailFacilitiesCard main={main} isRtl={isRtl} />
      <TestmoialsSection
        locale={locale}
        title={testimonials.title}
        subtitle={testimonials.subtitle}
        durationLabel={testimonials.durationLabel}
        countryLabel={testimonials.countryLabel}
        testimonials={testimonials.testimonials}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 16 },
          768: { slidesPerView: 1.3, spaceBetween: 16 },
          1024: { slidesPerView: 1.3, spaceBetween: 16 },
          1280: { slidesPerView: 1.5, spaceBetween: 16 },
        }}
        backgroundClassName={"rounded-[20px] border border-black/6 bg-white shadow-[0_4px_24px_rgba(15,17,20,0.06)]"}
      />
      <FaqSection
        locale={locale}
        title={faq.title}
        intro={faq.intro}
        items={faq.items}
        backgroundClassName={"rounded-[20px] border border-black/6 bg-white shadow-[0_4px_24px_rgba(15,17,20,0.06)]"}
      />
    </div>
  );
}
