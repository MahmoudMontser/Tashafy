<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicReservationAttemptStoreResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'success' => true,
            'data' => [
                'attempt' => new ReservationAttemptResource($this->resource['attempt']),
                'whatsapp_url' => $this->resource['whatsapp_url'] ?? null,
            ],
        ];
    }
}
