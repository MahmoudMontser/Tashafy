"use client";

import ContactFormsStep3 from "./ContactFormsStep3";
import type { ContactFormStepYesNoContent } from "@/types/freeConsultation";

export type ContactFormsStep4Props = {
  locale: string;
  content: ContactFormStepYesNoContent;
  onNext: () => void;
  onPrevious: () => void;
};

/** Same pattern as step 3 (yes / no, circular radios). */
export default function ContactFormsStep4(props: ContactFormsStep4Props) {
  return <ContactFormsStep3 {...props} ariaHeadingId="contact-form-step4-question" />;
}
