<?php

namespace App\Http\Resources\Public;

use App\Models\ReservationAttempt;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationAttemptResource extends JsonResource
{
    /**
     * @param  ReservationAttempt  $resource
     */
    public function toArray(Request $request): array
    {
        $providerName = null;
        if ($this->resource->provider && is_array($this->resource->provider->name ?? null)) {
            $providerName = $this->resource->provider->name;
        }

        $packageName = null;
        if ($this->resource->package && is_array($this->resource->package->name ?? null)) {
            $packageName = $this->resource->package->name;
        }

        return [
            'id' => $this->resource->id,
            'provider_id' => $this->resource->provider_id,
            'provider_package_id' => $this->resource->provider_package_id,
            'source' => $this->resource->source,
            'locale' => $this->resource->locale,
            'reservation_type' => $this->resource->reservation_type,
            'item_name' => $this->resource->item_name,
            'provider_name' => $this->resource->provider_name,
            'status' => $this->resource->status,
            'customer_name' => $this->resource->customer_name,
            'customer_phone' => $this->resource->customer_phone,
            'message' => $this->resource->message,
            'whatsapp_number' => $this->resource->whatsapp_number,
            'whatsapp_url' => $this->resource->whatsapp_url,
            'metadata' => $this->resource->metadata,
            'provider' => $this->whenLoaded('provider', fn () => [
                'id' => $this->resource->provider?->id,
                'slug' => $this->resource->provider?->slug,
                'name' => $providerName,
            ]),
            'package' => $this->whenLoaded('package', fn () => [
                'id' => $this->resource->package?->id,
                'provider_id' => $this->resource->package?->provider_id,
                'name' => $packageName,
                'price' => $this->resource->package?->price,
                'currency' => $this->resource->package?->currency,
            ]),
            'created_at' => optional($this->resource->created_at)?->toIso8601String(),
        ];
    }
}
