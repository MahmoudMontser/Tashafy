import { cn } from "@/lib/utils";
import type { BlogHeroContent } from "@/types/blog";

const HERO_DECO_PATH =
  "M-49 131.714C-10.98 125.526 154.959 197.369 154.959 310.312C154.959 451.491 -79.9858 261.094 154.959 246.414C389.904 231.735 405.969 358.667 271.829 472.215M947.514 474.355C928.487 392.097 1081.03 337.462 1063.81 178.132C1057.52 120.019 999.156 94.658 964.026 133.256C923.203 178.109 904.53 323.718 1285.21 261.342C1589.74 211.442 1483.06 -32.201 1492.63 -37";

function HeroDecoSvg({ mode }: { mode: "meet" | "slice" }) {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1312 394"
      fill="none"
      preserveAspectRatio={mode === "meet" ? "xMidYMid meet" : "xMidYMid slice"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={HERO_DECO_PATH} stroke="#F25173" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type BlogHeroSectionProps = {
  locale: string;
  content: BlogHeroContent;
};

export function BlogHeroSection({ locale, content }: BlogHeroSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full min-h-[280px] overflow-hidden rounded-3xl bg-(--color-text-brand) py-14 md:min-h-[320px] md:py-16"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="blog-hero-title"
    >
      <div className={cn("pointer-events-none absolute inset-0 z-1 from-white/20 to-transparent", isRtl ? "bg-linear-to-l" : "bg-linear-to-r")} aria-hidden />

      <div
        className={cn(
          "pointer-events-none absolute z-0 opacity-80 md:opacity-70",
          "top-[-5%] right-[-8%] bottom-[-10%] left-[-3%]",
          "md:top-[-9.39%] md:right-[-14.57%] md:bottom-[-20.39%] md:left-[-3.73%]",
        )}
        aria-hidden
      >
        <div className="absolute inset-0 h-full w-full md:inset-[-0.7%_-0.26%_-0.18%_0]">
          <div className="h-full w-full md:hidden">
            <HeroDecoSvg mode="meet" />
          </div>
          <div className="hidden h-full w-full md:block">
            <HeroDecoSvg mode="slice" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="inline-flex h-10 w-[95px] shrink-0 text-(--color-accent-rose)" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="95" height="40" viewBox="0 0 95 40" fill="none">
            <g clipPath="url(#clip0_1447_24634)">
              <path
                d="M19.0958 4.0641C24.1294 4.01445 27.893 6.68845 31.5254 9.57523C35.4523 12.6961 39.1272 16.1645 43.2279 19.0264C49.1376 23.1509 54.4514 22.6083 60.0703 18.3171C62.8549 16.1893 65.2776 13.5933 67.9204 11.2704C72.9291 6.87286 78.0762 2.67036 84.5819 0.609894C86.6641 -0.049739 88.7251 -0.301534 90.9137 0.482223C94.2907 1.69155 95.2236 6.6388 94.6632 9.31634C94.0921 12.0577 92.8292 13.0968 89.7786 13.2741C84.33 13.5933 79.7434 15.9871 75.4477 19.0654C70.0984 22.8991 66.0261 27.9492 62.3086 33.2936C58.9635 38.1026 54.5507 40.7127 48.5984 39.8261C44.9908 39.2871 41.7664 37.5954 38.7193 35.6059C33.2671 32.0418 27.8505 28.4209 22.3416 24.9489C18.9114 22.7892 15.091 21.438 11.0506 21.1649C8.44339 20.9911 5.84679 21.7075 3.60138 23.2005C2.70392 23.7963 1.72842 24.3602 0.930286 23.4949C0.355629 22.8707 -0.165819 21.672 0.0399227 20.9379C1.27437 16.5014 3.06929 12.2386 6.85422 9.38727C9.277 7.56086 12.0758 6.1884 14.832 4.87623C16.0948 4.27689 17.6592 4.3159 19.0852 4.0641H19.0958Z"
                fill="#EF2752"
              />
            </g>
            <defs>
              <clipPath id="clip0_1447_24634">
                <rect width="94.8148" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <h1 id="blog-hero-title" className="text-4xl font-bold leading-[56px] tracking-[-0.96px] text-white md:text-5xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[#9fa5b2] md:text-xl md:leading-8">{content.subtitle}</p>
      </div>
    </section>
  );
}
