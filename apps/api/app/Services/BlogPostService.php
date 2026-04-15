<?php

namespace App\Services;

use App\Models\BlogPost;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BlogPostService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = BlogPost::query();
        if (!empty($filters['status'])) {
            $q->where('status', $filters['status']);
        }
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $q->where(function ($qq) use ($search) {
                $qq->where('slug', 'like', "%{$search}%")
                    ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(title, '$.ar')) LIKE ?", ["%{$search}%"])
                    ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(title, '$.en')) LIKE ?", ["%{$search}%"]);
            });
        }
        return $q->latest('published_at')->latest('id')->paginate((int)($filters['per_page'] ?? 20));
    }

    public function create(array $data): BlogPost
    {
        return BlogPost::query()->create($data);
    }

    public function update(BlogPost $blogPost, array $data): BlogPost
    {
        $blogPost->update($data);
        return $blogPost;
    }

    public function delete(BlogPost $blogPost): void
    {
        $blogPost->delete();
    }
}
