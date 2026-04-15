import type { BlogPageContent, BlogPostCard, BlogPostArticleBody, BlogPostDetailHero, BlogRelatedPostsContent } from "@/types/blog";

const BLOG_POST_IMAGE_URLS: readonly string[] = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80",
];

const BLOG_POST_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

const BLOG_ARTICLE_INLINE_IMAGE =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80";

function buildBlogPostCards(t: (key: string) => string, locale: string): BlogPostCard[] {
  return BLOG_POST_KEYS.map((index) => {
    const base = `blog.posts.${index}`;
    const slug = t(`${base}.slug`);
    return {
      id: `blog-post-${index}`,
      slug,
      imageSrc: BLOG_POST_IMAGE_URLS[index] ?? BLOG_POST_IMAGE_URLS[0],
      imageAlt: t(`${base}.imageAlt`),
      categoryLabel: t(`${base}.category`),
      dateLabel: t("blog.resourceCenter.dateLabel"),
      readingTimeLabel: t("blog.resourceCenter.readingTime"),
      title: t(`${base}.title`),
      excerpt: t(`${base}.excerpt`),
      readMoreLabel: t("blog.resourceCenter.readMore"),
      href: `/${locale}/blog/${encodeURIComponent(slug)}`,
    };
  });
}

export function getBlogPageContent(t: (key: string) => string, locale: string): BlogPageContent {
  return {
    hero: {
      title: t("blog.hero.title"),
      subtitle: t("blog.hero.subtitle"),
    },
    resourceCenter: {
      title: t("blog.resourceCenter.title"),
      subtitle: t("blog.resourceCenter.subtitle"),
      posts: buildBlogPostCards(t, locale),
    },
  };
}

/** Resolves hero data for `/[locale]/blog/[id]` where `id` is the post slug. */
export function getBlogPostDetailHero(slug: string, t: (key: string) => string, locale: string): BlogPostDetailHero | null {
  const posts = buildBlogPostCards(t, locale);
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const post = posts[index];
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return {
    title: post.title,
    categoryLabel: post.categoryLabel,
    readingTimeLabel: post.readingTimeLabel,
    publishedLabel: t(`blog.posts.${index}.publishedOn`),
    imageSrc: post.imageSrc,
    imageAlt: post.imageAlt,
    prevHref: prev ? prev.href : null,
    nextHref: next ? next.href : null,
    prevNavAriaLabel: t("blog.detail.prevPost"),
    nextNavAriaLabel: t("blog.detail.nextPost"),
  };
}

export function getBlogPostArticleBody(t: (key: string) => string): BlogPostArticleBody {
  const programKeys = [0, 1, 2, 3, 4] as const;
  return {
    section1Title: t("blog.detail.article.section1Title"),
    section1Body: t("blog.detail.article.section1Body"),
    quoteText: t("blog.detail.article.quoteText"),
    quoteSource: t("blog.detail.article.quoteSource"),
    section2Title: t("blog.detail.article.section2Title"),
    section2Body: t("blog.detail.article.section2Body"),
    statsTitle: t("blog.detail.article.statsTitle"),
    stats: [
      { value: t("blog.detail.article.stats.0.value"), label: t("blog.detail.article.stats.0.label") },
      { value: t("blog.detail.article.stats.1.value"), label: t("blog.detail.article.stats.1.label") },
      { value: t("blog.detail.article.stats.2.value"), label: t("blog.detail.article.stats.2.label") },
    ],
    programsTitle: t("blog.detail.article.programsTitle"),
    programItems: programKeys.map((i) => t(`blog.detail.article.programs.${i}`)),
    inlineImageSrc: BLOG_ARTICLE_INLINE_IMAGE,
    inlineImageAlt: t("blog.detail.article.inlineImageAlt"),
  };
}

export function getBlogRelatedPosts(slug: string, t: (key: string) => string, locale: string, limit = 3): BlogRelatedPostsContent {
  const posts = buildBlogPostCards(t, locale).filter((p) => p.slug !== slug).slice(0, limit);
  return {
    title: t("blog.detail.relatedTitle"),
    posts,
  };
}
