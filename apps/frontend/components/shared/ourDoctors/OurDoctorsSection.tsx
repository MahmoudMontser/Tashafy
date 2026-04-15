"use client";

import { cn } from "@/lib/utils";
import type { consultationsDoctorItem } from "@/types/global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { OurDoctorsCard } from "./OurDoctorsCard";
import Image from "next/image";

export type OurDoctorsSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  backgroundColor?: string;
  doctors: consultationsDoctorItem[];
};

const navPrevClass = "our-doctors-swiper-prev";
const navNextClass = "our-doctors-swiper-next";
const paginationClass = "our-doctors-pagination";

export function OurDoctorsSection({ locale, title, subtitle, doctors, backgroundColor }: OurDoctorsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_500px]"
      style={{
        background: backgroundColor || "radial-gradient(ellipse 33.86% 33.86% at 50.00% 0.05%, #CFCDE9 0%, #F8F4FF 100%)",
      }}
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={title}
    >
      <SectionContainer className="relative">
        <div className="flex flex-col gap-12">
          {/* Header: title + subtitle | nav (prev, pagination, next) — RTL: title right, nav left */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
            <div className={cn("section-heading-stack flex-1 min-w-0 relative")}>
              <h2 className="text-2xl font-bold text-(--color-text-brand) md:text-4xl lg:text-5xl">
                {title}
                <span className="inline-block">
                  <Image
                    className={cn("w-7 h-7 md:w-10 md:h-10 object-contain")}
                    src="/doctors-highlight.svg"
                    alt="Our Doctors Highlight"
                    width={50}
                    height={50}
                    loading="lazy"
                    decoding="async"
                    aria-hidden
                  />
                </span>
              </h2>
              <p className="text-lg md:text-xl font-normal text-(--color-text-secondary)  w-full max-w-[1000px]">{subtitle}</p>
            </div>
            <div className={cn("flex justify-start items-center gap-6 shrink-0")}>
              <button
                type="button"
                aria-label={isRtl ? "Previous" : "Next"}
                className={cn(
                  navNextClass,
                  "shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white border border-primary/30 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10",
                )}
              >
                {isRtl ? (
                  <ChevronRight className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                )}
              </button>
              <div className={cn(paginationClass, "flex justify-start items-center gap-2.5")} />
              <button
                type="button"
                aria-label={isRtl ? "Next" : "Previous"}
                className={cn(
                  navPrevClass,
                  "shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white border border-primary/30 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10",
                )}
              >
                {isRtl ? (
                  <ChevronLeft className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                ) : (
                  <ChevronRight className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <Swiper
              dir={isRtl ? "rtl" : "ltr"}
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: `.${navPrevClass}`,
                nextEl: `.${navNextClass}`,
              }}
              pagination={{
                el: `.${paginationClass}`,
                clickable: true,
                bulletClass: "inline-block w-3 h-3 rounded-xl bg-primary/20 transition-all cursor-pointer",
                bulletActiveClass: "!w-6 !h-3 !bg-primary rounded-full shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)]",
              }}
              spaceBetween={16}
              slidesPerView={1.09}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 1.8 },
                1024: { slidesPerView: 2.7 },
                1280: { slidesPerView: 3.2 },
              }}
              className="overflow-hidden!"
            >
              {doctors.map((doctor, index) => (
                <SwiperSlide key={`${doctor.name}-${index}`}>
                  <OurDoctorsCard doctor={doctor} isRtl={isRtl} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
