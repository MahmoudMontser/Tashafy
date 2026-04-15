<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProviderPackage extends Model
{
    protected $fillable = [
        'provider_id',
        'name',
        'description',
        'price',
        'currency',
        'duration_label',
        'sessions_count',
        'is_highlighted',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'duration_label' => 'array',
        'is_highlighted' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(ProviderPackageItem::class)->orderBy('sort_order');
    }

    public function reservationAttempts(): HasMany
    {
        return $this->hasMany(ReservationAttempt::class, 'provider_package_id')->latest('id');
    }
}
