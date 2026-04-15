"use client";

import type { ContactLayoutSectionContent } from "@/types/contact";
import { MessageCircleMore, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ContactUsFormProps = {
  locale: string;
  content: ContactLayoutSectionContent;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isSubmitting?: boolean;
};

function FieldLabel({ text, requiredMark }: { text: string; requiredMark?: string }) {
  return (
    <Label className={`flex items-center gap-1 text-sm font-medium text-(--color-text-primary) `}>
      {requiredMark ? <span className="text-red-600">{requiredMark}</span> : null}
      <span>{text}</span>
    </Label>
  );
}

export default function ContactUsForm({ locale, content, onSubmit, isSubmitting }: ContactUsFormProps) {
  const isRtl = locale === "ar";

  return (
    <div className="rounded-3xl bg-[#f1f3f7] p-6 shadow-[0_1px_3px_rgba(15,17,20,0.1)] lg:p-8">
      <div className={`mb-8 flex items-center gap-2 text-[#ef2752]`}>
        <MessageCircleMore className="size-5" />
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">{content.formHeading}</h2>
      </div>

      <form
        className="space-y-5"
        action="#"
        onSubmit={onSubmit}
        aria-busy={isSubmitting || undefined}
      >
        <div className="space-y-2">
          <FieldLabel text={content.nameLabel} requiredMark={content.requiredMark} />
          <Input name="name" className={`h-11 border-[#d1d5de] bg-white text-sm `} placeholder={content.placeholderText} required />
        </div>
        <div className="space-y-2">
          <FieldLabel text={content.phoneLabel} requiredMark={content.requiredMark} />
          <Input name="phone" type="tel" className={`h-11 border-[#d1d5de] bg-white text-sm `} placeholder={content.placeholderText} required />
        </div>
        <div className="space-y-2">
          <Label className={`flex items-center gap-1 text-sm text-(--color-text-secondary) `}>
            <span className="font-medium text-(--color-text-primary)">{content.emailLabel}</span>
            <span>({content.emailOptionalLabel})</span>
          </Label>
          <Input name="email" type="email" className={`h-11 border-[#d1d5de] bg-white text-sm `} placeholder={content.placeholderText} />
        </div>
        <div className="space-y-2">
          <FieldLabel text={content.serviceLabel} requiredMark={content.requiredMark} />
          <Select dir={isRtl ? "rtl" : "ltr"} defaultValue={content.serviceOptions[0]}>
            <SelectTrigger
              aria-label={content.serviceLabel}
              className="h-11 w-full rounded-lg border border-[#d1d5de] bg-white p-2 py-5 text-sm text-(--color-text-secondary) shadow-xs cursor-pointer"
            >
              <SelectValue placeholder={content.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent className="border border-(--color-border-input) bg-white text-(--color-text-secondary) shadow-xs">
              <SelectGroup>
                <SelectLabel>{content.serviceLabel}</SelectLabel>
                {content.serviceOptions.map((option) => (
                  <SelectItem key={option} value={option} className="cursor-pointer">
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <FieldLabel text={content.messageLabel} requiredMark={content.requiredMark} />
          <Textarea
            name="message"
            className={`min-h-[128px] border-[#d1d5de] bg-white text-sm `}
            placeholder={content.messagePlaceholder}
            required
          />
        </div>

        <div className={`flex ${isRtl ? "justify-end" : "justify-start"}`}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-14 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-70"
          >
            <Send className="size-4" />
            {content.submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
