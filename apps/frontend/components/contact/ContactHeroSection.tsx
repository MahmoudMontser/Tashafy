import { Navbar } from "@/components/shared/navbar/Navbar";
import type { ContactHeroContent } from "@/types/contact";
import type { NavLabels } from "@/types/global";

export type ContactHeroSectionProps = {
  locale: string;
  labels: NavLabels;
  hero: ContactHeroContent;
  searchPlaceholder: string;
  loadingLabel?: string;
};

export default function ContactHeroSection({ locale, labels, hero, searchPlaceholder, loadingLabel }: ContactHeroSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="main-section"
      className="relative isolate w-[99%] overflow-hidden rounded-b-[32px] bg-[linear-gradient(180deg,#282464_73%,#6c2a77_100%)] shadow-[0_10px_10px_-5px_rgba(15,17,20,0.06),0_20px_25px_-5px_rgba(15,17,20,0.08)]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "51px 51px",
        }}
      />

      <div className="relative z-50 mx-auto w-full shrink-0 px-4 sm:w-[96%] sm:px-0">
        <Navbar className="navbar" locale={locale} labels={labels} searchPlaceholder={searchPlaceholder} loadingLabel={loadingLabel} />
      </div>

      <div className="relative z-10 flex min-h-[min(70vh,640px)] flex-col items-center justify-center px-4 pb-16 pt-14 sm:px-6 lg:pb-[88px] lg:pt-[76px]">
        <div className="relative flex max-w-[700px] flex-col items-center gap-4 text-center">
          <h1 className="text-[44px] leading-[56px] font-bold tracking-[-0.02em] text-white md:text-[48px]">{hero.title}</h1>
          <span className="h-[4px] w-[140px] rounded-full bg-[#d22c5d] sm:w-[200px]" role="img" aria-label={hero.decorativeUnderlineAlt} />
          <p className="max-w-[619px] text-[18px] leading-8 font-normal text-[#d1d5de] md:text-[20px]">{hero.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
