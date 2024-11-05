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
        Schema::table('card_templates', function (Blueprint $table) {
            $table->dropColumn('template');
            $table->enum('type', ['vertical', 'horizontal', 'both'])->default('both')->after('credits');
            $table->text('vertical_front_template')->nullable()->after('type');
            $table->text('vertical_back_template')->nullable()->after('vertical_front_template');
            $table->text('horizontal_front_template')->nullable()->after('vertical_back_template');
            $table->text('horizontal_back_template')->nullable()->after('horizontal_front_template');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('card_templates', function (Blueprint $table) {
            $table->text('template')->nullable();
            $table->dropColumn('vertical_front_template');
            $table->dropColumn('vertical_back_template');
            $table->dropColumn('horizontal_front_template');
            $table->dropColumn('horizontal_back_template');
            $table->dropColumn('type');
        });
    }
};
