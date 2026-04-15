<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicSettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'success' => true,
            'data' => [
                'key' => $this->resource['key'] ?? null,
                'value' => $this->resource['value'] ?? null,
            ],
        ];
    }
}
