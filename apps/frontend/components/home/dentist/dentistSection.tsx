"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { DentistCard } from "./dentistCard";
import type { DestinationItem } from "@/types/home";

export type DentistSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  centersLabel: string;
  destinations: DestinationItem[];
};

const navPrevClass = "dentist-swiper-prev";
const navNextClass = "dentist-swiper-next";
const paginationClass = "dentist-pagination";

export function DentistSection({ locale, title, subtitle, centersLabel, destinations }: DentistSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-x-clip bg-muted/50 py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_500px]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={title}
    >
      <SectionContainer className="relative">
        {/* Header: decorative icon + title block; RTL: group on right, LTR: group on left */}
        <div className={cn("flex items-center gap-4 mb-12 md:mb-16", isRtl ? "justify-end flex-row-reverse" : "justify-start")}>
          <div className={cn("section-heading-stack w-full text-start")}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold  text-(--color-text-brand)">
              {title}
              <span className="inline-block">
                <Image
                  className={cn("w-7 h-7 md:w-10 md:h-10 object-contain")}
                  src="/dentist-highlight.svg"
                  alt=""
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
        </div>

        {/* Carousel row: [Prev] — Swiper (center) — [Next] */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 sm:gap-4 w-full">
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

            <div className="flex-1 min-w-0 overflow-hidden relative">
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
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
                className="overflow-hidden!"
              >
                {destinations.map((destination, index) => (
                  <SwiperSlide key={`${destination.city}-${index}`}>
                    <DentistCard destination={destination} centersLabel={centersLabel} isRtl={isRtl} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
          <div className={cn(paginationClass, "inline-flex justify-center items-center gap-2.5")} />
        </div>
      </SectionContainer>
    </section>
  );
}
