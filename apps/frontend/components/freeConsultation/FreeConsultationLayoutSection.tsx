"use client";

import dynamic from "next/dynamic";
import type { ContactFormOtpContent, ContactFormStepsContent, ContactFormSuccessContent, FreeConsultationHeroContent } from "@/types/freeConsultation";
import { useState } from "react";
import { SectionContainer } from "../shared/layout/SectionContainer";
import ContactFormsWizard from "./contactForms/ContactFormsWizard";

const HeroSection = dynamic(() => import("./HeroSection").then((m) => m.default));

export type FreeConsultationLayoutSectionProps = {
  locale: string;
  hero: FreeConsultationHeroContent;
  contactForm: ContactFormStepsContent;
  contactOtp: ContactFormOtpContent;
  contactSuccess: ContactFormSuccessContent;
};

export default function FreeConsultationLayoutSection({ locale, hero, contactForm, contactOtp, contactSuccess }: FreeConsultationLayoutSectionProps) {
  const [wizardPhase, setWizardPhase] = useState<"steps" | "otp" | "success">("steps");
  const showHero = wizardPhase !== "success";

  return (
    <div className="w-full bg-[url('/Grid.svg')] bg-center bg-repeat pb-6 pt-16">
      {showHero && <HeroSection locale={locale} content={hero} />}
      <SectionContainer as="section" className="flex w-full flex-col items-center bg-transparent pb-[60px] pt-12">
        <ContactFormsWizard locale={locale} contactForm={contactForm} contactOtp={contactOtp} contactSuccess={contactSuccess} onPhaseChange={setWizardPhase} />
      </SectionContainer>
    </div>
  );
}
