<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ReservationOption;
use App\Services\ReservationOptionService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReservationOptionController extends Controller
{
    public function __construct(private readonly ReservationOptionService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, (int)($request->get('per_page', 100)));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validateOption($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ReservationOption $option, Request $request)
    {
        return response()->json($this->service->update($provider, $option, $this->validateOption($request)));
    }

    public function destroy(Provider $provider, ReservationOption $option)
    {
        $this->service->delete($provider, $option);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateOption(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string'],
            'title.en' => ['required', 'string'],
            'type' => ['required', Rule::in(['consultation', 'package', 'direct_booking'])],
            'base_price' => ['nullable', 'numeric'],
            'currency' => ['required', 'string', 'max:10'],
            'cta_type' => ['required', Rule::in(['internal', 'external', 'whatsapp'])],
            'cta_target' => ['nullable', 'string'],
            'is_enabled' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
