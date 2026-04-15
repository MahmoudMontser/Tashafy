"use client";

import { useCallback, useState } from "react";
import type { ContactLayoutSectionContent, ContactResultFailureContent, ContactResultSuccessContent } from "@/types/contact";
import ContactUsForm from "./ContactUsForm";
import { ResultFaild } from "./ResultFaild";
import { ResultSuccess } from "./ResultSuccess";

type Phase = "form" | "submitting" | "success" | "failure";

/** Simulated submit — replace with real `fetch`. Type `fail` in the message field to force an error state for testing. */
async function submitContactForDemo(form: HTMLFormElement): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 550));
  const message = form.querySelector<HTMLTextAreaElement>("textarea[name='message']")?.value ?? "";
  if (/\bfail\b/i.test(message)) return false;
  return true;
}

export type ContactFormWithResultProps = {
  locale: string;
  content: ContactLayoutSectionContent;
  successContent: ContactResultSuccessContent;
  failureContent: ContactResultFailureContent;
};

export function ContactFormWithResult({ locale, content, successContent, failureContent }: ContactFormWithResultProps) {
  const [phase, setPhase] = useState<Phase>("form");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setPhase("submitting");
    try {
      const ok = await submitContactForDemo(form);
      setPhase(ok ? "success" : "failure");
    } catch {
      setPhase("failure");
    }
  }, []);

  const handleRetry = useCallback(() => setPhase("form"), []);

  if (phase === "success") {
    return <ResultSuccess locale={locale} content={successContent} className="mx-auto w-full max-w-[560px] lg:mx-0" />;
  }

  if (phase === "failure") {
    return <ResultFaild locale={locale} content={failureContent} onRetry={handleRetry} className="mx-auto w-full max-w-[560px] lg:mx-0" />;
  }

  return <ContactUsForm locale={locale} content={content} onSubmit={handleSubmit} isSubmitting={phase === "submitting"} />;
}
