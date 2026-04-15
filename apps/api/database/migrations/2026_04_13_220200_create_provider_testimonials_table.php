<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provider_testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->json('name');
            $table->json('role')->nullable();
            $table->json('quote');
            $table->string('avatar_url')->nullable();
            $table->string('rating')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['provider_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provider_testimonials');
    }
};
