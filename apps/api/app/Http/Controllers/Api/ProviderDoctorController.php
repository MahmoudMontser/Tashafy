<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\ProviderDoctor;
use App\Services\ProviderDoctorService;
use Illuminate\Http\Request;

class ProviderDoctorController extends Controller
{
    public function __construct(private readonly ProviderDoctorService $service)
    {
    }

    public function index(Provider $provider, Request $request)
    {
        return $this->service->list($provider, (int)($request->get('per_page', 100)));
    }

    public function store(Provider $provider, Request $request)
    {
        $data = $this->validateDoctor($request);
        return response()->json($this->service->create($provider, $data), 201);
    }

    public function update(Provider $provider, ProviderDoctor $doctor, Request $request)
    {
        return response()->json($this->service->update($provider, $doctor, $this->validateDoctor($request)));
    }

    public function destroy(Provider $provider, ProviderDoctor $doctor)
    {
        $this->service->delete($provider, $doctor);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateDoctor(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'array'],
            'name.ar' => ['required', 'string'],
            'name.en' => ['required', 'string'],
            'specialization' => ['nullable', 'array'],
            'specialization.ar' => ['nullable', 'string'],
            'specialization.en' => ['nullable', 'string'],
            'bio' => ['nullable', 'array'],
            'bio.ar' => ['nullable', 'string'],
            'bio.en' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'experience_years' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
