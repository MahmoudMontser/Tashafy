"use client";

import { cn } from "@/lib/utils";
import type { ContactFormSuccessContent } from "@/types/freeConsultation";
import { Check } from "lucide-react";
import Image from "next/image";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export type FreeConsultationSuccessSectionProps = {
  locale: string;
  content: ContactFormSuccessContent;
};

export default function FreeConsultationSuccessSection({ locale, content }: FreeConsultationSuccessSectionProps) {
  const isRtl = locale === "ar";

  const bullets = [content.bullet1, content.bullet2, content.bullet3];

  return (
    <section className="flex w-full flex-col items-center gap-8 py-12 md:gap-10 md:py-16" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="free-consultation-success-title">
      <div className="flex w-full max-w-3xl flex-col items-center gap-3 text-center">
        <Image src="/CheckSuccess.svg" alt="Success Icon" width={120} height={120} className="  stroke-3 text-white" />

        <div className="section-heading-stack w-full max-w-2xl items-center">
          <h2 id="free-consultation-success-title" className="text-4xl font-bold leading-[56px] tracking-[-0.02em] text-(--color-text-brand) md:text-5xl">
            {content.title}
          </h2>
          <div className="pointer-events-none mx-auto flex w-[200px] justify-center" aria-hidden>
            <Image src={content.titleUnderlineSrc} alt={content.titleUnderlineAlt} width={200} height={12} className="h-auto w-full object-contain" />
          </div>
        </div>

        <div className="flex max-w-xl flex-col gap-1 text-xl leading-8 text-[#4e5663]">
          <p>{content.line1}</p>
          <p>{content.line2}</p>
        </div>

        <div className="w-full max-w-md text-start rounded-lg border border-[#e9ebf0] bg-[#f9fafc] px-6 py-6 md:px-12 md:py-6">
          <p className="mb-3 w-full text-lg font-bold text-(--color-text-primary)">{content.cardTitle}</p>
          <ul className="flex flex-col gap-3">
            {bullets.map((text) => (
              <li key={text} className="flex items-center gap-3 text-base leading-6 text-(--color-text-secondary)">
                <span className="flex size-5 shrink-0 items-center justify-center ">
                  <Check className="size-6 stroke-3 text-primary" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-start">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full max-w-lg flex-col items-center gap-2 pt-2">
          <p className="text-xl leading-8 text-(--color-text-primary)">{content.ctaPrompt}</p>
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#10b981] px-6 text-base font-medium text-white transition-opacity hover:opacity-95",
            )}
          >
            <span>{content.ctaWhatsapp}</span>
            <WhatsAppGlyph className="size-6 shrink-0 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
