<?php

namespace App\Services;

use App\Models\PageSection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PageSectionService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = PageSection::query()->with('page');
        if (!empty($filters['page_id'])) {
            $q->where('page_id', $filters['page_id']);
        }
        return $q->orderBy('sort_order')->paginate((int)($filters['per_page'] ?? 50));
    }

    public function create(array $data): PageSection
    {
        return PageSection::query()->create($data);
    }

    public function show(PageSection $section): PageSection
    {
        return $section->load('page');
    }

    public function update(PageSection $section, array $data): PageSection
    {
        $section->update($data);
        return $section;
    }

    public function delete(PageSection $section): void
    {
        $section->delete();
    }
}
