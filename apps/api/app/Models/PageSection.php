<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageSection extends Model
{
    protected $fillable = [
        'page_id',
        'key',
        'sort_order',
        'is_enabled',
        'content',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'content' => 'array',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
