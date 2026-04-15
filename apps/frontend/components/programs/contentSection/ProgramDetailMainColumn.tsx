import type { ProgramDetailAboutContent, ProgramDetailMainExtras, ProgramDetailPageSectionsContent, ProgramDetailServicesContent } from "@/types/programs";
import dynamic from "next/dynamic";

const ProgramDetailAboutCard = dynamic(() => import("./Cards/ProgramDetailAboutCard").then((m) => m.ProgramDetailAboutCard), { ssr: true });
const ProgramDetailServiceCard = dynamic(() => import("./Cards/programDetailServiceCard").then((m) => m.default), { ssr: true });
const TestsAndAnalyses = dynamic(() => import("./Cards/TestsAndAnalyses").then((m) => m.TestsAndAnalyses), { ssr: true });
const LabsCard = dynamic(() => import("./Cards/LabsCard").then((m) => m.LabsCard), { ssr: true });
const MainDetailsCard = dynamic(() => import("./Cards/MainDetailsCard").then((m) => m.default), { ssr: true });
const TestmoialsSection = dynamic(() => import("@/components/shared/testmonials/TestmoialsSection").then((m) => m.TestmoialsSection), { ssr: true });

type ProgramDetailTestimonialsAndFaqPayload = Pick<ProgramDetailPageSectionsContent, "testimonials" | "faq">;

export type ProgramDetailMainColumnProps = {
  about: ProgramDetailAboutContent;
  services: ProgramDetailServicesContent;
  isRtl: boolean;
  locale: string;
  testimonialsAndFaq: ProgramDetailTestimonialsAndFaqPayload;
  programExtras?: ProgramDetailMainExtras | null;
};

export function ProgramDetailMainColumn({ about, services, isRtl, locale, testimonialsAndFaq, programExtras }: ProgramDetailMainColumnProps) {
  const { testimonials } = testimonialsAndFaq;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {programExtras != null && (
        <MainDetailsCard
          imageSrc={programExtras.heroImageSrc}
          imageAlt={programExtras.heroImageAlt}
          badgeLabel={programExtras.heroBadgeLabel}
          title={programExtras.heroTitle}
          subtitle={programExtras.heroSubtitle}
          isRtl={isRtl}
        />
      )}
      <ProgramDetailAboutCard content={about} isRtl={isRtl} />
      <ProgramDetailServiceCard content={services} isRtl={isRtl} />
      {programExtras != null && <TestsAndAnalyses content={programExtras.testsAnalyses} isRtl={isRtl} />}
      {programExtras != null && <LabsCard content={programExtras.labs} isRtl={isRtl} />}
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
