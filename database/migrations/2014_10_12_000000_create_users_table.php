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
        Schema::create('users', function (Blueprint $table) {
            $table->comment('');
            $table->bigIncrements('id');
            $table->unsignedBigInteger('hms_id')->nullable();
            $table->unsignedBigInteger('branch_id')->nullable();
            $table->string('firstname', 128);
            $table->string('lastname', 128);
            $table->string('father_husband', 128);
            $table->string('email', 64);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 100);
            $table->string('two_factor_secret', 64);
            $table->string('two_factor_recovery_codes', 64);
            $table->timestamp('two_factor_confirmed_at')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('cnic', 100);
            $table->string('address', 100);
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('shop_id');
            //$table->enum('role', ['patient', 'doctor', 'receptionist', 'pharmacist'])->nullable()->default('patient');
            $table->string('profile_image')->nullable();
            $table->enum('gender', ['female', 'male', 'other', 'not_specified'])->nullable()->default('not_specified');
            $table->date('dob')->default('1970-01-01');
            $table->enum('status', ['active', 'suspend', 'trash', 'in_active'])->default('active');
            $table->boolean('is_super')->unsigned()->nullable()->default(false);
            $table->boolean('is_employee')->unsigned()->nullable()->default(false);
            $table->boolean('is_dependent')->unsigned()->nullable()->default(false);
            $table->string('er_firstname', 128)->nullable();
            $table->string('er_lastname', 128)->nullable();
            $table->string('er_email', 64)->nullable();
            $table->string('er_phone', 20)->nullable();
            $table->string('er_cnic', 100)->nullable();
            $table->string('er_address', 100)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
