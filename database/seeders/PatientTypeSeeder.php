<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PatientTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('patients_type')->insert([
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'CB Employee',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'can_have_dependent' => 1,
                'verification_required' => 1,
                'employee_detail' => 1,
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Private',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'can_have_dependent' => 0,
                'verification_required' => 0,
                'employee_detail' => 0,
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Dependent',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'can_have_dependent' => 0,
                'verification_required' => 1,
                'employee_detail' => 0,
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Cantt Resident',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'can_have_dependent' => 0,
                'verification_required' => 0,
                'employee_detail' => 0,
            ],
            [
                'hms_id' => 1,
                'branch_id' => 1,
                'name' => 'Walton',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'can_have_dependent' => 0,
                'verification_required' => 0,
                'employee_detail' => 0,
            ],
        ]);
    }
}
