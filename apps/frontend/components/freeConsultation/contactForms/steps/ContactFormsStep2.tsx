"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactFormStep2Content } from "@/types/freeConsultation";
import { CheckIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { useState } from "react";
const OPTIONS = [
  { value: "self", labelKey: "optionSelf" as const },
  { value: "family", labelKey: "optionFamily" as const },
];

export type ContactFormsStep2Props = {
  locale: string;
  content: ContactFormStep2Content;
  onNext: () => void;
  onPrevious: () => void;
};

export default function ContactFormsStep2({ locale, content, onNext, onPrevious }: ContactFormsStep2Props) {
  const [value, setValue] = useState("self");
  const isRtl = locale === "ar";

  return (
    <div
      role="region"
      aria-labelledby="contact-form-step2-question"
      className="flex w-full flex-col gap-5 overflow-hidden rounded-2xl border border-[#f1f3f7] bg-white p-6 shadow-[0px_4px_6px_-2px_rgba(15,17,20,0.04),0px_10px_16px_-3px_rgba(15,17,20,0.06)]"
    >
      <div className="flex w-full flex-col gap-5">
        <h2 id="contact-form-step2-question" className="w-full text-xl font-medium leading-8 text-(--color-text-primary)">
          {content.question}
        </h2>

        <RadioGroupPrimitive.Root className="flex w-full flex-col gap-3" value={value} onValueChange={setValue} aria-label={content.question}>
          {OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center justify-end gap-3 rounded-xl border border-[#e9ebf0] bg-white p-4 transition-colors",
                value === opt.value && "border-primary bg-[#f2f1fa] ring-1 ring-primary/20",
                !isRtl && "flex-row-reverse",
              )}
            >
              <p className="min-w-0 mt-1 cursor-pointer text-base font-medium leading-5 text-(--color-text-primary)">{content[opt.labelKey]}</p>
              <RadioGroupPrimitive.Item
                value={opt.value}
                className={cn(
                  "relative size-5 shrink-0 cursor-pointer rounded-[4px] border border-[#d1d5de] bg-white outline-none transition-[border,background-color]",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
                )}
              >
                <RadioGroupPrimitive.Indicator className="flex size-full cursor-pointer items-center justify-center text-white">
                  <CheckIcon className="size-3.5 stroke-3" aria-hidden />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
            </label>
          ))}
        </RadioGroupPrimitive.Root>
      </div>

      <div className="flex w-full gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-14 flex-1 cursor-pointer rounded-lg border-[#d1d5de] bg-white text-base font-medium text-(--color-text-primary) shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)] hover:bg-white"
          onClick={onPrevious}
        >
          {content.previousLabel}
        </Button>
        <Button
          type="button"
          className="h-14 flex-1 cursor-pointer rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          disabled={!value}
          onClick={() => {
            if (!value) return;
            onNext();
          }}
        >
          {content.nextLabel}
        </Button>
      </div>
    </div>
  );
}
