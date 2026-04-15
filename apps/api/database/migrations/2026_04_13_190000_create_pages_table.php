<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // home, about, contact...
            $table->string('slug')->unique(); // /, /about-us ...
            $table->json('title')->nullable(); // {ar,en}
            $table->string('status')->default('draft'); // draft/published
            $table->timestamps();
            $table->index(['key', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
