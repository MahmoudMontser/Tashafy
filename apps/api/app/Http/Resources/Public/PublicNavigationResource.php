<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicNavigationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'success' => true,
            'data' => [
                'group' => $this->resource['group'] ?? null,
                'items' => $this->resource['items'] ?? [],
            ],
        ];
    }
}
