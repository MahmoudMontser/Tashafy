import type { ContactLayoutSectionContent } from "@/types/contact";
import { Building2, Mail, Navigation, Phone } from "lucide-react";

type ContactUsSectionProps = {
  locale: string;
  content: ContactLayoutSectionContent;
};

export default function ContactUsSection({ locale, content }: ContactUsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <div className="flex flex-col gap-6">
      <h3 className={`text-4xl font-semibold tracking-[-0.02em] text-[#363085] ${isRtl ? "text-right" : "text-left"}`}>{content.detailsHeading}</h3>

      <div className="space-y-4">
        {content.details.map((item, index) => (
          <div key={item.title} className={`pb-4 ${index < content.details.length - 1 ? "border-b border-[#f1f3f7]" : ""}`}>
            <div className={`mb-3 flex items-center gap-2 `}>
              <div className="rounded-lg bg-[#f1f3f7] p-2 text-[#ef2752]">
                {index === 0 ? <Phone className="size-4" /> : null}
                {index === 1 ? <Mail className="size-4" /> : null}
                {index === 2 ? <Building2 className="size-4" /> : null}
              </div>
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-xl font-semibold tracking-[-0.01em] text-[#363085]">{item.title}</p>
                <p className="text-xs text-(--color-text-secondary)">{item.subtitle}</p>
              </div>
            </div>
            <div className={`space-y-1 text-base font-medium text-(--color-text-primary) ${isRtl ? "text-right" : "text-left"}`}>
              {item.values.map((value, index) => (
                <p key={index}>{value}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h4 className={`text-2xl font-semibold tracking-[-0.01em] text-[#363085] ${isRtl ? "text-right" : "text-left"}`}>{content.branchesHeading}</h4>
      <div className="space-y-3">
        {content.branches.map((branch) => (
          <div key={branch.country} className={`flex items-center gap-4 rounded-2xl border border-[#e9ebf0] bg-[#f9fafc] px-4 py-3 `}>
            <div className="size-10 shrink-0 rounded-full bg-[#e5e7eb] text-center text-[10px] leading-10 font-bold text-[#1f242e]">{branch.markerLabel}</div>
            <div className={`flex-1`}>
              <p className="text-base font-bold text-(--color-text-primary)">{branch.country}</p>
              <p className="text-sm text-(--color-text-secondary)">{branch.address}</p>
            </div>
            <Navigation className="size-5 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
