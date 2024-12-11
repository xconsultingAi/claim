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
        Schema::create('hms', function (Blueprint $table) {
            $table->comment('');
            $table->bigIncrements('id');
            $table->unsignedBigInteger('owner_id');
            $table->string('name', 128);
            $table->string('domain', 128)->nullable();
            $table->string('city', 128)->nullable();
            $table->string('country', 128)->nullable();
            $table->string('email', 64)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('address', 100)->nullable();
            $table->string('logo')->default('default.png');
            $table->enum('status', ['active', 'suspend', 'in_active'])->default('active');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hms');
    }
};
