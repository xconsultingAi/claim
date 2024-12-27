<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use App\Models\{
    Hms,
    Branch,
    Role,
    Shop,
    Doctors,
    Employees,
    Patients,
    Dependents,
    Receptionists,
    Pharmacists,
    PatientEmployment,
};

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{

    use HasApiTokens, HasFactory, HasProfilePhoto, Notifiable, TwoFactorAuthenticatable, HasRoles, LogsActivity, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'hms_id',
        'branch_id',
        'name',
        'username',
        'email',
        'password',
        // 'phone',
        // 'mobile_no',
        // 'cnic',
        // 'address',
        'role_id',
        'shop_id',
        // 'profile_image',
        // 'status',
        // 'latitude',
        // 'longitude',
        // 'contact_person',
    ];
    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "User";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} User ";
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*']);
    }

    public function getBatchUuidAttribute()
    {
        return $this->properties['batch_uuid'] ?? null;
    }

    public function setBatchUuidAttribute($value)
    {
        $this->properties['batch_uuid'] = $value;
    }

    /*------------------- Logs Work End----------*/

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        // 'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

   

    
  

 

    public function ScopeActive($query)
    {
        return $query->where('status', ACTIVE);
    }

    public function ScopeDependent($query)
    {
        return $query->where('is_dependent', 1);
    }

    public function ScopeNotDependent($query)
    {
        return $query->where('is_dependent', 0);
    }

    public function hms()
    {
        return $this->belongsTo(Hms::class, 'hms_id', 'id');
    }

   

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
    
    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }

    public function ScopeJoinWithDoctor($query)
    {
        return $query->Join('roles', 'users.role_id', '=', 'roles.id')
            ->where('roles.slug', 'doctor')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->where('users.status', 'active');
    }
    public function ScopeSelectDoctorColumn($query)
    {
        return $query->select(
            DB::raw('CONCAT(users.firstname, " ", users.lastname) AS doctor_name'),
            'users.id'
        );
    }

    public function ScopeJoinWithPatient($query)
    {
        return $query->Join('roles', 'users.role_id', '=', 'roles.id')
            ->Join('patients', 'users.id', '=', 'patients.user_id')
            ->leftJoin('patient_employment', 'users.id', '=', 'patient_employment.user_id')
            ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
            ->leftJoin('dependents', 'users.id', '=', 'dependents.user_id')
            ->where('roles.slug', 'patient')
            ->where('users.hms_id', Auth::user()->hms_id);
            // ->where('users.status', 'active');
    }

    public function ScopeSelectPatientColumn($query)
    {
        return $query->select(
            'users.*',
            'roles.id as role_id',
            'roles.name as role_name',
            'patients_type.id as patient_type_id',
            'patients_type.name as patient_type_name',
            'dependents.depends_on_user_id as depends_on_user_id',
            'patients.disease',
            'dependents.relation',
            'patient_employment.employee_no',
            'patient_employment.designation',
            DB::raw("UCASE(REPLACE(patient_employment.employee_type, '_', ' ')) AS employee_type"),
            DB::raw("UCASE(REPLACE(patient_employment.employee_nature, '_', ' ')) AS employee_nature"),
            DB::raw("UCASE(patient_employment.scale) AS scale"),
            DB::raw("UCASE(REPLACE(patient_employment.department, '_', ' ')) AS department"),
            DB::raw('YEAR(CURDATE()) - YEAR(users.dob) -
            IF(DATE_FORMAT(CURDATE(), "%m-%d") < DATE_FORMAT(users.dob, "%m-%d"), 1, 0) as age')
        );
    }

    public function ScopePatientInfoById($query, $id)
    {
        return $query->select(
            'users.id as user_id',
            'users.firstname',
            'users.lastname',
            'users.profile_image',
            'users.phone',
            'users.cnic',
            'users.gender',
            'users.dob',
            'patients_type.id as patient_type_id',
            'patients_type.name as patient_type_name',
            DB::raw('YEAR(CURDATE()) - YEAR(users.dob) -
            IF(DATE_FORMAT(CURDATE(), "%m-%d") < DATE_FORMAT(users.dob, "%m-%d"), 1, 0) as age')
        )
            ->Join('patients', 'users.id', '=', 'patients.user_id')
            ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
            ->where('users.id', $id)
            ->where('users.status', 'active');
    }

    /**
     * method implementation:
     * patientController::getPatientBySearch
     */
    public function ScopeReceptionSearchComman($query)
    {
        return $query->join('roles', 'roles.id', '=', 'users.role_id')
            ->join('patients', 'patients.user_id', '=', 'users.id')
            ->join('patients_type', 'patients_type.id', '=', 'patients.patient_type_id')
            ->leftJoin('patient_employment', 'patient_employment.user_id', '=', 'users.id')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->where('roles.slug', 'patient')
            ->where('users.status', 'active');
    }

    /**
     * method implementation:
     * patientController::getPatientBySearch
     * Comman::getDependsOwn
     */
    public function ScopeReceptionSearchSelect($query)
    {
        return $query->select(
            'users.id',
            'users.firstname',
            'users.lastname',
            'users.profile_image',
            'users.email',
            'users.cnic',
            'users.phone',
            'users.gender',
            'users.is_dependent',
            'patients.id as patient_id',
            'patients_type.name as patients_type_name',
            'patient_employment.employee_no'
        );
    }

    /**
     * method implementation:
     * doctorController::SearchUserJoin
     */
    public function ScopeSearchUserJoin($query, $userRole)
    {
        return $query->join('roles', 'roles.id', '=', 'users.role_id')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->where('roles.slug', $userRole)
            ->where('users.status', 'active');
    }

    /**
     * method implementation:
     * patientController::getPatientBySearch
     * Comman::getDependsOwn
     */
    public function ScopeSearchUserSelect($query)
    {
        return $query->select(
            'users.id',
            'users.firstname',
            'users.lastname',
            'users.email',
            'users.cnic',
            'users.phone'
        );
    }

    /**
     * method implementation:
     * Comman::getDependsOwn
     * indirect: patientController::addPatient
     */
    public function ScopeJoinHaveDependentOrNot($query, $haveDependentBit)
    {
        return $query->join('roles', 'roles.id', '=', 'users.role_id')
            ->join('patients', 'patients.user_id', '=', 'users.id')
            ->join('patients_type', 'patients_type.id', '=', 'patients.patient_type_id')
            ->leftJoin('patient_employment', 'patient_employment.user_id', '=', 'users.id')
            ->where('patients_type.can_have_dependent', $haveDependentBit)
            ->where('users.hms_id', Auth::user()->hms_id)
            ->where('users.status', 'active');
    }


    public function ScopePatientInfo($query)
    {

        return $query->select(
            'users.id as user_id',
            'users.firstname',
            'users.lastname',
            'users.cnic',
            'patient_employment.employee_no',
        )
            ->leftJoin('patient_employment', 'patient_employment.user_id', '=', 'users.id')
            ->leftJoin('patients', 'patients.user_id', '=', 'users.id')
            ->where('users.status', 'active')
            ->where('users.role_id', 1)
            ->where('users.hms_id', Auth::user()->hms_id)
            ->wherein('patients.patient_type_id', [2, 4])
            ->where('users.branch_id', Auth::user()->branch_id);
    }

    public function ScopePatientInfoPHByid($query, $id)
    {
        return $query->select(
            'users.id as user_id',
            'personal_history.id',
            'patient_examination_history.id as examination_id',
            'personal_history.health_habit',
            'personal_history.travel_history',
            'personal_history.family_history',
            'personal_history.social_history',
            'users.firstname',
            'users.lastname',
            'users.profile_image',
            'users.phone',
            'users.cnic',
            'users.gender',
            'users.dob',
            'patient_employment.designation',
            'patient_employment.employee_no',
            'dependents.relation',
            'patients_type.id as patient_type_id',
            'patients_type.name as patient_type_name',
            DB::raw('YEAR(CURDATE()) - YEAR(users.dob) -
         IF(DATE_FORMAT(CURDATE(), "%m-%d") < DATE_FORMAT(users.dob, "%m-%d"), 1, 0) as age')
        )
            ->Join('patients', 'users.id', '=', 'patients.user_id')
            ->leftJoin('patient_employment', 'users.id', '=', 'patient_employment.user_id')
            ->leftJoin('dependents', 'users.id', '=', 'dependents.user_id')
            ->leftJoin('personal_history', 'users.id', '=', 'personal_history.patient_id')
            ->leftJoin('patient_examination_history', 'users.id', '=', 'patient_examination_history.patient_id')
            ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
            ->where('users.id', $id);
            // ->where('users.status', 'active');
    }

    public function ScopePatientInfoPMByid($query, $id)
    {
        return $query->select(
            'users.id as user_id',
            'patient_medical_history.id',
            'patient_medical_history.family_history',
            'patient_medical_history.smoking_history',
            'patient_medical_history.Immun_history',
            'patient_medical_history.Allergy_history',
            'users.firstname',
            'users.lastname',
            'users.profile_image',
            'users.phone',
            'users.cnic',
            'users.gender',
            'users.dob',
            'patients_type.id as patient_type_id',
            'patients_type.name as patient_type_name',
            DB::raw('YEAR(CURDATE()) - YEAR(users.dob) -
            IF(DATE_FORMAT(CURDATE(), "%m-%d") < DATE_FORMAT(users.dob, "%m-%d"), 1, 0) as age')
        )
            ->Join('patients', 'users.id', '=', 'patients.user_id')
            ->leftJoin('patient_medical_history', 'users.id', '=', 'patient_medical_history.patient_id')
            ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
            ->where('users.id', $id);
            // ->where('users.status', 'active');
    }

    public function ScopeGetContact($query,$id)
    {
        return $query
        ->join('patients', 'users.id', '=', 'patients.user_id')
        ->leftJoin('user_has_contacts', 'patients.id', '=', 'user_has_contacts.patient_id')
        ->leftJoin('contacts as contacts', 'user_has_contacts.gp_id', '=', 'contacts.id')
        ->where('users.id', $id)
        ->select(
            'contacts.*',
        );
    }
    public function ScopeInsuranceDetails($query,$id)
    {
        return $query
        ->join('insurance_companies', 'insurance_companies.id', '=', 'users.insurance_company')
        ->where('users.id', $id)
        ->select(
            'insurance_companies.*',
        );
    }
    public function ScopeInsurancePlan($query,$id)
    {
        return $query        
        ->Join('insurance_plans', 'insurance_plans.id', '=', 'users.insurance_company_plan')
        ->where('users.id', $id)
        ->select(
            'insurance_plans.*',
        );
    }
}
