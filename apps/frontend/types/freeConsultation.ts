export type FreeConsultationHeroContent = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  underlineSrc: string;
  underlineAlt: string;
};

export type ContactFormStep1Content = {
  progressLabel: string;
  question: string;
  optionAddiction: string;
  optionMentalHealth: string;
  optionRehabilitation: string;
  nextLabel: string;
};

export type ContactFormStep2Content = {
  progressLabel: string;
  question: string;
  optionSelf: string;
  optionFamily: string;
  nextLabel: string;
  previousLabel: string;
};

export type ContactFormStepYesNoContent = {
  progressLabel: string;
  question: string;
  optionYes: string;
  optionNo: string;
  nextLabel: string;
  previousLabel: string;
};

export type ContactFormStep5Content = {
  progressLabel: string;
  question: string;
  optionWeek: string;
  optionTwoWeeks: string;
  optionMonth: string;
  optionUnsure: string;
  nextLabel: string;
  previousLabel: string;
};

export type ContactFormStep6Content = {
  progressLabel: string;
  question: string;
  optionUnder18: string;
  option18to24: string;
  option25to34: string;
  option35to44: string;
  nextLabel: string;
  previousLabel: string;
};

export type ContactFormStep7Content = {
  progressLabel: string;
  question: string;
  optionWhatsapp: string;
  optionEmail: string;
  optionSms: string;
  optionPhone: string;
  nextLabel: string;
  previousLabel: string;
};

export type ContactFormStep8Content = {
  progressLabel: string;
  fullNameHeading: string;
  namePlaceholder: string;
  phoneHeading: string;
  phonePlaceholder: string;
  phoneInvalidHint: string;
  emailHeading: string;
  emailPlaceholder: string;
  nextLabel: string;
};

export type ContactFormStepsContent = {
  step1: ContactFormStep1Content;
  step2: ContactFormStep2Content;
  step3: ContactFormStepYesNoContent;
  step4: ContactFormStepYesNoContent;
  step5: ContactFormStep5Content;
  step6: ContactFormStep6Content;
  step7: ContactFormStep7Content;
  step8: ContactFormStep8Content;
};

export type ContactFormOtpContent = {
  progressLabel: string;
  title: string;
  instruction: string;
  resend: string;
  resendPrompt: string;
  submitLabel: string;
  digitAriaLabel: string;
};

export type ContactFormSuccessContent = {
  title: string;
  line1: string;
  line2: string;
  cardTitle: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  ctaPrompt: string;
  ctaWhatsapp: string;
  whatsappHref: string;
  titleUnderlineSrc: string;
  titleUnderlineAlt: string;
};

export type FreeConsultationPageContent = {
  hero: FreeConsultationHeroContent;
  contactForm: ContactFormStepsContent;
  contactOtp: ContactFormOtpContent;
  contactSuccess: ContactFormSuccessContent;
};
