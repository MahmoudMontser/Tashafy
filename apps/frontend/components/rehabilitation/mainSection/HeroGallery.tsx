import { cn } from "@/lib/utils";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/rehabilitation";
import PlusDecoration from "./PlusDecoration";

const CARD_SHELL =
  "relative w-full overflow-hidden rounded-[2.75rem] shadow-[0_25px_50px_-12px_rgba(15,17,20,0.35)] sm:rounded-[3rem] h-[min(500px,53vh)] w-full max-w-[220px]";

const CENTER_IMAGE_FADE = "pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-[#433ca6]/90 to-transparent";

/** Vertical offset per column: outer-low, center-high, outer-mid — mirrored in RTL. */
function staggerClass(index: number, isRtl: boolean): string {
  const ltr = ["sm:translate-y-8 md:translate-y-12", "sm:-translate-y-6 md:-translate-y-10", "sm:translate-y-2 md:translate-y-4"] as const;
  const rtl = ["sm:translate-y-2 md:translate-y-4", "sm:-translate-y-6 md:-translate-y-10", "sm:translate-y-8 md:translate-y-12"] as const;
  const table = isRtl ? rtl : ltr;
  return table[index] ?? "";
}

type HeroGalleryProps = {
  isRtl: boolean;
};

export function HeroGallery({ isRtl }: HeroGalleryProps) {
  const reserveSideForPluses = isRtl ? "sm:pl-14 lg:pl-16" : "sm:pr-14 lg:pr-16";
  const plusAnchorSide = isRtl ? "left-0" : "right-0";

  return (
    <div className={cn("relative min-h-0 w-full py-4 sm:min-h-[min(560px,58vh)] sm:py-6", reserveSideForPluses)}>
      <div className={cn("pointer-events-none absolute z-10 hidden -translate-y-1/2 lg:block", "top-[48%]", plusAnchorSide)} aria-hidden>
        <PlusDecoration />
      </div>

      <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-center sm:gap-3 md:gap-4">
        {GALLERY_IMAGES.map((item, index) => (
          <div key={index} className={cn("flex min-h-0 w-full max-w-[280px] flex-1 flex-col sm:max-w-[min(220px,30vw)]", staggerClass(index, isRtl))}>
            <div className={CARD_SHELL}>
              <Image src={item.src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 28vw" />
              {index === 1 && <div className={CENTER_IMAGE_FADE} aria-hidden />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
