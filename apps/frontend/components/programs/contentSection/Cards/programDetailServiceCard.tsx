import type { ProgramDetailServicesContent } from "@/types/programs";

export type ProgramDetailServiceCardProps = {
  content: ProgramDetailServicesContent;
  isRtl: boolean;
};

function ServiceChip({ label }: { label: string }) {
  return (
    <div className="flex min-h-[60px] items-center rounded-xl border border-[#e9ebf0] bg-white px-4 py-4">
      <div className="flex w-full min-w-0 items-center gap-2.5">
        <span className="h-1 w-3 shrink-0 rounded-[3px] bg-[#ef4444]" aria-hidden />
        <p className="min-w-0 text-lg font-medium leading-7 text-[#3a424d]">{label}</p>
      </div>
    </div>
  );
}

export default function ProgramDetailServiceCard({ content, isRtl }: ProgramDetailServiceCardProps) {
  const { title, subtitle, items } = content;

  return (
    <section
      className="flex flex-col gap-6 rounded-2xl border border-black/6 bg-white p-6 shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="program-detail-services-heading"
    >
      <div className="flex w-full flex-col gap-0 text-start">
        <h2 id="program-detail-services-heading" className="text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">
          {title}
        </h2>
        <p className="mt-1 text-base leading-6 text-(--color-text-secondary)">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((label, index) => (
          <ServiceChip key={`${label}-${index}`} label={label} />
        ))}
      </div>
    </section>
  );
}
