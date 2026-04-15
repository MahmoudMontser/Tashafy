<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicBlogDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'success' => true,
            'data' => [
                'post' => $this->resource['post'] ?? null,
                'related' => $this->resource['related'] ?? [],
            ],
        ];
    }
}
