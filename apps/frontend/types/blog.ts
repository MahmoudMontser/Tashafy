export type BlogHeroContent = {
  title: string;
  subtitle: string;
};

export type BlogPostCard = {
  id: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  categoryLabel: string;
  dateLabel: string;
  readingTimeLabel: string;
  title: string;
  excerpt: string;
  readMoreLabel: string;
  href: string;
};

export type BlogResourceCenterContent = {
  title: string;
  subtitle: string;
  posts: BlogPostCard[];
};

export type BlogPageContent = {
  hero: BlogHeroContent;
  resourceCenter: BlogResourceCenterContent;
};

export type BlogArticleStat = {
  value: string;
  label: string;
};

export type BlogPostArticleBody = {
  section1Title: string;
  section1Body: string;
  quoteText: string;
  quoteSource: string;
  section2Title: string;
  section2Body: string;
  statsTitle: string;
  stats: readonly [BlogArticleStat, BlogArticleStat, BlogArticleStat];
  programsTitle: string;
  programItems: readonly string[];
  inlineImageSrc: string;
  inlineImageAlt: string;
};

export type BlogRelatedPostsContent = {
  title: string;
  posts: BlogPostCard[];
};

export type BlogPostDetailHero = {
  title: string;
  categoryLabel: string;
  readingTimeLabel: string;
  publishedLabel: string;
  imageSrc: string;
  imageAlt: string;
  prevHref: string | null;
  nextHref: string | null;
  prevNavAriaLabel: string;
  nextNavAriaLabel: string;
};
