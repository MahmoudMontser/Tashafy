import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { NavLabels } from "@/types/global";
import { Search } from "lucide-react";
import Image from "next/image";
import { Navbar } from "../shared/navbar/Navbar";

type MainSectionProps = {
  locale: string;
  labels: NavLabels;
  motto: string;
  heading: string;
  searchPlaceholder: string;
  loadingLabel?: string;
  logoNavAr?: string;
  logoNavEn?: string;
};

export default function MainSection({ locale, labels, motto, heading, searchPlaceholder, loadingLabel, logoNavAr, logoNavEn }: MainSectionProps) {
  return (
    <section id="main-section" className="relative z-50 w-full min-h-screen flex flex-col items-center justify-start container-margin scroll-smooth">
      <div className="z-50 px-4 sm:px-0 sm:w-[96%] w-full mx-auto shrink-0">
        <Navbar
          className="navbar"
          locale={locale}
          labels={labels}
          searchPlaceholder={searchPlaceholder}
          loadingLabel={loadingLabel}
          logo_ar={logoNavAr}
          logo_en={logoNavEn}
        />
      </div>

      <div className="container overflow-hidden flex-1 min-h-0 w-full">
        <div className="absolute inset-0 w-[99%] mx-auto rounded-4xl overflow-hidden">
          <video
            controls={false}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          >
            <source src="/home_main.mp4" type="video/mp4" />
          </video>
          {/* overlay*/}
          <div className="absolute inset-0 w-full h-full bg-linear-to-b from-[#000000] to-[#000000] opacity-40 " aria-hidden />
        </div>

        {/* Content */}
        <div className="relative z-10 w-[99%] mx-auto rounded-4xl flex flex-col min-h-[840px]">
          <SectionContainer className="flex flex-1 flex-col items-center justify-center text-center py-16">
            <div className="section-heading-stack items-center text-center max-w-4xl mb-8 md:mb-10">
              <p className="text-white text-lg md:text-xl font-medium">{motto}</p>
              <div>
                <Image src="/Vector.svg" className="w-full h-full" alt="Vector" width={90} height={80} loading="eager" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{heading}</h3>
            </div>
            <div className="w-full max-w-2xl relative">
              <Search className="absolute inset-s-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" aria-hidden />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-12 w-full bg-(--color-surface-overlay-dark) border-(--color-border-brand-secondary) shadow-[0_1px_2px_0_rgba(17,24,39,0.05)] rounded-xl py-4 ps-12 pe-4 text-white placeholder:text-white/60 text-base"
              />
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}
