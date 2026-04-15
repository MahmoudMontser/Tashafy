<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provider_package_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_package_id')->constrained('provider_packages')->cascadeOnDelete();
            $table->json('label');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['provider_package_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provider_package_items');
    }
};
