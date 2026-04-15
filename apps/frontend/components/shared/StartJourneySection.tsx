import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const JOURNEY_DECO_PATH =
  "M-49 131.714C-10.98 125.526 154.959 197.369 154.959 310.312C154.959 451.491 -79.9858 261.094 154.959 246.414C389.904 231.735 405.969 358.667 271.829 472.215M947.514 474.355C928.487 392.097 1081.03 337.462 1063.81 178.132C1057.52 120.019 999.156 94.658 964.026 133.256C923.203 178.109 904.53 323.718 1285.21 261.342C1589.74 211.442 1483.06 -32.201 1492.63 -37";

function JourneyDecoSvg({ mode }: { mode: "meet" | "slice" }) {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1312 394"
      fill="none"
      preserveAspectRatio={mode === "meet" ? "xMidYMid meet" : "xMidYMid slice"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={JOURNEY_DECO_PATH} stroke="#F25173" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StartJourneySectionProps = {
  locale: string;
  preHighlightTitle: string;
  highlightedTitle: string;
  postHighlightTitle: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
};

const StartJourneySection = ({ locale, preHighlightTitle, highlightedTitle, postHighlightTitle, subtitle, buttonLabel, buttonHref }: StartJourneySectionProps) => {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden bg-(--color-text-brand) py-14 md:py-16" dir={isRtl ? "rtl" : "ltr"} aria-label={buttonLabel}>
      <div className={cn("pointer-events-none absolute inset-0 z-1 from-white/10 to-[#FFFFFF00]", isRtl ? "bg-linear-to-l" : "bg-linear-to-r")} aria-hidden />

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
            <JourneyDecoSvg mode="meet" />
          </div>
          <div className="hidden h-full w-full md:block">
            <JourneyDecoSvg mode="slice" />
          </div>
        </div>
      </div>

      <SectionContainer className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            <span>{preHighlightTitle}</span>
            <span className="inline-block rounded-[2px] bg-(--color-accent-rose) px-2 py-0.5">{highlightedTitle}</span>
            {postHighlightTitle ? <span>{` ${postHighlightTitle}`}</span> : null}
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-xl">{subtitle}</p>

          <Button
            asChild
            className="mt-8 h-14 rounded-lg border border-(--color-text-inactive-subtle) bg-white px-6 text-base font-medium text-(--color-text-primary) shadow-[0px_1px_2px_0px_rgba(15,17,20,0.06)] hover:bg-white/95"
          >
            <Link href={buttonHref} className={`inline-flex items-center gap-2 ${isRtl ? "flex-row-reverse" : "flex-row"}`} target="_blank" rel="noopener noreferrer">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 7L9 12L14 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{buttonLabel}</span>
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
};

export default StartJourneySection;
