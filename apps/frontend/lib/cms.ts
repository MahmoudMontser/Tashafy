type CmsSection = {
  key: string
  sort_order: number
  content: Record<string, unknown> | null
}

type CmsPageResponse = {
  page?: {
    key: string
    slug: string
    title: string | null
    sections: CmsSection[]
  }
}

type PublicSettingResponse = {
  key: string
  value: Record<string, unknown> | null
}

const API_BASE = process.env.API_BASE_URL_INTERNAL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function fetchPublicPage(key: string, lang: string): Promise<CmsPageResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/content/page/${encodeURIComponent(key)}?lang=${encodeURIComponent(lang)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as CmsPageResponse
  } catch {
    return null
  }
}

export async function fetchPublicSetting(key: string): Promise<PublicSettingResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/content/setting/${encodeURIComponent(key)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as PublicSettingResponse
  } catch {
    return null
  }
}

export function getCmsSection<T extends Record<string, unknown>>(page: CmsPageResponse | null, key: string): T | null {
  const section = page?.page?.sections?.find((s) => s.key === key)
  if (!section?.content) return null
  return section.content as T
}
