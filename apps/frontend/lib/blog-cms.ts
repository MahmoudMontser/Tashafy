const API_BASE = process.env.API_BASE_URL_INTERNAL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

type BlogListItem = {
  slug: string
  title: string | null
  excerpt: string | null
  category: string | null
  cover_image: string | null
}

type BlogListResponse = { data: BlogListItem[] }
type BlogDetailResponse = {
  post: (BlogListItem & { body: string | null }) | null
  related: BlogListItem[]
}

export async function fetchCmsBlogList(lang: string): Promise<BlogListItem[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/blog?lang=${encodeURIComponent(lang)}&per_page=12`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as BlogListResponse
    return json.data || []
  } catch {
    return null
  }
}

export async function fetchCmsBlogDetail(slug: string, lang: string): Promise<BlogDetailResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/blog/${encodeURIComponent(slug)}?lang=${encodeURIComponent(lang)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as BlogDetailResponse
  } catch {
    return null
  }
}
