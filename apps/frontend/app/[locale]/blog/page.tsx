import { SectionContainer } from "@/components/shared/layout/SectionContainer";
import { getBlogPageContent } from "@/data/blog";
import { getNavAndFooterLabels } from "@/data/global";
import { fetchCmsBlogList } from "@/lib/blog-cms";
import { fetchPublicPage } from "@/lib/cms";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const BlogHeroSection = dynamic(() => import("@/components/blog/BlogHeroSection").then((m) => m.BlogHeroSection), { ssr: true });
const ResourceCenterSection = dynamic(() => import("@/components/blog/resourceCenter/ResourceCenterSection").then((m) => m.ResourceCenterSection), {
  ssr: true,
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  return {
    title: t("blog.meta.title"),
    description: t("blog.meta.description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const { t } = getTranslations(locale);
  const { labels } = getNavAndFooterLabels(t);
  const pageContent = getBlogPageContent(t, locale);
  const cmsPage = await fetchPublicPage("blog", locale);
  const heroSection = cmsPage?.page?.sections?.find((s) => s.key === "hero")?.content as
    | { title?: string; subtitle?: string }
    | undefined;

  if (heroSection?.title || heroSection?.subtitle) {
    pageContent.hero = {
      title: heroSection.title || pageContent.hero.title,
      subtitle: heroSection.subtitle || pageContent.hero.subtitle,
    };
  }
  const cmsPosts = await fetchCmsBlogList(locale);
  if (cmsPosts?.length) {
    pageContent.resourceCenter.posts = cmsPosts.map((post, index) => ({
      id: `cms-blog-${index}`,
      slug: post.slug,
      imageSrc: post.cover_image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      imageAlt: post.title || "Blog image",
      categoryLabel: post.category || "Blog",
      dateLabel: "",
      readingTimeLabel: "",
      title: post.title || "",
      excerpt: post.excerpt || "",
      readMoreLabel: t("blog.resourceCenter.readMore"),
      href: `/${locale}/blog/${encodeURIComponent(post.slug)}`,
    }));
  }

  return (
    <main className="flex w-full flex-col items-center pt-18">
      <StickyNavbar alwaysVisible locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <SectionContainer className="pb-6 pt-16">
        <BlogHeroSection locale={locale} content={pageContent.hero} />
      </SectionContainer>

      <ResourceCenterSection content={pageContent.resourceCenter} locale={locale} />
    </main>
  );
}
