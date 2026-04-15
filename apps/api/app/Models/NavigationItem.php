<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationItem extends Model
{
    protected $fillable = [
        'group',
        'label',
        'path',
        'sort_order',
        'is_enabled',
    ];

    protected $casts = [
        'label' => 'array',
        'is_enabled' => 'boolean',
    ];
}
