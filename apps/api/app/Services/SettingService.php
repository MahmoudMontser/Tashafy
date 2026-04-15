<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SettingService
{
    public function list(array $filters): LengthAwarePaginator
    {
        $q = Setting::query();
        if (array_key_exists('key', $filters) && $filters['key'] !== null && $filters['key'] !== '') {
            $q->where('key', $filters['key']);
        }
        return $q->orderBy('key')->paginate((int)($filters['per_page'] ?? 50));
    }

    public function upsert(string $key, ?array $value): Setting
    {
        return Setting::query()->updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    public function getByKey(string $key): ?Setting
    {
        return Setting::query()->where('key', $key)->first();
    }

    public function getByKeyOrFail(string $key): Setting
    {
        return Setting::query()->where('key', $key)->firstOrFail();
    }
}
