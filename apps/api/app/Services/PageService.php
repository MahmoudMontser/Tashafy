<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PageService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = Page::query();
        if (!empty($filters['status'])) {
            $q->where('status', $filters['status']);
        }
        if (!empty($filters['search'])) {
            $q->where('key', 'like', '%' . $filters['search'] . '%');
        }
        return $q->orderBy('key')->paginate((int)($filters['per_page'] ?? 20));
    }

    public function create(array $data): Page
    {
        return Page::query()->create($data);
    }

    public function show(Page $page): Page
    {
        return $page->load('sections');
    }

    public function update(Page $page, array $data): Page
    {
        $page->update($data);
        return $page;
    }

    public function delete(Page $page): void
    {
        $page->delete();
    }
}
