<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Services\ProviderService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProviderController extends Controller
{
    public function __construct(private readonly ProviderService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['type', 'status', 'featured', 'search', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $this->validateProvider($request);
        return response()->json($this->service->create($data), 201);
    }

    public function show(Provider $provider)
    {
        return response()->json($provider);
    }

    public function update(Request $request, Provider $provider)
    {
        $data = $this->validateProvider($request, $provider->id);
        return response()->json($this->service->update($provider, $data));
    }

    public function destroy(Provider $provider)
    {
        $this->service->delete($provider);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateProvider(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'type' => ['required', Rule::in(['rehab_center','wellness_center','medical_hospital'])],
            'slug' => ['required','string', Rule::unique('providers','slug')->ignore($id)],

            'name' => ['required','array'],
            'name.ar' => ['required','string'],
            'name.en' => ['required','string'],

            'short_description' => ['nullable','array'],
            'short_description.ar' => ['nullable','string'],
            'short_description.en' => ['nullable','string'],

            'description' => ['nullable','array'],
            'description.ar' => ['nullable','string'],
            'description.en' => ['nullable','string'],

            'address' => ['nullable','array'],
            'address.ar' => ['nullable','string'],
            'address.en' => ['nullable','string'],

            'country_id' => ['nullable','integer'],
            'city_id' => ['nullable','integer'],

            'price_from' => ['nullable','numeric'],
            'currency' => ['nullable','string','max:10'],

            'is_featured' => ['nullable','boolean'],
            'status' => ['required', Rule::in(['draft','published'])],
        ]);
    }
}
