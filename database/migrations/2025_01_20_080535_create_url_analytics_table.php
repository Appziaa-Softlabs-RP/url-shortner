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
        Schema::create('url_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('url_id')->constrained()->onDelete('cascade');
            $table->string('ip_address');
            $table->string('country_code')->nullable();
            $table->string('city')->nullable();
            $table->string('device')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_analytics');
    }
};
