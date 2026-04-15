"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { ProgramTestsAnalysesContent } from "@/types/programs";
import { Activity, FlaskConical } from "lucide-react";

export type TestsAndAnalysesProps = {
  content: ProgramTestsAnalysesContent;
  isRtl: boolean;
};

function CategoryIcon({ variant, className }: { variant: "analysis" | "test"; className?: string }) {
  if (variant === "analysis") {
    return <FlaskConical className={cn("size-6 shrink-0 text-(--color-text-brand)", className)} aria-hidden />;
  }
  return <Activity className={cn("size-6 shrink-0 text-(--color-accent-rose)", className)} aria-hidden />;
}

export function TestsAndAnalyses({ content, isRtl }: TestsAndAnalysesProps) {
  const defaultOpen = content.categories.filter((c) => c.subItems?.length).map((c) => c.id);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="program-tests-heading">
      <div className="flex flex-col gap-6">
        <div className={cn("flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between")}>
          <div className={cn("min-w-0 flex-1 space-y-1", isRtl ? "text-right" : "text-left")}>
            <h2 id="program-tests-heading" className="text-2xl font-bold tracking-[-0.56px] text-(--color-text-brand) md:text-[28px] md:leading-8">
              {content.title}
            </h2>
            <p className="text-base leading-6 text-[#9fa5b2]">{content.subtitle}</p>
          </div>

          <div className={cn("flex flex-wrap items-center gap-3")}>
            <span className="inline-flex h-7 items-center rounded-full border border-[#bebbe1] bg-[#f2f1fa] px-3 text-sm font-medium text-[#363085]">
              {content.analysesSummaryBadge}
            </span>
            <span className="inline-flex h-7 items-center rounded-full border border-[#fab9c7] bg-[#fef8f9] px-3 text-sm font-medium text-[#c92044]">
              {content.testsSummaryBadge}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e9ebf0]">
          <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
            {content.categories.map((cat) => (
              <AccordionItem key={cat.id} value={cat.id} className={cn("border-b border-[#e9ebf0] last:border-b-0", "px-0")}>
                <AccordionTrigger
                  className={cn(
                    "gap-6 py-5 px-5 hover:no-underline [&>svg]:size-6 [&>svg]:shrink-0 [&>svg]:text-[#4e5663]",
                    "data-[state=open]:bg-[#fce7f3]",
                    isRtl ? "flex-row-reverse" : "flex-row-reverse",
                  )}
                >
                  <div className={cn("flex min-w-0 flex-1 items-center justify-between gap-3")}>
                    <div className={cn("flex min-w-0 items-center gap-3")}>
                      <CategoryIcon variant={cat.variant} />
                      <span className="text-lg font-bold leading-7 text-[#1f242e]">{cat.title}</span>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-7 shrink-0 items-center rounded-full px-3 text-sm font-medium",
                        cat.variant === "analysis" ? "border border-[#bebbe1] bg-[#f2f1fa] text-[#363085]" : "border border-[#fab9c7] bg-[#fef8f9] text-[#c92044]",
                      )}
                    >
                      {cat.countBadge}
                    </span>
                  </div>
                </AccordionTrigger>

                {cat.subItems != null && cat.subItems.length > 0 && (
                  <AccordionContent className="pb-0 pt-0">
                    <div className="border-t border-[#fce7f3] bg-white">
                      {cat.subItems.map((item, i) => (
                        <div key={`${cat.id}-${i}`} className={cn("flex flex-col gap-0.5 border-b border-[#f1f3f7] px-4 py-3 last:border-b-0")}>
                          <p className="text-sm font-bold leading-5 text-[#282464]">{item.title}</p>
                          <p className="text-xs font-medium leading-4 text-[#4e5663]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
