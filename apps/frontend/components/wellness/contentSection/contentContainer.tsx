import type { WellnessDetailBodyContent, WellnessPageSectionsContent } from "@/types/welness";
import dynamic from "next/dynamic";

const SectionContainer = dynamic(() => import("@/components/shared/layout/SectionContainer").then((m) => m.SectionContainer), { ssr: true });
const WellnessDetailMainColumn = dynamic(() => import("./WellnessDetailMainColumn").then((m) => m.WellnessDetailMainColumn), { ssr: true });
const WellnessDetailSidebar = dynamic(() => import("./WellnessDetailSidebar").then((m) => m.WellnessDetailSidebar), { ssr: true });

export type ContentContainerProps = {
  locale: string;
  detail: WellnessDetailBodyContent;
  testimonialsAndFaq: Pick<WellnessPageSectionsContent, "testimonials" | "faq">;
};

export default function ContentContainer({ locale, detail, testimonialsAndFaq }: ContentContainerProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full bg-background pb-16 pt-4 md:pt-6 lg:pb-24" dir={isRtl ? "rtl" : "ltr"} aria-label={detail.sidebar.centerName}>
      <SectionContainer>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-8">
          <div className="order-2 min-w-0 lg:order-1">
            <WellnessDetailMainColumn main={detail.main} isRtl={isRtl} locale={locale} testimonialsAndFaq={testimonialsAndFaq} />
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <WellnessDetailSidebar sidebar={detail.sidebar} isRtl={isRtl} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
