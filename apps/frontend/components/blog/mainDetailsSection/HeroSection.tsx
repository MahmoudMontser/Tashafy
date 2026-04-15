import { cn } from "@/lib/utils";
import type { BlogPostDetailHero } from "@/types/blog";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type HeroSectionProps = {
  hero: BlogPostDetailHero;
  locale: string;
};

function HeroNavControl({ href, ariaLabel, children }: { href: string | null; ariaLabel: string; children: ReactNode }) {
  const className = cn(
    "flex size-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary/35 bg-[#f4f6fc] text-[#686e7d] opacity-90 transition-[opacity,background-color] hover:bg-[#eef1fa] hover:opacity-100 md:size-[72px]",
    href && "cursor-pointer",
  );

  if (!href) {
    return <div className={cn(className, "pointer-events-none invisible")} aria-hidden />;
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

function HeroTextBlock({ hero }: { hero: BlogPostDetailHero }) {
  return (
    <div className="flex w-full max-w-[861px] flex-col items-center gap-8">
      <h1
        id="blog-detail-hero-title"
        className="w-full text-center text-3xl font-semibold tracking-[-0.02em] text-(--color-text-brand) md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]"
      >
        {hero.title}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-6 text-base leading-6 text-(--color-text-secondary)  md:gap-6">
        <span className="inline-flex h-6 items-center rounded-lg border border-[#d1d5de] bg-white px-4 text-xs font-normal leading-4 text-[#1f242e]" role="note">
          {hero.categoryLabel}
        </span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <Clock className="size-4 shrink-0 text-(--color-text-secondary) mb-1" aria-hidden strokeWidth={1.75} />
          <span>{hero.readingTimeLabel}</span>
        </span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <Calendar className="size-4 shrink-0 text-(--color-text-secondary)  mb-1" aria-hidden strokeWidth={1.75} />
          <span>{hero.publishedLabel}</span>
        </span>
      </div>

      <div className="h-1.5 w-full max-w-[332px] bg-[#f25173]" aria-hidden />
    </div>
  );
}

export default function HeroSection({ hero, locale }: HeroSectionProps) {
  const isRtl = locale === "ar";
  const hasImage = typeof hero.imageSrc === "string" && hero.imageSrc.trim().length > 0;

  return (
    <section className="relative w-full overflow-hidden rounded-[26px] bg-white" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="blog-detail-hero-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl md:-left-32 md:h-96 md:w-96"
          style={{
            opacity: 0.4,
            background: "radial-gradient(50% 50% at 50% 50%, #A8C8FF 0%, rgba(171, 171, 171, 0.00) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-14 md:gap-[60px]">
        <div className="mx-auto grid w-full max-w-[1312px] grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-y-0">
          <div className="col-span-2 row-start-1 flex flex-col items-center px-2 pt-2 md:col-span-1 md:col-start-2 md:px-6 md:pt-0">
            <HeroTextBlock hero={hero} />
          </div>
          <div className="col-start-1 row-start-2 self-center md:col-start-1 md:row-start-1">
            <HeroNavControl href={hero.prevHref} ariaLabel={hero.prevNavAriaLabel}>
              {isRtl ? (
                <ChevronRight className="size-5 md:size-[22px]" aria-hidden strokeWidth={2} />
              ) : (
                <ChevronLeft className="size-5 md:size-[22px]" aria-hidden strokeWidth={2} />
              )}
            </HeroNavControl>
          </div>
          <div className="col-start-2 row-start-2 flex justify-end self-center md:col-start-3 md:row-start-1 md:justify-start">
            <HeroNavControl href={hero.nextHref} ariaLabel={hero.nextNavAriaLabel}>
              {isRtl ? (
                <ChevronLeft className="size-5 md:size-[22px]" aria-hidden strokeWidth={2} />
              ) : (
                <ChevronRight className="size-5 md:size-[22px]" aria-hidden strokeWidth={2} />
              )}
            </HeroNavControl>
          </div>
        </div>

        <div className="w-full px-0 sm:px-6 md:px-16">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-[#e9ebf0] shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]",
              "aspect-16/10 min-h-[220px] md:min-h-[400px] lg:min-h-[480px]",
            )}
          >
            {hasImage ? (
              <Image src={hero.imageSrc} alt={hero.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, min(1312px, 100vw)" priority />
            ) : (
              <div className="absolute inset-0 bg-[#f4f5f7]" aria-hidden />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
