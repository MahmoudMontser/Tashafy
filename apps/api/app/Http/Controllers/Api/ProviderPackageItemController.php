<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProviderPackage;
use App\Models\ProviderPackageItem;
use App\Services\ProviderPackageItemService;
use Illuminate\Http\Request;

class ProviderPackageItemController extends Controller
{
    public function __construct(private readonly ProviderPackageItemService $service)
    {
    }

    public function index(ProviderPackage $package, Request $request)
    {
        return $this->service->list($package, (int)($request->get('per_page', 100)));
    }

    public function store(ProviderPackage $package, Request $request)
    {
        $data = $this->validateItem($request);
        return response()->json($this->service->create($package, $data), 201);
    }

    public function update(ProviderPackage $package, ProviderPackageItem $item, Request $request)
    {
        return response()->json($this->service->update($package, $item, $this->validateItem($request)));
    }

    public function destroy(ProviderPackage $package, ProviderPackageItem $item)
    {
        $this->service->delete($package, $item);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateItem(Request $request): array
    {
        return $request->validate([
            'label' => ['required', 'array'],
            'label.ar' => ['required', 'string'],
            'label.en' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
