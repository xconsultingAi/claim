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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('hms_id');
            $table->string('article_number')->unique();
            $table->string('name');
            $table->string('invoice');
            $table->date('purchase_date');
            $table->decimal('article_price', 10, 2);
            $table->string('period')->default(0);
            $table->string('customer_name')->nullable();
            $table->string('customer_address')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('ptcl_number')->nullable();
            $table->string('cell')->nullable();
            $table->string('shop_id')->default(0);
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
        Schema::dropIfExists('claims');
    }
};
