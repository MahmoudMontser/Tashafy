<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationOption extends Model
{
    protected $fillable = [
        'provider_id',
        'title',
        'type',
        'base_price',
        'currency',
        'cta_type',
        'cta_target',
        'is_enabled',
        'sort_order',
    ];

    protected $casts = [
        'title' => 'array',
        'is_enabled' => 'boolean',
        'base_price' => 'decimal:2',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
