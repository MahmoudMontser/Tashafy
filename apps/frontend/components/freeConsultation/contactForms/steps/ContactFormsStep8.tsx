"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InternationalPhoneInput } from "@/components/shared/international-phone/international-phone-input";
import { isValidInternationalPhone, toValidE164 } from "@/components/shared/international-phone/phone-validation";
import { cn } from "@/lib/utils";
import type { ContactFormStep8Content } from "@/types/freeConsultation";
import { Mail } from "lucide-react";
import { useState } from "react";

export type ContactFormsStep8Props = {
  locale: string;
  content: ContactFormStep8Content;
  onSubmit: (payload: { phone: string }) => void;
};

export default function ContactFormsStep8({ locale, content, onSubmit }: ContactFormsStep8Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const isRtl = locale === "ar";

  const phoneValid = isValidInternationalPhone(phone);
  const phoneShowInvalid = phoneTouched && phone.trim().length > 0 && !phoneValid;

  const canSubmit =
    fullName.trim().length > 0 && email.trim().length > 0 && phoneValid;

  const fieldShell = "shadow-[0px_1px_2px_0px_rgba(17,24,39,0.05)]";

  return (
    <div
      role="region"
      aria-labelledby="contact-form-step8-heading"
      className="flex w-full flex-col gap-5 overflow-visible rounded-2xl border border-[#f1f3f7] bg-white p-6 shadow-[0px_4px_6px_-2px_rgba(15,17,20,0.04),0px_10px_16px_-3px_rgba(15,17,20,0.06)]"
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-3">
          <h2 id="contact-form-step8-heading" className="w-full text-xl font-medium leading-8 text-(--color-text-primary)">
            {content.fullNameHeading}
          </h2>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={content.namePlaceholder}
            className={cn("h-11 cursor-pointer rounded-lg border-[#d1d5de] bg-white text-sm", fieldShell)}
            autoComplete="name"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="w-full text-xl font-medium leading-8 text-(--color-text-primary)">{content.phoneHeading}</p>
          <InternationalPhoneInput
            locale={locale}
            value={phone}
            onChange={setPhone}
            placeholder={content.phonePlaceholder}
            invalid={phoneShowInvalid}
            onBlur={() => setPhoneTouched(true)}
            aria-describedby={phoneShowInvalid ? "contact-form-step8-phone-error" : undefined}
          />
          {phoneShowInvalid ? (
            <p id="contact-form-step8-phone-error" className="text-sm font-medium text-[#ef2752]" role="alert">
              {content.phoneInvalidHint}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="w-full text-xl font-medium leading-8 text-(--color-text-primary)">{content.emailHeading}</p>
          <div className={cn("flex h-11 w-full items-center gap-2 rounded-lg border border-[#d1d5de] bg-white px-2", isRtl && "flex-row-reverse", fieldShell)}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.emailPlaceholder}
              className="h-full min-w-0 flex-1 cursor-pointer border-0 bg-transparent px-1 text-sm shadow-none focus-visible:ring-0"
              autoComplete="email"
            />
            <Mail className="size-5 shrink-0 text-(--color-text-secondary)" aria-hidden />
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="h-14 w-full cursor-pointer rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        disabled={!canSubmit}
        onClick={() => {
          const e164 = toValidE164(phone);
          if (!e164) return;
          onSubmit({ phone: e164 });
        }}
      >
        {content.nextLabel}
      </Button>
    </div>
  );
}
