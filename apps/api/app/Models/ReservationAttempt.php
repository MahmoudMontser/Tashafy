<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationAttempt extends Model
{
    protected $fillable = [
        'provider_id',
        'provider_package_id',
        'source',
        'locale',
        'reservation_type',
        'item_name',
        'provider_name',
        'status',
        'customer_name',
        'customer_phone',
        'message',
        'whatsapp_number',
        'whatsapp_url',
        'admin_notes',
        'metadata',
        'ip_address',
        'user_agent',
        'referrer',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(ProviderPackage::class, 'provider_package_id');
    }
}
