<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Existing drug names
         $existingDrugNames = Medicine::pluck('drug_name')->toArray();

         // New data to be added
         $newData = [
            ['drug_name' => 'Prednisone', 'strength' => '5 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Metformin', 'strength' => '500 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Nexium', 'strength' => '20 mg', 'dosage_unit' => 'ml', 'type' => 'capsule'],
            ['drug_name' => 'Atorvastatin', 'strength' => '10 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Crestor', 'strength' => '10 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Synthroid', 'strength' => '100 mcg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Levothyroxine', 'strength' => '50 mcg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Ibuprofen', 'strength' => '200 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Paracetamol', 'strength' => '500 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Amoxicillin', 'strength' => '500 mg', 'dosage_unit' => 'ml', 'type' => 'capsule'],
            ['drug_name' => 'Lipitor', 'strength' => '10 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Zantac', 'strength' => '150 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Aspirin', 'strength' => '81 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
            ['drug_name' => 'Albuterol', 'strength' => '2 mg', 'dosage_unit' => 'mg', 'type' => 'tablet'],
         ];
 
         // Insert new data into the database
         foreach ($newData as $data) {
             if (!in_array($data['drug_name'], $existingDrugNames)) {
                 Medicine::create([
                     'drug_name' => $data['drug_name'],
                     'strength' => $data['strength'],
                     'dosage_unit' => $data['dosage_unit'],
                     'type' => $data['type'],
                 ]);
             }
         }
     
    }

}
