<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LettersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('letters')->insert([
            [
                'name' => 'Admission Letter',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Appointment Letter',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Custom Letter',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
