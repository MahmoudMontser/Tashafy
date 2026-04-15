<?php

namespace App\Services;

use App\Models\ProviderPackage;
use App\Models\ProviderPackageItem;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderPackageItemService
{
    public function list(ProviderPackage $package, int $perPage = 100): LengthAwarePaginator
    {
        return $package->items()->paginate($perPage);
    }

    public function create(ProviderPackage $package, array $data): ProviderPackageItem
    {
        $data['provider_package_id'] = $package->id;
        return ProviderPackageItem::query()->create($data);
    }

    public function update(ProviderPackage $package, ProviderPackageItem $item, array $data): ProviderPackageItem
    {
        $this->guardItem($package, $item);
        $item->update($data);
        return $item;
    }

    public function delete(ProviderPackage $package, ProviderPackageItem $item): void
    {
        $this->guardItem($package, $item);
        $item->delete();
    }

    private function guardItem(ProviderPackage $package, ProviderPackageItem $item): void
    {
        if ($item->provider_package_id !== $package->id) {
            abort(404);
        }
    }
}
