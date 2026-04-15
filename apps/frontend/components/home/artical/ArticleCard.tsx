import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, User, ArrowUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleItem } from "@/types/home";

type ArticleCardProps = {
  article: ArticleItem;
  readMoreLabel: string;
  isRtl: boolean;
};

export function ArticleCard({ article, readMoreLabel, isRtl }: ArticleCardProps) {
  return (
    <Card className="h-full overflow-hidden rounded-2xl border border-(--color-border-subtle) bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <Link href={article.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl">
        <div className="relative w-full aspect-16/10 overflow-hidden rounded-t-2xl bg-muted">
          <Image src={article.image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <span
            className={cn(
              "absolute top-3 rounded-lg bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-(--color-text-brand)",
              !isRtl ? "right-3" : "left-3",
            )}
          >
            {article.category}
          </span>
        </div>
        <CardContent className="p-4 md:p-5 flex flex-col gap-3">
          <p className={cn("flex items-center gap-2 text-base text-muted-foreground")}>
            <span className={cn("inline-flex items-center gap-1.5")}>
              <User className="size-3.5 shrink-0 opacity-70 text-muted-foreground mb-1" aria-hidden />
              {article.author}
            </span>

            <span aria-hidden className="mt-1">
              ·
            </span>

            <span className="inline-flex items-center gap-1.5 mb-1">
              <Calendar className="size-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="mt-1">{article.date}</span>
            </span>
          </p>
          <h3 className={cn("text-base md:text-lg lg:text-xl font-bold text-(--color-text-brand) line-clamp-2", isRtl ? "text-right" : "text-left")}>{article.title}</h3>
          <p className={cn("text-sm md:text-base lg:text-lg text-(--color-text-secondary)  line-clamp-3", isRtl ? "text-right" : "text-left")}>{article.description}</p>
          <span className={cn("inline-flex items-center justify-center mx-auto gap-1.5 text-sm font-medium text-(--color-text-brand) mt-1 w-fit")}>
            {!isRtl ? <ArrowUpLeft className="size-4 shrink-0" aria-hidden /> : <ArrowUpRight className="size-4 shrink-0" aria-hidden />}
            {readMoreLabel}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
