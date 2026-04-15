import type { ProgramDetailBodyContent, ProgramDetailPageSectionsContent } from "@/types/programs";
import dynamic from "next/dynamic";

const ProgramDetailMainColumn = dynamic(() => import("./ProgramDetailMainColumn").then((m) => m.ProgramDetailMainColumn), { ssr: true });
const ProgramDetailSidebar = dynamic(() => import("./ProgramDetailSidebar").then((m) => m.ProgramDetailSidebar), { ssr: true });
const SectionContainer = dynamic(() => import("@/components/shared/layout/SectionContainer").then((m) => m.SectionContainer), { ssr: true });

export type ContentContainerProps = {
  locale: string;
  detail: ProgramDetailBodyContent;
  testimonialsAndFaq: ProgramDetailPageSectionsContent;
};

export default function ContentContainer({ locale, detail, testimonialsAndFaq }: ContentContainerProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full bg-background pb-16 pt-4 md:pt-6 lg:pb-24" dir={isRtl ? "rtl" : "ltr"} aria-label={detail.sidebar.centerName}>
      <SectionContainer>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-8">
          <div className="order-2 min-w-0 lg:order-1">
            <ProgramDetailMainColumn
              about={detail.programAbout}
              services={detail.programServices}
              isRtl={isRtl}
              locale={locale}
              testimonialsAndFaq={testimonialsAndFaq}
              programExtras={detail.programExtras}
            />
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <ProgramDetailSidebar sidebar={detail.sidebar} isRtl={isRtl} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
