import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "./ArticleCard";
import type { ArticleItem } from "@/types/home";

type LatestArticlesSectionProps = {
  locale: string;
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  readMoreLabel: string;
  articles: ArticleItem[];
};

export function LatestArticlesSection({ locale, title, subtitle, viewAllLabel, viewAllHref, readMoreLabel, articles }: LatestArticlesSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden bg-[##F9FAFC] py-12 md:py-16 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <SectionContainer className="relative">
        {/* Header row: title + subtitle on one side, View All button on the other */}
        <header className="flex flex-wrap items-start justify-between gap-6 mb-10 md:mb-14">
          <div className={cn("section-heading-stack", isRtl ? " text-right" : "text-left")}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-(--color-text-brand)">{title}</h2>
            {subtitle != null && subtitle.trim() !== "" && <p className="text-lg md:text-xl w-full max-w-[1000px] text-(--color-text-secondary)">{subtitle}</p>}
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-md border-(--color-border-input) bg-white hover:bg-gray-100 text-(--color-text-primary) font-medium px-6 py-5 shrink-0"
          >
            <Link href={viewAllHref}>{viewAllLabel}</Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={`${article.title}-${index}`} article={article} readMoreLabel={readMoreLabel} isRtl={isRtl} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
