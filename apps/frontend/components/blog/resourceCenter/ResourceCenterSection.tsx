import { BlogPostCard } from "@/components/blog/resourceCenter/BlogPostCard";
import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { cn } from "@/lib/utils";
import type { BlogResourceCenterContent } from "@/types/blog";

export type ResourceCenterSectionProps = {
  content: BlogResourceCenterContent;
  locale: string;
};

export function ResourceCenterSection({ content, locale }: ResourceCenterSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="w-full bg-white py-10 md:py-16" dir={isRtl ? "rtl" : "ltr"} aria-labelledby="blog-resource-center-heading">
      <SectionContainer>
        <div className={cn("flex flex-col gap-8 md:gap-12")}>
          <div className={cn("flex w-full flex-col gap-2")}>
            <h2 id="blog-resource-center-heading" className="text-[28px] font-semibold leading-8 tracking-[-0.56px] text-(--color-text-brand)">
              {content.title}
            </h2>
            <p className="max-w-3xl text-xl leading-8 text-[#4e5663]">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {content.posts.map((post) => (
              <BlogPostCard key={post.id} post={post} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
