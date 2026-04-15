<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ProviderFacility;
use App\Services\ProviderFacilityService;
use Illuminate\Http\Request;

class ProviderFacilityController extends Controller
{
    public function __construct(private readonly ProviderFacilityService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, (int)($request->get('per_page', 100)));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validateFacility($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ProviderFacility $facility, Request $request)
    {
        return response()->json($this->service->update($provider, $facility, $this->validateFacility($request)));
    }

    public function destroy(Provider $provider, ProviderFacility $facility)
    {
        $this->service->delete($provider, $facility);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateFacility(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string'],
            'title.en' => ['required', 'string'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
