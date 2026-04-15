import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { AboutUsCeoContent } from "@/types/about";
import Image from "next/image";

export type AboutUsCeoMessageSectionProps = {
  locale: string;
  content: AboutUsCeoContent;
};

export default function AboutUsCeoMessageSection({ locale, content }: AboutUsCeoMessageSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="w-full border-y-2 border-[#fca5a5] bg-[#f9fafc] px-4 py-16 md:px-6 md:py-24 lg:px-8"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="about-ceo-heading"
    >
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-[120px]">
          <div className={cn("flex flex-col gap-12")}>
            <div className={cn("flex flex-col gap-3")}>
              <div className={cn("flex")}>
                <div className="shrink-0 w-8 h-8 flex items-center gap-2 text-destructive/30" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <path
                      opacity="0.3"
                      d="M30.0625 22.75H43.875C44.306 22.75 44.7193 22.9212 45.024 23.226C45.3288 23.5307 45.5 23.944 45.5 24.375V37.375C45.5 37.806 45.3288 38.2193 45.024 38.524C44.7193 38.8288 44.306 39 43.875 39H31.6875C31.2565 39 30.8432 38.8288 30.5385 38.524C30.2337 38.2193 30.0625 37.806 30.0625 37.375V22.75Z"
                      fill="#EF2752"
                    />
                    <path
                      opacity="0.3"
                      d="M6.5 22.75H20.3125C20.7435 22.75 21.1568 22.9212 21.4615 23.226C21.7663 23.5307 21.9375 23.944 21.9375 24.375V37.375C21.9375 37.806 21.7663 38.2193 21.4615 38.524C21.1568 38.8288 20.7435 39 20.3125 39H8.125C7.69402 39 7.2807 38.8288 6.97595 38.524C6.6712 38.2193 6.5 37.806 6.5 37.375V22.75Z"
                      fill="#EF2752"
                    />
                    <path
                      d="M30.0625 22.75H43.875C44.306 22.75 44.7193 22.9212 45.024 23.226C45.3288 23.5307 45.5 23.944 45.5 24.375V37.375C45.5 37.806 45.3288 38.2193 45.024 38.524C44.7193 38.8288 44.306 39 43.875 39H31.6875C31.2565 39 30.8432 38.8288 30.5385 38.524C30.2337 38.2193 30.0625 37.806 30.0625 37.375V19.5C30.0625 17.3451 30.9185 15.2785 32.4423 13.7548C33.966 12.231 36.0326 11.375 38.1875 11.375"
                      stroke="#EF2752"
                      strokeWidth="3.35484"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 22.75H20.3125C20.7435 22.75 21.1568 22.9212 21.4615 23.226C21.7663 23.5307 21.9375 23.944 21.9375 24.375V37.375C21.9375 37.806 21.7663 38.2193 21.4615 38.524C21.1568 38.8288 20.7435 39 20.3125 39H8.125C7.69402 39 7.2807 38.8288 6.97595 38.524C6.6712 38.2193 6.5 37.806 6.5 37.375V19.5C6.5 17.3451 7.35602 15.2785 8.87976 13.7548C10.4035 12.231 12.4701 11.375 14.625 11.375"
                      stroke="#EF2752"
                      strokeWidth="3.35484"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h2 id="about-ceo-heading" className="text-[48px] font-bold leading-[56px] tracking-[-0.96px] text-(--color-text-brand)">
                {content.sectionTitle}
              </h2>
            </div>

            <div className="flex flex-row items-center gap-2.5">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#abf5e7]">
                <Image src={content.avatarSrc} alt={content.avatarAlt} fill className="object-cover" sizes="48px" />
              </div>
              <div className={cn("flex flex-col gap-0.5")}>
                <p className="text-xl font-medium leading-8 text-(--color-text-primary)">{content.name}</p>
                <p className="text-sm font-bold leading-5 text-[#4e5663]">{content.role}</p>
              </div>
            </div>
          </div>

          <div className={cn("flex flex-col gap-6")}>
            <blockquote className="text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">
              &ldquo;
              {content.message}
              &rdquo;
            </blockquote>
            <div className="w-full max-w-full rounded-xl bg-[#f1f3f7] px-6 py-4">
              <p className="text-sm font-medium leading-4 text-(--color-text-secondary)">{content.callout}</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
