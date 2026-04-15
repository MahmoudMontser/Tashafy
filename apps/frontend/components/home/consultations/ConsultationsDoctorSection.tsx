"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { ConsultationsDoctorCard } from "./ConsultationsDoctorCard";
import type { consultationsDoctorItem } from "@/types/global";

export type ConsultationsDoctorSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  highlightTag: string;
  bookNowLabel: string;
  consultationsDoctors: consultationsDoctorItem[];
};

const paginationClass = "doctor-pagination";

export function ConsultationsDoctorSection({ locale, title, subtitle, highlightTag, bookNowLabel, consultationsDoctors }: ConsultationsDoctorSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_600px]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={title}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 w-full from-primary/10 via-primary/3 to-transparent",
          isRtl ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
        )}
        aria-hidden
      />
      <SectionContainer className="relative">
        {/* Header: Book Now button + text block (highlight tag, title, subtitle) */}
        <div className="flex flex-col gap-12">
          <div className={cn("w-full flex flex-col lg:flex-row justify-end items-center gap-4")}>
            <div className={cn("flex-1 flex flex-col gap-4 ")}>
              <div className={cn("flex items-start gap-4")}>
                <div className="px-2 py-1 bg-(--color-accent-rose)/10 rounded-lg inline-flex items-center gap-1">
                  <span className="text-xl font-medium text-(--color-accent-rose)">{highlightTag}</span>
                </div>
                <Sparkles className="size-7 shrink-0 text-(--color-accent-rose)" aria-hidden />
              </div>
              <div className="section-heading-stack">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand) max-w-[1056px]">{title}</h2>
                <p className="text-lg md:text-xl font-normal text-(--color-text-secondary) w-full max-w-[1000px]">{subtitle}</p>
              </div>
            </div>

            <Button variant="default" size="lg" className="shrink-0 w-48 h-11 rounded-lg px-5 text-base font-medium text-white" asChild>
              <a href="#book">{bookNowLabel}</a>
            </Button>
          </div>

          {/* Swiper: full width, pagination only */}
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full overflow-hidden">
              <Swiper
                dir={isRtl ? "rtl" : "ltr"}
                modules={[Pagination]}
                pagination={{
                  el: `.${paginationClass}`,
                  clickable: true,
                  bulletClass: "inline-block !w-3 !h-3 !rounded-[50px] bg-primary/20 transition-all cursor-pointer",
                  bulletActiveClass: "!w-6 !h-3 !rounded-[50px] !bg-primary shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)]",
                }}
                spaceBetween={16}
                slidesPerView={1.09}
                breakpoints={{
                  640: { slidesPerView: 1.2 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2.3 },
                  1280: { slidesPerView: 3.5 },
                }}
                className="overflow-hidden!"
              >
                {consultationsDoctors.map((doctor, index) => (
                  <SwiperSlide key={`${doctor.name}-${index}`}>
                    <ConsultationsDoctorCard doctor={doctor} isRtl={isRtl} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* <div className={cn(paginationClass, "inline-flex justify-center items-center gap-2.5")} /> */}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
