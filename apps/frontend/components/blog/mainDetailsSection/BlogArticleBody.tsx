import { cn } from "@/lib/utils";
import type { BlogPostArticleBody } from "@/types/blog";
import Image from "next/image";

export type BlogArticleBodyProps = {
  body: BlogPostArticleBody;
  locale: string;
};

function ProgramsBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="w-full text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">{title}</h2>
      <ul className="w-full list-disc space-y-4 ps-6 text-base leading-6 text-[#4e5663] marker:text-(--color-text-brand)">
        {items.map((item, i) => (
          <li key={i}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogArticleBody({ body, locale }: BlogArticleBodyProps) {
  const isRtl = locale === "ar";
  const hasImage = typeof body.inlineImageSrc === "string" && body.inlineImageSrc.trim().length > 0;

  return (
    <article className="w-full px-4 py-12 sm:px-6 md:px-16 md:py-12 lg:py-16" dir={isRtl ? "rtl" : "ltr"} aria-label={body.section1Title}>
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-stretch gap-8 md:gap-8">
        <div className={cn("flex flex-col gap-4", isRtl ? "items-end text-right" : "items-start text-left")}>
          <h2 className="w-full text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">{body.section1Title}</h2>
          <p className="w-full text-base leading-6 text-[#4e5663]">{body.section1Body}</p>
        </div>

        <blockquote
          className={cn(
            "flex w-full flex-col gap-2 rounded-lg border border-[#e9ebf0] bg-[#f9fafc] p-6 text-[#1f242e]",
            isRtl ? "border-r-4 border-r-primary items-end text-right" : "border-l-4 border-l-primary items-start text-left",
          )}
        >
          <p className="w-full text-xl font-bold leading-8 text-(--color-text-brand)">{body.quoteText}</p>
          <footer className="w-full text-sm leading-5 text-[#4e5663]">{body.quoteSource}</footer>
        </blockquote>

        <div className={cn("flex flex-col gap-4", isRtl ? "items-end text-right" : "items-start text-left")}>
          <h2 className="w-full text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">{body.section2Title}</h2>
          <p className="w-full text-base leading-6 text-[#4e5663]">{body.section2Body}</p>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-lg border border-[#e9ebf0] bg-[#f9fafc] p-6">
          <p className="w-full text-center text-xl font-medium leading-8 text-[#1f242e]">{body.statsTitle}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {body.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-center">
                <p className="text-4xl font-semibold leading-[44px] tracking-[-0.72px] text-(--color-text-brand)">{stat.value}</p>
                <p className="text-sm leading-5 text-[#4e5663]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <ProgramsBlock title={body.programsTitle} items={body.programItems} />

        <div className="relative aspect-427/230 w-full overflow-hidden rounded-3xl shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)]">
          {hasImage ? (
            <Image src={body.inlineImageSrc} alt={body.inlineImageAlt} fill className="object-cover" sizes="(max-width: 900px) 100vw, 900px" />
          ) : (
            <div className="absolute inset-0 bg-[#f4f5f7]" aria-hidden />
          )}
        </div>

        <ProgramsBlock title={body.programsTitle} items={body.programItems} />
      </div>
    </article>
  );
}
