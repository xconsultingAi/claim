<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Truncate the table
        DB::table('roles')->truncate();

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        $roleNames = ['Patient', 'Doctor', 'Admin', 'Super Admin', 'Receptionist', 'Pharmacist'];

        foreach($roleNames as $name){
            Role::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'guard_name' => 'web',
                'hms_id' => 1,
                'branch_id' => 1,
                'status' => ACTIVE
            ]);
        }
    }
    
}
