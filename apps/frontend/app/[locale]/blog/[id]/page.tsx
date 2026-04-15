import { getBlogPostArticleBody, getBlogPostDetailHero, getBlogRelatedPosts } from "@/data/blog";
import { getNavAndFooterLabels } from "@/data/global";
import { fetchCmsBlogDetail } from "@/lib/blog-cms";
import { getTranslations } from "@/lib/localization/i18n-server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const StickyNavbar = dynamic(() => import("@/components/shared/navbar/StickyNavbar").then((m) => m.StickyNavbar), { ssr: true });
const HeroSection = dynamic(() => import("@/components/blog/mainDetailsSection/HeroSection").then((m) => m.default), { ssr: true });
const BlogArticleBody = dynamic(() => import("@/components/blog/mainDetailsSection/BlogArticleBody").then((m) => m.BlogArticleBody), { ssr: true });
const BlogRelatedArticlesSection = dynamic(() => import("@/components/blog/mainDetailsSection/BlogRelatedArticlesSection").then((m) => m.BlogRelatedArticlesSection), {
  ssr: true,
});
const JourneySection = dynamic(() => import("@/components/shared/journey/JourneySection").then((m) => m.JourneySection), { ssr: true });

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const { t } = getTranslations(locale);
  const slug = decodeURIComponent(id);
  const cms = await fetchCmsBlogDetail(slug, locale);
  if (cms?.post?.title) {
    return {
      title: `${cms.post.title} | ${t("blog.meta.title")}`,
      description: cms.post.excerpt || t("blog.meta.description"),
    };
  }
  const hero = getBlogPostDetailHero(slug, t, locale);
  if (!hero) {
    return {
      title: t("blog.meta.title"),
      description: t("blog.meta.description"),
    };
  }
  return {
    title: `${hero.title} | ${t("blog.meta.title")}`,
    description: t("blog.meta.description"),
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const slug = decodeURIComponent(id);
  const { t } = getTranslations(locale);
  const cms = await fetchCmsBlogDetail(slug, locale);
  let hero = getBlogPostDetailHero(slug, t, locale);
  let articleBody = getBlogPostArticleBody(t);
  let related = getBlogRelatedPosts(slug, t, locale, 3);

  if (cms?.post) {
    hero = {
      title: cms.post.title || "",
      categoryLabel: cms.post.category || "Blog",
      readingTimeLabel: "",
      publishedLabel: "",
      imageSrc: cms.post.cover_image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      imageAlt: cms.post.title || "Blog image",
      prevHref: null,
      nextHref: null,
      prevNavAriaLabel: t("blog.detail.prevPost"),
      nextNavAriaLabel: t("blog.detail.nextPost"),
    };

    articleBody = {
      ...articleBody,
      section1Title: cms.post.title || articleBody.section1Title,
      section1Body: cms.post.body || articleBody.section1Body,
      section2Title: "",
      section2Body: "",
      programItems: [],
    };

    related = {
      title: t("blog.detail.relatedTitle"),
      posts: (cms.related || []).map((item, index) => ({
        id: `cms-related-${index}`,
        slug: item.slug,
        imageSrc: item.cover_image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
        imageAlt: item.title || "Blog image",
        categoryLabel: item.category || "Blog",
        dateLabel: "",
        readingTimeLabel: "",
        title: item.title || "",
        excerpt: item.excerpt || "",
        readMoreLabel: t("blog.resourceCenter.readMore"),
        href: `/${locale}/blog/${encodeURIComponent(item.slug)}`,
      })),
    };
  }

  if (!hero) notFound();

  const { labels } = getNavAndFooterLabels(t);

  return (
    <main className="flex w-full flex-col items-center pt-18">
      <StickyNavbar alwaysVisible locale={locale} labels={labels} searchPlaceholder={t("nav.searchPlaceholder")} loadingLabel={t("common.loading")} />

      <div className="w-full  pt-16">
        <HeroSection locale={locale} hero={hero} />
      </div>

      <BlogArticleBody body={articleBody} locale={locale} />

      <BlogRelatedArticlesSection content={related} locale={locale} />

      <JourneySection
        locale={locale}
        title={t("recoveryJourney.cta.title")}
        subtitle={t("recoveryJourney.cta.subtitle")}
        primaryCardTitle={t("whyChoose.features.accreditedCenters.title")}
        primaryCardSubtitle={t("whyChoose.features.accreditedCenters.subtitle")}
        healthyLifeLabel={t("journey.healthyLife")}
        transparentPricesLabel={t("whyChoose.features.transparentPrices.title")}
        buttonLabel={t("recoveryJourney.cta.button")}
        buttonHref="https://wa.me/1234567890"
      />
    </main>
  );
}
