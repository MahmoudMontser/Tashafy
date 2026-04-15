<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderDoctor;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderDoctorService
{
    public function list(Provider $provider, int $perPage = 100): LengthAwarePaginator
    {
        return $provider->doctors()->paginate($perPage);
    }

    public function create(Provider $provider, array $data): ProviderDoctor
    {
        $data['provider_id'] = $provider->id;
        return ProviderDoctor::query()->create($data);
    }

    public function update(Provider $provider, ProviderDoctor $doctor, array $data): ProviderDoctor
    {
        $this->guardDoctor($provider, $doctor);
        $doctor->update($data);
        return $doctor;
    }

    public function delete(Provider $provider, ProviderDoctor $doctor): void
    {
        $this->guardDoctor($provider, $doctor);
        $doctor->delete();
    }

    private function guardDoctor(Provider $provider, ProviderDoctor $doctor): void
    {
        if ($doctor->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
