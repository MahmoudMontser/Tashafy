<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderPackage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderPackageService
{
    public function list(Provider $provider, int $perPage = 50): LengthAwarePaginator
    {
        return $provider->packages()->with('items')->paginate($perPage);
    }

    public function create(Provider $provider, array $data): ProviderPackage
    {
        $data['provider_id'] = $provider->id;
        return ProviderPackage::query()->create($data);
    }

    public function update(Provider $provider, ProviderPackage $package, array $data): ProviderPackage
    {
        $this->guardPackage($provider, $package);
        $package->update($data);
        return $package->load('items');
    }

    public function delete(Provider $provider, ProviderPackage $package): void
    {
        $this->guardPackage($provider, $package);
        $package->delete();
    }

    private function guardPackage(Provider $provider, ProviderPackage $package): void
    {
        if ($package->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
