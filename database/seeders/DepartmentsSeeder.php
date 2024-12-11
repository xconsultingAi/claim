<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('departments')->insert([
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Normal',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Dental',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Gaynee',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
