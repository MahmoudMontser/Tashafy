<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ReservationOption;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ReservationOptionService
{
    public function list(Provider $provider, int $perPage = 100): LengthAwarePaginator
    {
        return $provider->reservationOptions()->paginate($perPage);
    }

    public function create(Provider $provider, array $data): ReservationOption
    {
        $data['provider_id'] = $provider->id;
        return ReservationOption::query()->create($data);
    }

    public function update(Provider $provider, ReservationOption $option, array $data): ReservationOption
    {
        $this->guardOption($provider, $option);
        $option->update($data);
        return $option;
    }

    public function delete(Provider $provider, ReservationOption $option): void
    {
        $this->guardOption($provider, $option);
        $option->delete();
    }

    private function guardOption(Provider $provider, ReservationOption $option): void
    {
        if ($option->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
