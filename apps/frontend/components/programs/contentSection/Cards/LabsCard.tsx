import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProgramLabsContent } from "@/types/programs";

export type LabsCardProps = {
  content: ProgramLabsContent;
  isRtl: boolean;
};

export function LabsCard({ content, isRtl }: LabsCardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="program-labs-heading">
      <div className={cn("mb-6 space-y-1", isRtl ? "text-right" : "text-left")}>
        <h2 id="program-labs-heading" className="text-2xl font-bold tracking-[-0.56px] text-(--color-text-brand) md:text-[28px] md:leading-8">
          {content.title}
        </h2>
        <p className="text-base leading-6 text-[#9fa5b2]">{content.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.logos.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="flex h-24 items-center justify-center rounded-xl border border-[#e9ebf0] bg-white p-2">
            <div className="relative h-full w-full min-h-[48px]">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain p-1" sizes="(max-width: 640px) 100vw, 266px" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
