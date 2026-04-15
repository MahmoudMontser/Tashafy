import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { WhyChooseFeature, WhyChooseStat } from "@/types/home";
import Link from "next/link";
import Image from "next/image";
import { FeatureCard } from "./FeatureCard";

type WhyChooseSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  features: WhyChooseFeature[];
  stats: WhyChooseStat[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
};
export function WhyChooseSection({
  locale,
  title,
  subtitle,
  features,
  stats,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryHref = "#",
  ctaSecondaryHref = "#",
}: WhyChooseSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_800px]"
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={title}
    >
      <SectionContainer className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-stretch">
          {/* CTA block — alignment follows dir (start = right in RTL, end = right in LTR) */}
          <div className={cn("order-1 w-full p-4 sm:p-5 md:p-6 flex flex-col justify-start space-y-10")}>
            <div className={cn("relative min-w-0 section-heading-stack")}>
              <h2 className="text-2xl md:text-4xl lg:text-[41px] font-bold text-(--color-text-brand)">
                {title}
                <span className="inline-block">
                  <Image
                    className={cn("w-7 h-7 md:w-10 md:h-10 object-contain ", !isRtl && "rotate-120")}
                    src="/Group.svg"
                    alt="Why Choose Tashafy"
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

            <div className={cn("flex flex-wrap gap-6")}>
              {stats.map((stat, index) => (
                <div key={`${stat.value}-${index}`} className={cn("flex flex-col items-start")}>
                  <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-(--color-text-brand)">{stat.value}</span>
                  <span
                    className={cn(
                      "text-xs sm:text-sm md:text-base lg:text-xl text-(--color-text-secondary) mt-1 max-w-[200px] sm:max-w-[250px]",
                      isRtl ? "text-right" : "text-left",
                    )}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className={cn("flex flex-wrap gap-3 sm:gap-4")}>
              <Button asChild className="w-fit h-12 bg-primary hover:bg-primary/90 text-white text-base sm:text-lg md:text-xl font-medium  rounded-xl">
                <Link href={ctaPrimaryHref}>{ctaPrimary}</Link>
              </Button>
              <Button
                asChild
                className="w-fit h-12 text-base sm:text-lg md:text-xl border border-(--color-border-input) bg-white hover:bg-gray-100 text-(--color-text-primary) rounded-xl font-medium"
              >
                <Link href={ctaSecondaryHref}>{ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          {/* Features card — order follows dir (right in RTL, left in LTR) */}
          <Card className="order-2 lg:order-1 rounded-lg border-0 p-6  bg-[#F9FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden h-fit">
            <CardContent className="p-0 flex flex-col space-y-4">
              {features.map((feature, index) => (
                <FeatureCard key={`${feature.title}-${index}`} feature={feature} isRtl={isRtl} />
              ))}
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </section>
  );
}
