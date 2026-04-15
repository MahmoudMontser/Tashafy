<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provider_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->json('name');
            $table->json('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('currency', 10)->default('SAR');
            $table->json('duration_label')->nullable();
            $table->unsignedInteger('sessions_count')->nullable();
            $table->boolean('is_highlighted')->default(false);
            $table->string('status')->default('draft'); // draft/published
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['provider_id', 'status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provider_packages');
    }
};
