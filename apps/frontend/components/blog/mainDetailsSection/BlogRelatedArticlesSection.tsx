import { BlogPostCard } from "@/components/blog/resourceCenter/BlogPostCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { BlogRelatedPostsContent } from "@/types/blog";

export type BlogRelatedArticlesSectionProps = {
  content: BlogRelatedPostsContent;
  locale: string;
};

export function BlogRelatedArticlesSection({ content, locale }: BlogRelatedArticlesSectionProps) {
  const isRtl = locale === "ar";

  if (content.posts.length === 0) return null;

  return (
    <section className="w-full pb-12 pt-0 md:pb-16" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="blog-related-heading">
      <SectionContainer>
        <div className="flex flex-col gap-6 md:gap-8">
          <h2
            id="blog-related-heading"
            className={cn(
              "w-full text-xl font-semibold leading-6 tracking-[-0.2px] text-(--color-text-brand)",
              isRtl ? "text-right" : "text-left",
            )}
          >
            {content.title}
          </h2>
          <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-items-stretch lg:grid-cols-3 lg:gap-4">
            {content.posts.map((post) => (
              <div key={post.id} className="w-full max-w-[426px] md:max-w-none">
                <BlogPostCard post={post} isRtl={isRtl} />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
