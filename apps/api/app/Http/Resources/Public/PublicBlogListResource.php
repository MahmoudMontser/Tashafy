<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicBlogListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'success' => true,
            'data' => $this->resource['data'] ?? [],
            'meta' => [
                'total' => $this->resource['total'] ?? 0,
                'current_page' => $this->resource['current_page'] ?? 1,
                'last_page' => $this->resource['last_page'] ?? 1,
            ],
        ];
    }
}
