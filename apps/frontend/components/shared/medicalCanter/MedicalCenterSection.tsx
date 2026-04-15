"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { MedicalCenterCategory } from "@/types/global";
import { MedicalCenterCard } from "./MedicalCenterCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type MedicalCenterSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  filterPlaceholder?: string;
  startsFromLabel: string;
  categories: MedicalCenterCategory[];
  viewAllLabel?: boolean;
};

const navPrevClass = "medical-centers-swiper-prev";
const navNextClass = "medical-centers-swiper-next";
const paginationClass = "medical-centers-pagination";

export function MedicalCenterSection({ locale, title, subtitle, filterPlaceholder, startsFromLabel, categories, viewAllLabel = true }: MedicalCenterSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden bg-background py-16 md:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_800px]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={title}
    >
      <SectionContainer className="relative flex flex-col items-center gap-12">
        <div className={cn("flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-end")}>
          <div className={cn("section-heading-stack relative flex-1 min-w-0", isRtl ? "text-right" : "text-left")}>
            <h2 className="text-2xl font-bold text-(--color-text-brand) md:text-4xl lg:text-5xl">
              {title}
              <span className="inline-block">
                <Image
                  className={cn("w-7 h-7 md:w-10 md:h-10 object-contain mb-7 ", !isRtl && "rotate-120 mb-2")}
                  src="/Highlight_05.svg"
                  alt="Highlight"
                  width={50}
                  height={50}
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
              </span>
            </h2>
            <p className="text-lg font-normal text-(--color-text-secondary) md:text-xl w-full max-w-[1000px]">{subtitle}</p>
          </div>

          {filterPlaceholder && (
            <Select dir={isRtl ? "rtl" : "ltr"} defaultValue="all">
              <SelectTrigger aria-label={filterPlaceholder} className="w-full max-w-48 border border-[#E0E0E0] rounded-lg p-2 shadow-xs py-5 bg-white cursor-pointer">
                <SelectValue placeholder={filterPlaceholder} className="text-black" />
              </SelectTrigger>
              <SelectContent className="bg-white text-(--color-text-secondary) border border-(--color-border-input) shadow-xs py-2">
                <SelectItem value="all" className="cursor-pointer">
                  {filterPlaceholder}
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.categoryName} value={cat.categoryName} className="cursor-pointer">
                    {cat.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Category blocks — carousel per category (same pattern as OurDoctorsSection) */}
        <div className="flex w-full flex-col gap-12">
          {categories.map((category, categoryIndex) => {
            const blockId = `medical-centers-swiper-block-${categoryIndex}`;
            const scoped = (cls: string) => `#${blockId} .${cls}`;

            return (
              <div key={category.categoryName} id={blockId} className="flex w-full flex-col gap-6">
                <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-center w-full", viewAllLabel ? "lg:justify-between" : "lg:justify-end")}>
                  {viewAllLabel && (
                    <div className={cn("flex flex-col gap-2 justify-start flex-1 min-w-0", isRtl ? "text-right" : "text-left")}>
                      <h3 className="text-2xl font-semibold text-(--color-text-brand) md:text-3xl">{category.categoryName}</h3>
                      <Link
                        href={`/${locale}/${category.viewAllHref}`}
                        className="text-base font-normal text-(--color-text-secondary) underline hover:opacity-90 shrink-0"
                      >
                        {category.viewAllLabel}
                      </Link>
                    </div>
                  )}

                  <div className={cn("flex justify-start items-center gap-6 shrink-0", !viewAllLabel && "w-full lg:w-auto justify-end")}>
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
                      prevEl: scoped(navPrevClass),
                      nextEl: scoped(navNextClass),
                    }}
                    pagination={{
                      el: scoped(paginationClass),
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
                    {category.centers.map((center, index) => (
                      <SwiperSlide key={`${center.detailId}-${index}`} className="h-auto!">
                        <div className="flex h-full justify-center">
                          <MedicalCenterCard center={center} isRtl={isRtl} startsFromLabel={startsFromLabel} locale={locale} detailsSegment={category.detailsSegment} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
