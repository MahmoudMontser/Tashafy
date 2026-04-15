<?php

namespace App\Services;

use App\Models\NavigationItem;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NavigationItemService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = NavigationItem::query();
        if (!empty($filters['group'])) {
            $q->where('group', $filters['group']);
        }
        return $q->orderBy('sort_order')->paginate((int)($filters['per_page'] ?? 100));
    }

    public function create(array $data): NavigationItem
    {
        return NavigationItem::query()->create($data);
    }

    public function update(NavigationItem $item, array $data): NavigationItem
    {
        $item->update($data);
        return $item;
    }

    public function delete(NavigationItem $item): void
    {
        $item->delete();
    }
}
