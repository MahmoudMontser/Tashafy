<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderFacility extends Model
{
    protected $fillable = [
        'provider_id',
        'title',
        'description',
        'icon',
        'sort_order',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
