<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('form_templates')->insert([
            [
                'name' => 'Hermitage Clinic Booking Form',
                'forms_id' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blackrock Clinic Booking Form',
                'forms_id' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beacon Hospital Patient Booking & Assessment Form',
                'forms_id' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Cardiology Outpatient Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Medical Clinic Radiology Department Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Medical Clinic Laboratory Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Medical Clinic EEG Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Medical Clinic NCS Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hermitage Vascular Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blackrock Radiology Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blackrock Clinic Vascular Laboratory Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beacon Hospital Cardiology Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beacon Hospital Radiology Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beacon Hospital Vascular Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beacon Hospital Respiratory Request Form',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Medical Report Form B Personal Injuries',
                'forms_id' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
