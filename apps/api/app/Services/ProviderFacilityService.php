<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderFacility;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderFacilityService
{
    public function list(Provider $provider, int $perPage = 100): LengthAwarePaginator
    {
        return $provider->facilities()->paginate($perPage);
    }

    public function create(Provider $provider, array $data): ProviderFacility
    {
        $data['provider_id'] = $provider->id;
        return ProviderFacility::query()->create($data);
    }

    public function update(Provider $provider, ProviderFacility $facility, array $data): ProviderFacility
    {
        $this->guardFacility($provider, $facility);
        $facility->update($data);
        return $facility;
    }

    public function delete(Provider $provider, ProviderFacility $facility): void
    {
        $this->guardFacility($provider, $facility);
        $facility->delete();
    }

    private function guardFacility(Provider $provider, ProviderFacility $facility): void
    {
        if ($facility->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
