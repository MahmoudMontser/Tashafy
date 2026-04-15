<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderMedium;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderMediaService
{
    public function list(Provider $provider, array $filters): LengthAwarePaginator
    {
        $q = $provider->media();
        if (!empty($filters['kind'])) {
            $q->where('kind', $filters['kind']);
        }
        return $q->paginate((int)($filters['per_page'] ?? 100));
    }

    public function create(Provider $provider, array $data): ProviderMedium
    {
        $data['provider_id'] = $provider->id;
        return ProviderMedium::query()->create($data);
    }

    public function update(Provider $provider, ProviderMedium $medium, array $data): ProviderMedium
    {
        $this->guardMedium($provider, $medium);
        $medium->update($data);
        return $medium;
    }

    public function delete(Provider $provider, ProviderMedium $medium): void
    {
        $this->guardMedium($provider, $medium);
        $medium->delete();
    }

    private function guardMedium(Provider $provider, ProviderMedium $medium): void
    {
        if ($medium->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
