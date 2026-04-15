import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { FaqItem } from "@/types/global";

type FaqSectionProps = {
  locale: string;
  title: string;
  intro: string;
  items: FaqItem[];
  backgroundClassName?: string;
};
export function FaqSection({ locale, title, intro, items, backgroundClassName }: FaqSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className={cn("relative bg-white w-full overflow-hidden py-12 md:py-16 lg:py-24", backgroundClassName)} dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-start">
          {/* Header column: title + intro — aligns to start (right in RTL, left in LTR) */}
          <div className={cn("section-heading-stack w-full", isRtl ? "text-right" : "text-left")}>
            <h2 className={cn("text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand)", isRtl ? "text-right" : "text-left")}>{title}</h2>
            {intro != null && intro.trim() !== "" && (
              <p className={cn("text-base md:text-xl w-full max-w-[1000px]", "text-(--color-text-secondary)", isRtl ? "text-right" : "text-left")}>{intro}</p>
            )}
          </div>

          {/* Accordion column */}
          <div className="flex flex-col w-full">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full border-t border-t-[#e5e7eb] ">
              {items.map((item, index) => (
                <AccordionItem key={`${item.question}-${index}`} value={`item-${index}`} className="border-b border-[#e5e7eb] last:border-b-0">
                  <AccordionTrigger
                    className={cn(
                      "cursor-pointer py-3 text-base md:text-lg font-semibold text-(--color-text-primary) hover:no-underline [&[data-state=open]>svg]:rotate-180 gap-3",
                      isRtl ? "flex-row-reverse text-right" : "text-left",
                    )}
                  >
                    <span className="flex-1 min-w-0 ">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={cn("pb-3 text-sm md:text-base text-(--color-text-secondary) ", isRtl ? "text-right" : "text-left")}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
