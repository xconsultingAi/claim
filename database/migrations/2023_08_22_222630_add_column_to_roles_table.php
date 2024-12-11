<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(config('permission.table_names.roles'), function (Blueprint $table) {
            $table->string('slug')->nullable();
            $table->unsignedBigInteger('hms_id')->nullable();
            $table->unsignedBigInteger('branch_id')->nullable();
            $table->enum('status', [ACTIVE, INACTIVE])->default(ACTIVE);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(config('permission.table_names.roles'), function (Blueprint $table) {
            $table->dropColumn('slug');
            $table->dropColumn('hms_id');
            $table->dropColumn('branch_id');
            $table->dropColumn('status');
        });
    }
};
