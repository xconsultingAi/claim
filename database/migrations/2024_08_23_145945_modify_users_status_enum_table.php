<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        DB::statement("ALTER TABLE `users` MODIFY COLUMN `status` ENUM('active', 'suspend', 'trash', 'in_active','rip','non_paying')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {}
};
