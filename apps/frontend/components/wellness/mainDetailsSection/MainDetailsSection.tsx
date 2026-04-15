"use client";

import { Navbar } from "@/components/shared/navbar/Navbar";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { NavLabels } from "@/types/global";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type MainDetailsSectionProps = {
  locale: string;
  labels: NavLabels;
  searchPlaceholder: string;
  loadingLabel?: string;
  slides: string[];
  centerName: string;
  badgeLabel: string;
  location: string;
  rating: string;
  reviewsLabel: string;
};

export default function MainDetailsSection({
  locale,
  labels,
  searchPlaceholder,
  loadingLabel,
  slides,
  centerName,
  badgeLabel,
  location,
  rating,
  reviewsLabel,
}: MainDetailsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="main-section"
      className="relative isolate z-50 flex min-h-screen w-[99%] flex-col items-center justify-start overflow-hidden rounded-b-[36px] scroll-smooth"
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={centerName}
    >
      <div className="z-50 mx-auto w-full shrink-0 px-4 sm:w-[96%] sm:px-0">
        <Navbar className="navbar" locale={locale} labels={labels} searchPlaceholder={searchPlaceholder} loadingLabel={loadingLabel} />
      </div>

      <div className="container flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 w-full overflow-hidden rounded-b-[36px]">
          <div className="absolute inset-0 h-full min-h-[min(840px,90vh)]">
            <Swiper
              className="h-full w-full"
              dir={isRtl ? "rtl" : "ltr"}
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              loop
              speed={600}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                prevEl: `.${"rehab-detail-hero-prev"}`,
                nextEl: `.${"rehab-detail-hero-next"}`,
              }}
              pagination={{
                el: `.${"rehab-detail-hero-pagination"}`,
                clickable: true,
                bulletClass: "inline-block w-3 h-3 rounded-xl bg-white/30 transition-all cursor-pointer",
                bulletActiveClass: "!w-6 !h-3 !bg-primary rounded-full shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)]",
              }}
            >
              {slides.map((src, index) => (
                <SwiperSlide key={`${src}-${index}`} className="h-full!">
                  <div className="relative h-full w-full">
                    <Image src={src} alt={index === 0 ? centerName : ""} fill className="object-cover" sizes="100vw" priority={index === 0} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{ backgroundImage: "linear-gradient(178.85deg, rgba(31, 36, 46, 0.72) 19.17%, rgba(54, 48, 133, 0) 135.32%)" }}
            aria-hidden
          />
          <Image
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30"
            src="/Grid.svg"
            alt=""
            width={1440}
            height={800}
            priority
            aria-hidden
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1 mx-auto h-[min(55vh,520px)] w-full rounded-b-[36px] bg-linear-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto mt-auto flex min-h-[min(840px,90vh)] w-full flex-1 flex-col justify-end pb-8 md:pb-10">
          <SectionContainer>
            <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-6")}>
              <div className={cn("flex max-w-xl flex-col gap-3 order-1 ")}>
                <div className={cn("flex flex-wrap items-center gap-3")}>
                  <span className="size-3 shrink-0 rounded-full bg-(--color-accent-rose)" aria-hidden />
                  <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{centerName}</h1>
                </div>

                <div className={cn("flex flex-wrap items-center gap-2 mt-2 text-lg text-white/90")}>
                  <span className="inline-flex h-7 items-center rounded-full bg-[#433ca6] px-3 text-sm font-medium text-[#f2f1fa]">{badgeLabel}</span>
                  <span className="text-(--color-text-inactive-subtle)">{location}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                    <span className="text-white/90 mt-1.5">{rating}</span>
                    <span className="text-(--color-text-inactive-subtle) mt-1.5">{reviewsLabel}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 order-2 ">
                <button
                  type="button"
                  className={cn(
                    "rehab-detail-hero-next",
                    "shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white border border-primary/30 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10",
                  )}
                  aria-label={isRtl ? "Previous slide" : "Next slide"}
                >
                  {isRtl ? (
                    <ChevronRight className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                  ) : (
                    <ChevronLeft className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                  )}
                </button>

                <div className={cn("rehab-detail-hero-pagination", "flex justify-center items-center gap-2.5")} />

                <button
                  type="button"
                  className={cn(
                    "rehab-detail-hero-prev",
                    "shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white border border-primary/30 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10",
                  )}
                  aria-label={isRtl ? "Next slide" : "Previous slide"}
                >
                  {isRtl ? (
                    <ChevronLeft className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-(--color-text-brand)" aria-hidden />
                  )}
                </button>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </section>
  );
}
