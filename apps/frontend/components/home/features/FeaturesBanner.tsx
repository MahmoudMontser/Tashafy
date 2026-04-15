import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import { FeatureCard } from "./FeatureCard";
import type { FeatureItem } from "@/types/home";

type FeaturesBannerProps = {
  locale: string;
  features: FeatureItem[];
};

export function FeaturesBanner({ locale, features }: FeaturesBannerProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden bg-primary py-12 md:py-16 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className={cn(
                // Middle card floats slightly higher on larger screens
                index === 1 && "mt-0 lg:-mt-6",
              )}
            >
              <FeatureCard feature={feature} isRtl={isRtl} />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
