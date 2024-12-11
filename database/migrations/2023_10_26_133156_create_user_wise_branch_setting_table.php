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
        Schema::create('user_wise_branch_setting', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('hms_id');
            $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('status', ['active', 'in_active'])->default('active');
            $table->timestamps();
        });
    }

    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_wise_branch_setting');
    }
};
