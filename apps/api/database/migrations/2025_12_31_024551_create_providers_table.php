<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();

            // rehab_center | wellness_center | medical_hospital
            $table->string('type');
            $table->string('slug')->unique();

            // bilingual JSON fields: {ar,en}
            $table->json('name');
            $table->json('short_description')->nullable();
            $table->json('description')->nullable();
            $table->json('address')->nullable();

            $table->unsignedBigInteger('country_id')->nullable();
            $table->unsignedBigInteger('city_id')->nullable();

            // wellness/rehab may have price; hospitals can keep it null
            $table->decimal('price_from', 10, 2)->nullable();
            $table->string('currency', 10)->nullable();

            $table->decimal('rating_avg', 3, 2)->default(0);
            $table->unsignedInteger('rating_count')->default(0);

            $table->boolean('is_featured')->default(false);
            $table->string('status')->default('published'); // draft/published

            $table->timestamps();
            $table->index(['type', 'status', 'is_featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
