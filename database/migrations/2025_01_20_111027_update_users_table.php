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
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('about_company');
            $table->string('industry')->nullable()->after('name');
            $table->json('intended_use')->nullable()->after('industry');
            $table->boolean('is_onboarding_done')->default(false)->after('intended_use');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('industry');
            $table->dropColumn('intended_use');
            $table->dropColumn('is_onboarding_done');
            $table->string('about_company')->after('name');
        });
    }
};
