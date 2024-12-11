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
        Schema::create('user_login_sessions', function (Blueprint $table) {
            $table->comment('');
            $table->bigIncrements('id');
            $table->unsignedBigInteger('hms_id');
            $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('user_id');
            $table->string('user_role', 50)->nullable();
            $table->string('brand', 50)->nullable();
            $table->string('model', 50)->nullable();
            $table->string('os_version', 50)->nullable();
            $table->string('os', 50)->nullable();
            $table->string('device', 50)->nullable();
            $table->string('device_token', 512)->nullable();
            $table->string('fcm_token', 512)->nullable();
            $table->enum('status', ['login', 'logout'])->nullable()->default('login');
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
        Schema::dropIfExists('user_login_session');
    }
};
