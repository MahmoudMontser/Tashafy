"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactFormStep1Content } from "@/types/freeConsultation";
import { CheckIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { useState } from "react";

const STEP_OPTIONS = [
  { value: "addiction", labelKey: "optionAddiction" as const },
  { value: "mental_health", labelKey: "optionMentalHealth" as const },
  { value: "injury_rehab", labelKey: "optionRehabilitation" as const },
];

export type ContactFormsStep1Props = {
  content: ContactFormStep1Content;
  onNext?: () => void;
  locale: string;
};

export default function ContactFormsStep1({ content, onNext, locale }: ContactFormsStep1Props) {
  const [value, setValue] = useState<string>("");
  const isRtl = locale === "ar";

  const handleNext = () => {
    if (!value) return;
    onNext?.();
  };

  return (
    <div
      role="region"
      aria-labelledby="contact-form-step1-question"
      className="flex w-full flex-col gap-5 overflow-hidden rounded-2xl border border-[#f1f3f7] bg-white p-6 shadow-[0px_4px_6px_-2px_rgba(15,17,20,0.04),0px_10px_16px_-3px_rgba(15,17,20,0.06)]"
    >
      <div className="flex w-full flex-col gap-5">
        <h2 id="contact-form-step1-question" className="w-full text-lg font-bold leading-7 text-(--color-text-primary)">
          {content.question}
        </h2>

        <RadioGroupPrimitive.Root className="flex w-full flex-col gap-3" value={value} onValueChange={setValue} aria-label={content.question}>
          {STEP_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center justify-end gap-3 rounded-xl border border-[#e9ebf0] bg-white p-4 transition-colors",
                value === opt.value && "border-primary ring-1 ring-primary/20",
                !isRtl && "justify-end  items-center flex-row-reverse",
              )}
            >
              <p className="min-w-0 mt-1 cursor-pointer text-base font-medium leading-5 text-(--color-text-primary)">{content[opt.labelKey]}</p>
              <RadioGroupPrimitive.Item
                value={opt.value}
                className={cn(
                  "relative  cursor-pointer size-5 shrink-0 rounded-[4px] border border-[#d1d5de] bg-white outline-none transition-[border,background-color]",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
                )}
              >
                <RadioGroupPrimitive.Indicator className=" flex size-full items-center justify-center text-white">
                  <CheckIcon className="size-3.5 stroke-3" aria-hidden />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
            </label>
          ))}
        </RadioGroupPrimitive.Root>
      </div>

      <div className="w-full">
        <Button
          type="button"
          className="h-14 w-full cursor-pointer rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          disabled={!value}
          onClick={handleNext}
        >
          {content.nextLabel}
        </Button>
      </div>
    </div>
  );
}
