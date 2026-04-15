<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservation_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->nullable()->constrained('providers')->nullOnDelete();
            $table->foreignId('provider_package_id')->nullable()->constrained('provider_packages')->nullOnDelete();
            $table->string('source')->default('website');
            $table->string('locale', 10)->nullable();
            $table->string('reservation_type', 30)->default('package');
            $table->string('item_name')->nullable();
            $table->string('provider_name')->nullable();
            $table->string('status', 30)->default('new');
            $table->string('customer_name')->nullable();
            $table->string('customer_phone', 40)->nullable();
            $table->text('message')->nullable();
            $table->string('whatsapp_number', 30)->nullable();
            $table->text('whatsapp_url')->nullable();
            $table->text('admin_notes')->nullable();
            $table->json('metadata')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('referrer')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index(['source', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservation_attempts');
    }
};
