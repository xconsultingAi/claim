<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
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
        DB::table('permissions')->truncate();

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $i = 0;
        $permissionArray[$i]['name'] = 'roles_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'roles_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'roles_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'roles_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'user_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'user_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'user_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'user_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');
    
        $i++;
        $permissionArray[$i]['name'] = 'patient_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dependent_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dependent_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dependent_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dependent_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'pharmacist_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'pharmacist_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'pharmacist_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'pharmacist_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'receptionist_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'receptionist_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'receptionist_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'receptionist_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-type_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-type_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-type_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-type_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor-type_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor-type_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'doctor-type_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');
        
        $i++;
        $permissionArray[$i]['name'] = 'doctor-type_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'clinical-services_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'clinical-services_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'clinical-services_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'clinical-services_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'departments_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'departments_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'departments_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'departments_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'request-indent_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'request-indent_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'request-indent_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'request-indent_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'manufacturers_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'manufacturers_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'manufacturers_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'manufacturers_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dosage-forms_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dosage-forms_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dosage-forms_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dosage-forms_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'inventory-items_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'inventory-items_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'inventory-items_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'inventory-items_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'medicines_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'medicines_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'medicines_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'medicines_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit-price_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit-price_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit-price_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-visit-price_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-opd_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-opd_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-opd_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-opd_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-ipd_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-ipd_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-ipd_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-ipd_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-er_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-er_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-er_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-er_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure-price_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure-price_write';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure-price_create';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'procedure-price_delete';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'dashboard';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'patient-progress';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'medicine-dispensed';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'laboratory-desk';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');

        $i++;
        $permissionArray[$i]['name'] = 'radiology-desk';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');
        $i++;
        $permissionArray[$i]['name'] = 'pharmacy_read';
        $permissionArray[$i]['guard_name'] = 'web';
        $permissionArray[$i]['created_at'] = date('Y-m-d H:i:s');
        $permissionArray[$i]['updated_at'] = date('Y-m-d H:i:s');
        
        Permission::insert($permissionArray);
    }
}
