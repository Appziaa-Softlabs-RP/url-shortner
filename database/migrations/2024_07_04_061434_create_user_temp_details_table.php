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
        Schema::create('user_temp_details', function (Blueprint $table) {
            $table->id();
            $table->string('otp_id');
            $table->string('company_name');
            $table->string('business_age');
            $table->string('email');
            $table->string('phone');
            $table->string('pin_code');
            // more details as needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_temp_details');
    }
};
