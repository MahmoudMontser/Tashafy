import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import type { RehabilitationDetailBodyContent, RehabilitationPageSectionsContent } from "@/types/rehabilitation";
import { RehabDetailMainColumn } from "./RehabDetailMainColumn";
import { RehabDetailSidebar } from "./RehabDetailSidebar";

export type ContentContainerProps = {
  locale: string;
  detail: RehabilitationDetailBodyContent;
  testimonialsAndFaq: Pick<RehabilitationPageSectionsContent, "testimonials" | "faq">;
};

export default function ContentContainer({ locale, detail, testimonialsAndFaq }: ContentContainerProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full bg-background pb-16 pt-4 md:pt-6 lg:pb-24" dir={isRtl ? "rtl" : "ltr"} aria-label={detail.sidebar.centerName}>
      <SectionContainer>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-8">
          <div className="order-2 min-w-0 lg:order-1">
            <RehabDetailMainColumn main={detail.main} isRtl={isRtl} locale={locale} testimonialsAndFaq={testimonialsAndFaq} />
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <RehabDetailSidebar sidebar={detail.sidebar} isRtl={isRtl} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
