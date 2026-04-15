<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderTestimonial;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProviderTestimonialService
{
    public function list(Provider $provider, int $perPage = 100): LengthAwarePaginator
    {
        return $provider->testimonials()->paginate($perPage);
    }

    public function create(Provider $provider, array $data): ProviderTestimonial
    {
        $data['provider_id'] = $provider->id;
        return ProviderTestimonial::query()->create($data);
    }

    public function update(Provider $provider, ProviderTestimonial $testimonial, array $data): ProviderTestimonial
    {
        $this->guardTestimonial($provider, $testimonial);
        $testimonial->update($data);
        return $testimonial;
    }

    public function delete(Provider $provider, ProviderTestimonial $testimonial): void
    {
        $this->guardTestimonial($provider, $testimonial);
        $testimonial->delete();
    }

    private function guardTestimonial(Provider $provider, ProviderTestimonial $testimonial): void
    {
        if ($testimonial->provider_id !== $provider->id) {
            abort(404);
        }
    }
}
