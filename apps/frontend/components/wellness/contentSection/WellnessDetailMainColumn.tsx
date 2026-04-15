import type { WellnessDetailMainContent, WellnessPageSectionsContent } from "@/types/welness";
import dynamic from "next/dynamic";

const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });
const WellnessDetailAboutCard = dynamic(() => import("./Cards/WellnessDetailAboutCard").then((m) => m.WellnessDetailAboutCard), { ssr: true });
const WellnessDetailSpecialtiesCard = dynamic(() => import("./Cards/WellnessDetailSpecialtiesCard").then((m) => m.WellnessDetailSpecialtiesCard), { ssr: true });
const WellnessDetailFacilitiesCard = dynamic(() => import("./Cards/WellnessDetailFacilitiesCard").then((m) => m.WellnessDetailFacilitiesCard), { ssr: true });
const WellnessDetailServiceCard = dynamic(() => import("./Cards/WellnessDetailServiceCard").then((m) => m.default), { ssr: true });
const WellnessDetailPackagesCard = dynamic(() => import("./Cards/WellnessDetailPackagesCard").then((m) => m.WellnessDetailPackagesCard), { ssr: true });
const WellnessDetailFavFeaturesCard = dynamic(() => import("./Cards/WellnessDetailFavFeaturesCard").then((m) => m.WellnessDetailFavFeaturesCard), { ssr: true });

type WellnessDetailTestimonialsAndFaqPayload = Pick<WellnessPageSectionsContent, "testimonials" | "faq">;

export type WellnessDetailMainColumnProps = {
  main: WellnessDetailMainContent;
  isRtl: boolean;
  locale: string;
  testimonialsAndFaq: WellnessDetailTestimonialsAndFaqPayload;
};

export function WellnessDetailMainColumn({ main, isRtl, locale, testimonialsAndFaq }: WellnessDetailMainColumnProps) {
  const { testimonials, faq } = testimonialsAndFaq;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <WellnessDetailAboutCard main={main} isRtl={isRtl} />
      <WellnessDetailSpecialtiesCard main={main} isRtl={isRtl} />
      <WellnessDetailFacilitiesCard main={main} isRtl={isRtl} />
      <WellnessDetailServiceCard main={main} isRtl={isRtl} />
      <WellnessDetailPackagesCard main={main} isRtl={isRtl} />
      <WellnessDetailFavFeaturesCard main={main} isRtl={isRtl} />
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
    </div>
  );
}
