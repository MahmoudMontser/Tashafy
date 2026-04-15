"use client";

import { useEffect, useMemo, useState } from "react";

import type { ContactFormOtpContent, ContactFormStepsContent, ContactFormSuccessContent } from "@/types/freeConsultation";
import ContactFormsOtpVerification from "./steps/ContactFormsOtpVerification";
import ContactFormsStep1 from "./steps/ContactFormsStep1";
import ContactFormsStep2 from "./steps/ContactFormsStep2";
import ContactFormsStep3 from "./steps/ContactFormsStep3";
import ContactFormsStep4 from "./steps/ContactFormsStep4";
import ContactFormsStep5 from "./steps/ContactFormsStep5";
import ContactFormsStep6 from "./steps/ContactFormsStep6";
import ContactFormsStep7 from "./steps/ContactFormsStep7";
import ContactFormsStep8 from "./steps/ContactFormsStep8";
import FreeConsultationSuccessSection from "./steps/FreeConsultationSuccessSection";

function formatPhoneForOtpDisplay(phone: string): string {
  const trimmed = phone.replace(/\s/g, "");
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "+966";
  return `+966${digits.replace(/^0+/, "")}`;
}

export type ContactFormsWizardProps = {
  locale: string;
  contactForm: ContactFormStepsContent;
  contactOtp: ContactFormOtpContent;
  contactSuccess: ContactFormSuccessContent;
  onPhaseChange?: (phase: "steps" | "otp" | "success") => void;
};

export default function ContactFormsWizard({ locale, contactForm, contactOtp, contactSuccess, onPhaseChange }: ContactFormsWizardProps) {
  const [phase, setPhase] = useState<"steps" | "otp" | "success">("steps");
  const [step, setStep] = useState(1);
  const [otpPhoneDisplay, setOtpPhoneDisplay] = useState("");
  const isRtl = locale === "ar";

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  const progressLabel = useMemo(() => {
    if (phase === "otp") return contactOtp.progressLabel;
    const labels = [
      contactForm.step1.progressLabel,
      contactForm.step2.progressLabel,
      contactForm.step3.progressLabel,
      contactForm.step4.progressLabel,
      contactForm.step5.progressLabel,
      contactForm.step6.progressLabel,
      contactForm.step7.progressLabel,
      contactForm.step8.progressLabel,
    ];
    return labels[step - 1] ?? labels[0];
  }, [contactForm, contactOtp.progressLabel, phase, step]);

  const goNext = () => setStep((s) => Math.min(8, s + 1));
  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const handleStep8Submit = ({ phone }: { phone: string }) => {
    setOtpPhoneDisplay(formatPhoneForOtpDisplay(phone));
    setPhase("otp");
  };

  if (phase === "success") {
    return <FreeConsultationSuccessSection locale={locale} content={contactSuccess} />;
  }

  return (
    <div
      className="w-full max-w-[600px] rounded-2xl border border-[#e9ebf0] bg-[#f9fafc] p-4 shadow-[0px_4px_6px_0px_rgba(15,17,20,0.04),0px_10px_16px_0px_rgba(15,17,20,0.06)]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex w-full items-center justify-start gap-3 py-3">
        <div className="h-[3px] w-7 shrink-0 rounded-full bg-primary" aria-hidden />
        <p className="flex-1 text-start text-base font-medium leading-6 text-(--color-text-brand)">{progressLabel}</p>
      </div>

      {phase === "steps" && step === 1 && <ContactFormsStep1 content={contactForm.step1} onNext={goNext} locale={locale} />}
      {phase === "steps" && step === 2 && <ContactFormsStep2 locale={locale} content={contactForm.step2} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 3 && <ContactFormsStep3 locale={locale} content={contactForm.step3} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 4 && <ContactFormsStep4 locale={locale} content={contactForm.step4} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 5 && <ContactFormsStep5 locale={locale} content={contactForm.step5} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 6 && <ContactFormsStep6 locale={locale} content={contactForm.step6} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 7 && <ContactFormsStep7 locale={locale} content={contactForm.step7} onNext={goNext} onPrevious={goPrev} />}
      {phase === "steps" && step === 8 && <ContactFormsStep8 locale={locale} content={contactForm.step8} onSubmit={handleStep8Submit} />}
      {phase === "otp" && <ContactFormsOtpVerification locale={locale} content={contactOtp} phoneDisplay={otpPhoneDisplay} onSubmit={() => setPhase("success")} />}
    </div>
  );
}
