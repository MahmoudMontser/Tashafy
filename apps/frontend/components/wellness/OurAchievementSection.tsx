import { cn } from "@/lib/utils";
import type { WellnessAchievementStat } from "@/types/welness";
import dynamic from "next/dynamic";

const SectionContainer = dynamic(() => import("@/components/shared/layout/SectionContainer").then((m) => m.SectionContainer), { ssr: true });

type OurAchievementSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  stats: WellnessAchievementStat[];
};

function OurAchievementSection({ locale, title, subtitle, stats }: OurAchievementSectionProps) {
  const isRtl = locale === "ar";
  const displayStats = isRtl ? [...stats].reverse() : stats;

  return (
    <section className="relative w-full overflow-hidden py-8 md:py-12 bg-white" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer>
        <div className="self-stretch rounded-3xl px-6 py-8 md:px-10 md:py-20" style={{ backgroundColor: "#FCE7F3" }}>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-start">
            <div className={cn("flex max-w-xl flex-col gap-4")}>
              <h2 className="text-(--color-text-brand) text-3xl font-bold md:text-4xl lg:text-5xl">
                {title}
                <span className="inline-block translate-y-1 items-end gap-1 ms-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M19.3055 7.54704L12.8286 11.6913L11.7585 19.3057L7.6143 12.8288L-0.000191963 11.7587L6.47676 7.6145L7.54684 7.885e-06L11.6911 6.47696L19.3055 7.54704Z"
                      fill="#F8A4B6"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                    <path
                      d="M30.4426 8.74882L21.0806 17.5842L21.6938 30.4425L12.8584 21.0805L0.000157695 21.6936L9.36214 12.8582L8.74898 -6.02037e-06L17.5844 9.36197L30.4426 8.74882Z"
                      fill="#EF2752"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-(--color-text-secondary) text-base md:text-lg lg:text-xl">{subtitle}</p>
            </div>

            <div className={cn("flex w-full flex-1 flex-wrap items-center justify-center gap-8 ")}>
              {displayStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center text-center">
                  <span className="text-secondary text-3xl font-bold tabular-nums md:text-6xl">{stat.value}</span>
                  <span className="mt-1.5 text-sm text-(--color-text-secondary) md:text-xl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default OurAchievementSection;
