"use client";

import type { ContactResultFailureContent } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import Image from "next/image";

export type ResultFaildProps = {
  locale: string;
  content: ContactResultFailureContent;
  onRetry: () => void;
  className?: string;
};

/**
 * Contact form error state — matches Figma (node 1447:24886): overlapping CheckFaild art, rose-tint card, brand retry button with send icon.
 */
export function ResultFaild({ locale, content, onRetry, className }: ResultFaildProps) {
  const isRtl = locale === "ar";

  return (
    <div className={cn("relative w-full max-w-[560px] pt-21", className)}>
      <div
        className={cn(
          "relative flex flex-col items-center rounded-3xl bg-[#fef8f9] px-6 pb-8 pt-18 shadow-[0px_1px_3px_0px_rgba(15,17,20,0.1)]",
          isRtl ? "text-right" : "text-left",
        )}
        dir={isRtl ? "rtl" : "ltr"}
        role="alert"
        aria-live="assertive"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[203px] w-[200px] -translate-x-1/2 -translate-y-[42%]" aria-hidden>
          <Image src="/CheckFaild.svg" alt="" width={264} height={203} className="h-full w-full object-contain object-bottom" priority />
        </div>

        <div className="relative flex w-full flex-col items-center gap-12 mt-12">
          <div className="flex w-full max-w-[482px] flex-col items-center gap-4 text-center">
            <h2 className="text-[28px] font-semibold leading-8 tracking-[-0.56px] text-[#dc2626]">{content.title}</h2>
            <p className="text-lg leading-7 text-(--color-text-secondary)">{content.description}</p>
          </div>

          <Button
            type="button"
            onClick={onRetry}
            className="h-14 cursor-pointer min-w-[276px] gap-1 rounded-lg bg-[#433ca6] px-6 text-base font-medium text-white hover:bg-[#433ca6]/90"
          >
            <span>{content.retryCta}</span>
            <Send className="size-6 shrink-0" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
