<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'body_ar',
        'body_en',
        'category',
        'cover_image',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'title' => 'array',
        'excerpt' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];
}
