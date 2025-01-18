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
        Schema::table('urls', function (Blueprint $table) {
            $table->dropColumn('meta_description');
            $table->dropColumn('meta_title');
            $table->dropColumn('og_image');
            $table->dropColumn('og_title');
            $table->dropColumn('og_description');
            $table->dropColumn('is_active');

            $table->string('title')->nullable()->after('short_code');
            $table->binary('ip')->nullable()->after('title');
            $table->string('country_code', 2)->nullable()->after('ip');
            $table->string('city', 100)->nullable()->after('country_code');
            $table->point('location')->nullable()->after('city');
            $table->string('device')->nullable()->after('location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('urls', function (Blueprint $table) {
            $table->text('meta_description')->nullable();
            $table->text('meta_title')->nullable();
            $table->text('og_image')->nullable();
            $table->text('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->boolean('is_active')->default(true);

            $table->dropColumn('title');
            $table->dropColumn('ip');
            $table->dropColumn('country_code');
            $table->dropColumn('city');
            $table->dropColumn('location');
            $table->dropColumn('device');
        });
    }
};
