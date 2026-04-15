<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ProviderTestimonial;
use App\Services\ProviderTestimonialService;
use Illuminate\Http\Request;

class ProviderTestimonialController extends Controller
{
    public function __construct(private readonly ProviderTestimonialService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, (int)($request->get('per_page', 100)));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validateTestimonial($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ProviderTestimonial $testimonial, Request $request)
    {
        return response()->json($this->service->update($provider, $testimonial, $this->validateTestimonial($request)));
    }

    public function destroy(Provider $provider, ProviderTestimonial $testimonial)
    {
        $this->service->delete($provider, $testimonial);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateTestimonial(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'array'],
            'name.ar' => ['required', 'string'],
            'name.en' => ['required', 'string'],
            'role' => ['nullable', 'array'],
            'role.ar' => ['nullable', 'string'],
            'role.en' => ['nullable', 'string'],
            'quote' => ['required', 'array'],
            'quote.ar' => ['required', 'string'],
            'quote.en' => ['required', 'string'],
            'avatar_url' => ['nullable', 'string'],
            'rating' => ['nullable', 'string'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
