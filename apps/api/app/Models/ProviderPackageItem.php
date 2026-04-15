<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderPackageItem extends Model
{
    protected $fillable = [
        'provider_package_id',
        'label',
        'sort_order',
    ];

    protected $casts = [
        'label' => 'array',
    ];

    public function providerPackage(): BelongsTo
    {
        return $this->belongsTo(ProviderPackage::class);
    }
}
