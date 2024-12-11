<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('doctor_types')->insert([
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Employee',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Private',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            ]);
    }
}
