<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('forms')->insert([
            [
                'name' => 'Admission Form',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Insurance Form',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Requesting Form',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
