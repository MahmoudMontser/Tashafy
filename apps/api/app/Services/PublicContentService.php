<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\Provider;

class PublicContentService
{
    public function getPublishedPage(string $key, string $lang): array
    {
        $page = Page::query()
            ->where('key', $key)
            ->where('status', 'published')
            ->with(['sections' => fn ($q) => $q->where('is_enabled', true)->orderBy('sort_order')])
            ->firstOrFail();

        return [
            'page' => [
                'key' => $page->key,
                'slug' => $page->slug,
                'title' => $page->title[$lang] ?? null,
                'sections' => $page->sections->map(fn ($s) => [
                    'key' => $s->key,
                    'sort_order' => $s->sort_order,
                    'content' => $s->content,
                ])->values(),
            ],
        ];
    }

    public function getNavigation(string $group, string $lang): array
    {
        $items = NavigationItem::query()
            ->where('group', $group)
            ->where('is_enabled', true)
            ->orderBy('sort_order')
            ->get();

        return [
            'group' => $group,
            'items' => $items->map(fn ($item) => [
                'id' => $item->id,
                'label' => $item->label[$lang] ?? null,
                'path' => $item->path,
                'sort_order' => $item->sort_order,
            ])->values(),
        ];
    }

    public function getBlogList(string $lang, int $perPage = 12): array
    {
        $posts = BlogPost::query()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate($perPage);

        return [
            'data' => $posts->getCollection()->map(fn ($post) => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title[$lang] ?? null,
                'excerpt' => $post->excerpt[$lang] ?? null,
                'category' => $post->category,
                'cover_image' => $post->cover_image,
                'published_at' => optional($post->published_at)->toIso8601String(),
            ])->values(),
            'total' => $posts->total(),
            'current_page' => $posts->currentPage(),
            'last_page' => $posts->lastPage(),
        ];
    }

    public function getBlogDetail(string $slug, string $lang): array
    {
        $post = BlogPost::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $related = BlogPost::query()
            ->where('status', 'published')
            ->where('slug', '!=', $slug)
            ->latest('published_at')
            ->limit(3)
            ->get();

        return [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title[$lang] ?? null,
                'excerpt' => $post->excerpt[$lang] ?? null,
                'body' => $lang === 'ar' ? $post->body_ar : $post->body_en,
                'category' => $post->category,
                'cover_image' => $post->cover_image,
                'published_at' => optional($post->published_at)->toIso8601String(),
            ],
            'related' => $related->map(fn ($item) => [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title[$lang] ?? null,
                'excerpt' => $item->excerpt[$lang] ?? null,
                'category' => $item->category,
                'cover_image' => $item->cover_image,
                'published_at' => optional($item->published_at)->toIso8601String(),
            ])->values(),
        ];
    }

    public function getProviderDetail(string $slug, string $lang): array
    {
        $provider = Provider::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->with([
                'packages' => fn ($q) => $q->where('status', 'published')->with('items')->orderBy('sort_order'),
                'reservationOptions' => fn ($q) => $q->where('is_enabled', true)->orderBy('sort_order'),
                'media' => fn ($q) => $q->orderBy('sort_order'),
                'facilities' => fn ($q) => $q->orderBy('sort_order'),
                'doctors' => fn ($q) => $q->orderBy('sort_order'),
                'testimonials' => fn ($q) => $q->orderBy('sort_order'),
            ])
            ->firstOrFail();

        return [
            'provider' => [
                'id' => $provider->id,
                'slug' => $provider->slug,
                'type' => $provider->type,
                'name' => $provider->name[$lang] ?? null,
                'short_description' => $provider->short_description[$lang] ?? null,
                'description' => $provider->description[$lang] ?? null,
                'address' => $provider->address[$lang] ?? null,
                'price_from' => $provider->price_from,
                'currency' => $provider->currency,
                'rating_avg' => $provider->rating_avg,
                'rating_count' => $provider->rating_count,
                'is_featured' => $provider->is_featured,
                'packages' => $provider->packages->map(fn ($package) => [
                    'id' => $package->id,
                    'name' => $package->name[$lang] ?? null,
                    'description' => $package->description[$lang] ?? null,
                    'price' => $package->price,
                    'currency' => $package->currency,
                    'duration_label' => $package->duration_label[$lang] ?? null,
                    'sessions_count' => $package->sessions_count,
                    'is_highlighted' => $package->is_highlighted,
                    'items' => $package->items->map(fn ($item) => [
                        'id' => $item->id,
                        'label' => $item->label[$lang] ?? null,
                        'sort_order' => $item->sort_order,
                    ])->values(),
                ])->values(),
                'reservation_options' => $provider->reservationOptions->map(fn ($option) => [
                    'id' => $option->id,
                    'title' => $option->title[$lang] ?? null,
                    'type' => $option->type,
                    'base_price' => $option->base_price,
                    'currency' => $option->currency,
                    'cta_type' => $option->cta_type,
                    'cta_target' => $option->cta_target,
                    'sort_order' => $option->sort_order,
                ])->values(),
                'media' => $provider->media->map(fn ($m) => [
                    'id' => $m->id,
                    'kind' => $m->kind,
                    'url' => $m->url,
                    'alt' => $m->alt[$lang] ?? null,
                    'sort_order' => $m->sort_order,
                ])->values(),
                'facilities' => $provider->facilities->map(fn ($f) => [
                    'id' => $f->id,
                    'title' => $f->title[$lang] ?? null,
                    'description' => $f->description[$lang] ?? null,
                    'icon' => $f->icon,
                    'sort_order' => $f->sort_order,
                ])->values(),
                'doctors' => $provider->doctors->map(fn ($d) => [
                    'id' => $d->id,
                    'name' => $d->name[$lang] ?? null,
                    'specialization' => $d->specialization[$lang] ?? null,
                    'bio' => $d->bio[$lang] ?? null,
                    'image_url' => $d->image_url,
                    'experience_years' => $d->experience_years,
                    'sort_order' => $d->sort_order,
                ])->values(),
                'testimonials' => $provider->testimonials->map(fn ($x) => [
                    'id' => $x->id,
                    'name' => $x->name[$lang] ?? null,
                    'role' => $x->role[$lang] ?? null,
                    'quote' => $x->quote[$lang] ?? null,
                    'avatar_url' => $x->avatar_url,
                    'rating' => $x->rating,
                    'is_featured' => $x->is_featured,
                    'sort_order' => $x->sort_order,
                ])->values(),
            ],
        ];
    }
}
