<?php

namespace App\Services;

use App\Models\Provider;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = Provider::query();
        if (!empty($filters['type'])) $q->where('type', $filters['type']);
        if (!empty($filters['status'])) $q->where('status', $filters['status']);
        if (array_key_exists('featured', $filters) && $filters['featured'] !== null && $filters['featured'] !== '') {
            $q->where('is_featured', (bool)$filters['featured']);
        }
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $q->where(function ($qq) use ($search) {
                $qq->where('slug', 'like', "%{$search}%")
                    ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(name, '$.ar')) LIKE ?", ["%{$search}%"])
                    ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(name, '$.en')) LIKE ?", ["%{$search}%"]);
            });
        }
        return $q->orderByDesc('id')->paginate((int)($filters['per_page'] ?? 20));
    }

    public function create(array $data): Provider
    {
        return Provider::query()->create($data);
    }

    public function update(Provider $provider, array $data): Provider
    {
        $provider->update($data);
        return $provider;
    }

    public function delete(Provider $provider): void
    {
        $provider->delete();
    }
}
