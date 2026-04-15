<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderMedium extends Model
{
    protected $table = 'provider_media';

    protected $fillable = [
        'provider_id',
        'kind',
        'url',
        'alt',
        'sort_order',
    ];

    protected $casts = [
        'alt' => 'array',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }
}
