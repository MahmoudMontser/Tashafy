import { cn } from "@/lib/utils";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

export type HeroGalleryProps = {
  isRtl: boolean;
  floatingTitle: string;
  floatingDescription: string;
};

export function HeroGallery({ isRtl, floatingTitle, floatingDescription }: HeroGalleryProps) {
  const sideImagePosition = isRtl ? "right-0" : "left-0";

  return (
    <div className="relative mx-auto w-full max-w-[644px] px-2 sm:px-0" dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative mx-auto flex h-[min(420px,56vh)] w-full min-h-[240px] items-center overflow-visible sm:h-[min(528px,65vh)] sm:min-h-[280px]">
        <div className="flex flex-col items-center gap-5 py-2">
          {/* Doctor + lavender (exported composite) — right, overlaps toward center */}
          <div className="pointer-events-none">
            <Image
              src="/wellness2.svg"
              alt=""
              width={349}
              height={410}
              sizes="(max-width: 640px) min(66vw, 290px), (max-width: 1024px) min(46vw, 349px), 349px"
              className="h-auto w-[min(66vw,290px)] object-contain sm:w-[min(48vw,349px)] lg:w-[349px]"
              priority
            />
          </div>

          <div
            className={cn(
              "absolute -bottom-7 md:bottom-3 left-55 md:left-1/2  -translate-x-1/2 z-30 flex w-[min(calc(100%-0.5rem),205px)] max-w-[205px] flex-row items-center gap-2.5 rounded-[12px] border border-[#f1f3f7] bg-white px-2.5 py-2.5 shadow-[0px_10px_10px_0px_rgba(15,17,20,0.06),0px_20px_25px_0px_rgba(15,17,20,0.08)] sm:bottom-6 sm:w-[min(calc(100%-2rem),217px)] sm:max-w-[217px] sm:gap-4 sm:px-3 sm:py-3",
            )}
          >
            <div className="relative size-6 shrink-0 text-[#EF2752]" aria-hidden>
              <HeartHandshake className="size-6" strokeWidth={1.75} />
            </div>
            <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col gap-0.5 leading-0")}>
              <p className="whitespace-normal text-base font-medium leading-5 text-[#363085] sm:text-lg sm:leading-6">{floatingTitle}</p>
              <p className="text-xs leading-4 text-[#4e5663]">{floatingDescription}</p>
            </div>
          </div>
        </div>

        {/* Woman + pink (exported composite) — left, sits above pink underlay */}
        <div className={cn("absolute bottom-0 left-0 ltr:left-100 z-10 w-[min(44%,210px)] sm:w-[min(45%,260px)] lg:w-[min(45%,351px)]")}>
          <Image
            src="/wellness1.svg"
            alt=""
            width={234}
            height={234}
            sizes="(max-width: 640px) min(44vw, 210px), (max-width: 1024px) min(40vw, 260px), min(22vw, 351px)"
            className="relative z-10 h-auto w-full select-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
