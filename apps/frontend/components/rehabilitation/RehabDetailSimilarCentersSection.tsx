"use client";

import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { MedicalCenterCard } from "@/components/rehabilitation/contentSection/Cards/MedicalCenterCard";
import { cn } from "@/lib/utils";
import type { MedicalCenterItem } from "@/types/global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type RehabDetailSimilarCentersSectionProps = {
  title: string;
  centers: MedicalCenterItem[];
  locale: string;
  startsFromLabel: string;
};

const navPrevClass = "our-rehab-similar-centers-swiper-prev";
const navNextClass = "our-rehab-similar-centers-swiper-next";
const paginationClass = "our-rehab-similar-centers-pagination";

export function RehabDetailSimilarCentersSection({ title, centers, locale, startsFromLabel }: RehabDetailSimilarCentersSectionProps) {
  const isRtl = locale === "ar";

  if (centers.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 md:py-16" dir={isRtl ? "rtl" : "ltr"} aria-label={title}>
      <SectionContainer>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between w-full">
            <h2
              className={cn(
                "text-2xl font-semibold tracking-tight text-(--color-text-brand) md:text-[28px] md:leading-8 md:tracking-[-0.56px] flex-1 min-w-0",
                isRtl ? "text-right" : "text-left",
              )}
            >
              {title}
            </h2>

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
              <div className={cn(paginationClass, "flex justify-center items-center gap-2.5")} />
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
              {centers.map((center, index) => (
                <SwiperSlide key={center.detailId ?? `${center.centerName}-${index}`} className="h-auto!">
                  <div className="flex h-full justify-center">
                    <MedicalCenterCard center={center} isRtl={isRtl} startsFromLabel={startsFromLabel} locale={locale} detailsSegment="rehabilitation" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
