<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderDoctor extends Model
{
    protected $fillable = [
        'provider_id',
        'name',
        'specialization',
        'bio',
        'image_url',
        'experience_years',
        'sort_order',
    ];

    protected $casts = [
        'name' => 'array',
        'specialization' => 'array',
        'bio' => 'array',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
