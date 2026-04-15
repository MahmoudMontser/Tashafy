<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservation_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->json('title');
            $table->string('type')->default('consultation'); // consultation/package/direct_booking
            $table->decimal('base_price', 10, 2)->nullable();
            $table->string('currency', 10)->default('SAR');
            $table->string('cta_type')->default('internal'); // internal/external/whatsapp
            $table->string('cta_target')->nullable();
            $table->boolean('is_enabled')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['provider_id', 'is_enabled', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservation_options');
    }
};
