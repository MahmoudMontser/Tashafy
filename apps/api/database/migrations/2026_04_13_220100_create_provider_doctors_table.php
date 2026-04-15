<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provider_doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->json('name');
            $table->json('specialization')->nullable();
            $table->json('bio')->nullable();
            $table->string('image_url')->nullable();
            $table->string('experience_years')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['provider_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provider_doctors');
    }
};
