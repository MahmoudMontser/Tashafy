<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ProviderPackage;
use App\Services\ProviderPackageService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProviderPackageController extends Controller
{
    public function __construct(private readonly ProviderPackageService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, (int)($request->get('per_page', 50)));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validatePackage($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ProviderPackage $package, Request $request)
    {
        $data = $this->validatePackage($request);
        return response()->json($this->service->update($provider, $package, $data));
    }

    public function destroy(Provider $provider, ProviderPackage $package)
    {
        $this->service->delete($provider, $package);
        return response()->json(['message' => 'Deleted']);
    }

    private function validatePackage(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'array'],
            'name.ar' => ['required', 'string'],
            'name.en' => ['required', 'string'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'currency' => ['required', 'string', 'max:10'],
            'duration_label' => ['nullable', 'array'],
            'duration_label.ar' => ['nullable', 'string'],
            'duration_label.en' => ['nullable', 'string'],
            'sessions_count' => ['nullable', 'integer', 'min:1'],
            'is_highlighted' => ['nullable', 'boolean'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
