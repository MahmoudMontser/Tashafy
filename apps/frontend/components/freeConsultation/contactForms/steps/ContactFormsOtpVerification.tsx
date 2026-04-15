"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactFormOtpContent } from "@/types/freeConsultation";
import { useCallback, useRef, useState } from "react";

const OTP_LEN = 6;

export type ContactFormsOtpVerificationProps = {
  locale: string;
  content: ContactFormOtpContent;
  phoneDisplay: string;
  onSubmit: () => void;
};

export default function ContactFormsOtpVerification({ locale, content, phoneDisplay, onSubmit }: ContactFormsOtpVerificationProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(OTP_LEN).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const setDigitAt = useCallback((index: number, char: string) => {
    const c = char.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = c;
      return next;
    });
    if (c && index < OTP_LEN - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.length > 1) {
      const pasted = v.replace(/\D/g, "").slice(0, OTP_LEN);
      if (!pasted) return;
      setDigits(() => {
        const next = Array(OTP_LEN).fill("");
        for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]!;
        return next;
      });
      const focusIdx = Math.min(pasted.length, OTP_LEN - 1);
      inputsRef.current[focusIdx]?.focus();
      return;
    }
    setDigitAt(index, v);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const code = digits.join("");
  const canSubmit = code.length === OTP_LEN;

  return (
    <div
      role="region"
      aria-labelledby="contact-form-otp-title"
      className="flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-[#f1f3f7] bg-white p-6 shadow-[0px_4px_6px_-2px_rgba(15,17,20,0.04),0px_10px_16px_-3px_rgba(15,17,20,0.06)]"
    >
      <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-6 text-center">
        <h2 id="contact-form-otp-title" className="w-full text-xl font-medium leading-8 text-(--color-text-brand)">
          {content.title}
        </h2>

        <div className="flex w-full flex-col items-center gap-4 text-base leading-6">
          <p className="text-(--color-text-secondary)">{phoneDisplay}</p>
          <p className="text-(--color-text-primary)">{content.instruction}</p>
        </div>

        <div
          className="flex w-full justify-center gap-2"
          dir={locale === "ar" ? "ltr" : undefined}
          role="group"
          aria-label={content.instruction}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={OTP_LEN}
              value={d}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`${content.digitAriaLabel} ${i + 1}`}
              className={cn(
                "h-14 w-12 shrink-0 cursor-pointer rounded-lg border-2 border-[#f1f3f7] bg-white text-center text-lg font-medium text-(--color-text-primary) outline-none",
                "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
              )}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm leading-5">
          <button
            type="button"
            className="cursor-pointer font-bold text-(--color-text-primary) underline-offset-2 hover:underline"
          >
            {content.resend}
          </button>
          <span className="text-(--color-text-secondary)">{content.resendPrompt}</span>
        </div>
      </div>

      <Button
        type="button"
        className="h-14 w-full cursor-pointer rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        {content.submitLabel}
      </Button>
    </div>
  );
}
