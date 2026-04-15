<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderTestimonial extends Model
{
    protected $fillable = [
        'provider_id',
        'name',
        'role',
        'quote',
        'avatar_url',
        'rating',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'name' => 'array',
        'role' => 'array',
        'quote' => 'array',
        'is_featured' => 'boolean',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
