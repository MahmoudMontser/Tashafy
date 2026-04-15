<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ProviderMedium;
use App\Services\ProviderMediaService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProviderMediaController extends Controller
{
    public function __construct(private readonly ProviderMediaService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, $request->only(['kind', 'per_page']));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validateMedia($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ProviderMedium $medium, Request $request)
    {
        return response()->json($this->service->update($provider, $medium, $this->validateMedia($request)));
    }

    public function destroy(Provider $provider, ProviderMedium $medium)
    {
        $this->service->delete($provider, $medium);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateMedia(Request $request): array
    {
        return $request->validate([
            'kind' => ['required', Rule::in(['gallery', 'cover', 'logo'])],
            'url' => ['required', 'string'],
            'alt' => ['nullable', 'array'],
            'alt.ar' => ['nullable', 'string'],
            'alt.en' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
