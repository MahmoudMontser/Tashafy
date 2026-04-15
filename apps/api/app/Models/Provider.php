<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provider extends Model
{
    protected $fillable = [
        'type',
        'slug',
        'name',
        'short_description',
        'description',
        'address',
        'country_id',
        'city_id',
        'price_from',
        'currency',
        'rating_avg',
        'rating_count',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'name' => 'array',
        'short_description' => 'array',
        'description' => 'array',
        'address' => 'array',
        'is_featured' => 'boolean',
        'price_from' => 'decimal:2',
        'rating_avg' => 'decimal:2',
    ];

    public function packages(): HasMany
    {
        return $this->hasMany(ProviderPackage::class)->orderBy('sort_order');
    }

    public function reservationOptions(): HasMany
    {
        return $this->hasMany(ReservationOption::class)->orderBy('sort_order');
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProviderMedium::class)->orderBy('sort_order');
    }

    public function facilities(): HasMany
    {
        return $this->hasMany(ProviderFacility::class)->orderBy('sort_order');
    }

    public function doctors(): HasMany
    {
        return $this->hasMany(ProviderDoctor::class)->orderBy('sort_order');
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(ProviderTestimonial::class)->orderBy('sort_order');
    }

    public function reservationAttempts(): HasMany
    {
        return $this->hasMany(ReservationAttempt::class)->latest('id');
    }
}
