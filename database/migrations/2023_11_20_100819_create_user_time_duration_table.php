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
        Schema::create('user_time_duration', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_wise_branch_setting_id');
            $table->enum('day', ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])->default('MON');
            $table->time('start')->nullable();
            $table->time('end')->nullable();
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
        Schema::dropIfExists('doctor_wise_time_duration');
    }
};
