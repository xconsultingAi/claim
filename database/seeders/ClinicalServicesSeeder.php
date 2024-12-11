<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClinicalServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clinical_services')->insert([
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'OPD',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'IPD',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Emergency',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
