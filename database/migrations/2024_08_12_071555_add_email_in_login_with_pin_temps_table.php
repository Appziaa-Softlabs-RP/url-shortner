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
        Schema::table('login_with_pin_temps', function (Blueprint $table) {
            $table->string('email')->nullable();
            // making phone also nullable
            $table->string('phone')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('login_with_pin_temps', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }
};
