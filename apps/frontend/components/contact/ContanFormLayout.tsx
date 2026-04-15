import type { ContactLayoutSectionContent, ContactPageContent } from "@/types/contact";
import { MessageCircleMore } from "lucide-react";
import { ContactFormWithResult } from "./ContactFormWithResult";
import ContactUsSection from "./ContactUsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ContanFormLayoutProps = {
  locale: string;
  content: ContactLayoutSectionContent;
  result: ContactPageContent["result"];
};

export default function ContanFormLayout({ locale, content, result }: ContanFormLayoutProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full px-4 py-16 lg:px-16 lg:py-20" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto flex w-full max-w-[1416px] flex-col gap-8 lg:gap-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ContactUsSection locale={locale} content={content} />
          <ContactFormWithResult locale={locale} content={content} successContent={result.success} failureContent={result.failure} />
        </div>

        <Card className="rounded-2xl border-[#e9ebf0] bg-[linear-gradient(179deg,rgba(248,113,113,0.02)_3%,rgba(248,113,113,0.2)_93%)] shadow-none">
          <CardContent className={`flex flex-col items-start justify-between gap-4 p-6 lg:flex-row `}>
            <div className={isRtl ? "text-right" : "text-left"}>
              <p className="text-3xl font-semibold tracking-[-0.01em] text-[#363085]">{content.whatsappTitle}</p>
              <p className="text-sm text-(--color-text-secondary)">{content.whatsappSubtitle}</p>
            </div>
            <Button asChild className="h-14 rounded-xl bg-[#10b981] px-6 text-base font-medium text-white hover:bg-[#0ea371]">
              <a href={content.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircleMore className="size-5" />
                {content.whatsappCtaLabel}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
