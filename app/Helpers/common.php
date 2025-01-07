<?php
use App\Events\MessageSent;
use App\Events\NameMenuUpdated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Branch;
use App\Models\ClinicalServices;
use App\Models\Departments;
use App\Models\Hms;
use App\Models\PatientsType;
use App\Models\DoctorType;
use App\Models\DosageForm;
use App\Models\Manufacturer;
use App\Models\Medicine;
use App\Models\User;
use App\Models\PatientVisit;
use App\Models\{
    InventoryItem,
    Investigation,
    Pharmacy,
    PharmacyClinicalService,
    RequestIndent,
    Procedure,
    RequestedMedicine,
    MedicinesDosage,
    Agencies,
    AgenciesRule,
    Contacts,
    Discharge_letter_Model,
    PatientAccountsModel,
    InsuranceCompany,
    Permissions,
    ProcedurePrice,
    statusDefinition,
    ExternalHospitals,
    Infusion_suite_referral_model,
    InsurancePlan,
    LetterTemplateModel,
    Medicolegal_report_Model,
    PatientLetterGroup_B_Model,
    PatientLettersModel,
    Patients,
    Request_for_discs_hmc_model,
    StickNotesModel,
};



if (!function_exists('getCBPatientType')) {
    function getCBPatientType()
    {
        return array('cb-employee',  'unverified', 'walton', 'pensioner');
    }
}




if (!function_exists('getUsersList')) {
    function getUsersList()
    {
        $users = User::PatientInfo()->get();
        return $users;
    }
}










//get role and hms related users
if (!function_exists('getRoleRelatedUsersList')) {
    function getRoleRelatedUsersList($role_slug, $is_patient)
    {
        $users = array();
        if (!$role_slug) return null;

        if ($is_patient) {
            $users = User::join('roles', 'roles.id', '=', 'users.role_id')
                ->join('patients', 'patients.user_id', '=', 'users.id')
                ->where('users.status', '=', ACTIVE)
                ->where('roles.slug', 'like', '%' . $role_slug . '%')
                ->where('users.hms_id', Auth::user()->hms_id)
                ->select('users.*', 'patients.patient_type_id')->get();
        } else {
            $users = User::join('roles', 'roles.id', '=', 'users.role_id')
                ->where('users.status', '=', ACTIVE)
                ->where('roles.slug', 'like', '%' . $role_slug . '%')
                ->where('users.hms_id', Auth::user()->hms_id)
                ->select('users.*')->get();
        }
        return $users;
    }
}


//get role and hms and Branch related users
if (!function_exists('getRoleRelatedUsersBranchList')) {
    function getRoleRelatedUsersBranchList($role_slug, $is_patient, $BranchId)
    {
        $users = array();
        if (!$role_slug) return null;

        if ($is_patient) {
            $users = User::join('roles', 'roles.id', '=', 'users.role_id')
                ->join('patients', 'patients.user_id', '=', 'users.id')
                ->where('users.status', '=', ACTIVE)
                ->where('roles.slug', 'like', '%' . $role_slug . '%')
                ->where('users.hms_id', Auth::user()->hms_id)
                ->where('users.branch_id', $BranchId)
                ->select('users.*', 'patients.patient_type_id')->get();
        } else {
            $users = User::join('roles', 'roles.id', '=', 'users.role_id')
                ->where('users.status', '=', ACTIVE)
                ->where('roles.slug', 'like', '%' . $role_slug . '%')
                ->where('users.hms_id', Auth::user()->hms_id)
                ->where('users.branch_id', $BranchId)
                ->select('users.*')->get();
        }
        return $users;
    }
}


//get those users who support dependent.
if (!function_exists('getDependsOwn')) {
    function getDependsOwn()
    {
        $users = User::JoinHaveDependentOrNot(1)
            ->NotDependent()
            ->ReceptionSearchSelect()->get();
        return $users;
    }
}




if (!function_exists('getHmsList')) {
    function getHmsList()
    {
        $hmsList = Hms::Active()->where('id', Auth::user()->hms_id)->pluck('name', 'id');
        return $hmsList;
    }
}




if (!function_exists('gethmsName')) {
    function gethmsName()
    {
        if(Auth::user()!=null){
            $hms = Hms::where('id', Auth::user()->hms_id)
            ->select('name')
            ->get();
        if ($hms) {
            $hms = $hms->first();
            if (isset($hms->name)) {
                return $hms->name;
            }
        }
        }else{
            return redirect('/');
        }
        
        
    }
}






if (!function_exists('getStatusList')) {
    function getStatusList()
    {
        $statuses = [
            ACTIVE => ucfirst(ACTIVE),
            SUSPEND => ucfirst(SUSPEND),
            TRASH => ucfirst(TRASH),
            INACTIVE => ucfirst(INACTIVE),
        ];
        return $statuses;
    }
}

if (!function_exists('getDayList')) {
    function getDayList()
    {
        return $dayList = [
            'MON' => ucfirst(MON),
            'TUE' => ucfirst(TUE),
            'WED' => ucfirst(WED),
            'THU' => ucfirst(THU),
            'FRI' => ucfirst(FRI),
            'SAT' => ucfirst(SAT),
            'SUN' => ucfirst(SUN),
        ];
    }
}

if (!function_exists('getAppointmentStatusList')) {
    function getAppointmentStatusList($module)
    {
        $statuses = statusDefinition::where('module', $module)->select('id', 'name', 'slug', 'status')->get();
        return $statuses;
    }
}



if (!function_exists('getInventoryItemStatus')) {
    function getInventoryItemStatus()
    {
        $statuses = [
            ACTIVESTOCK => ucfirst(ACTIVESTOCK),
            INACTIVESTOCK => ucfirst(INACTIVESTOCK),
            OUTOFSTOCK => ucfirst(OUTOFSTOCK),
        ];
        return $statuses;
    }
}

if (!function_exists('getPatientStatusList')) {
    function getPatientStatusList()
    {
        $statuses = [
            ACTIVE => ucfirst(ACTIVE),
            INACTIVE => ucfirst(INACTIVE),
        ];
        return $statuses;
    }
}

if (!function_exists('getPatientName')) {
    function getPatientName($id)
    {
        $patient =  User::JoinWithPatient()
            ->withTrashed()
            ->where('users.id', $id)
            ->SelectPatientColumn()->get()->first();
        return $patient;
    }
}

if (!function_exists('getDoctor')) {
    function getDoctor()
    {
        $doctor =  User::JoinWithDoctor()
            ->SelectDoctorColumn()->get();
        return $doctor;
    }
}





if (!function_exists('getStatusSlugList')) {
    function getStatusSlugList()
    {
        $slug = [
            BOOKED => ucfirst(BOOKED),
            NOT_ARRIVED => ucfirst(NOT_ARRIVED),
            DID_NOT_ARRIVE => ucfirst(DID_NOT_ARRIVE),
            ARRIVED => ucfirst(ARRIVED),
            CONSULTANT => ucfirst(CONSULTANT),
            COMPLETED => ucfirst(COMPLETED),
            CANCELLED => ucfirst(CANCELLED),
        ];
        return $slug;
    }
}
if (!function_exists('getMaterialstatusList')) {
    function getMaterialstatusList()
    {
        $statuses = [


            SINGLE => ucfirst(SINGLE),
            WIDOWED => ucfirst(WIDOWED),
            MARRIED => ucfirst(MARRIED),
            SEPARATED => ucfirst(SEPARATED),
            DIVORCED => ucfirst(DIVORCED),
        ];
        return $statuses;
    }
}

if (!function_exists('getTitleList')) {
    function getTitleList()
    {
        $statuses = [
            Mr => ucfirst(Mr),
            Mrs => ucfirst(Mrs),
            Ms => ucfirst(Ms),
            Miss => ucfirst(Miss),
            Master => ucfirst(Master),
            Messrs => ucfirst(Messrs),
            Dr => ucfirst(Dr),
            Fr => ucfirst(Fr),
            Prof => ucfirst(Prof),
            Rev => ucfirst(Rev),
            Sr => ucfirst(Sr),
            Solicitor => ucfirst(Solicitor),
        ];
        return $statuses;
    }
}

if (!function_exists('getEmployeetypeList')) {
    function getEmployeetypeList()
    {
        $statuses = [
            CB_SIDE => ucfirst(CB_SIDE),
            GOVT_SIDE => ucfirst(GOVT_SIDE),
        ];
        return $statuses;
    }
}
if (!function_exists('getEmployeerelationList')) {
    function getEmployeerelationList()
    {
        $statuses = [
            SPOUSE => ucfirst(SPOUSE),
            FATHER => ucfirst(FATHER),
            MOTHER => ucfirst(MOTHER),
            // HUSBAND => ucfirst(HUSBAND),
            // WIFE => ucfirst(WIFE),
            SON => ucfirst(SON),
            DAUGHTER => ucfirst(DAUGHTER),
            // PARTNER => ucfirst(PARTNER),
            BROTHER => ucfirst(BROTHER),
            SISTER => ucfirst(SISTER),
            GRAND_CHILDREN => ucfirst(GRAND_CHILDREN),
            GRAND_PARENT => ucfirst(GRAND_PARENT),
            NIECE => ucfirst(NIECE),
            NEPHEW => ucfirst(NEPHEW),
            AUNT => ucfirst(AUNT),
            UNCLE => ucfirst(UNCLE),
            FIRST_COUSIN => ucfirst(FIRST_COUSIN),
            SECOND_COUSIN => ucfirst(SECOND_COUSIN),
            OTHERS => ucfirst(OTHERS),
        ];
        return $statuses;
    }
}
if (!function_exists('getEmployeenatureList')) {
    function getEmployeenatureList()
    {
        $statuses = [
            ON_SERVICE => ucfirst(ON_SERVICE),
            ON_LEAVE => ucfirst(ON_LEAVE),
            RETIRED => ucfirst(RETIRED),
        ];
        return $statuses;
    }
}
if (!function_exists('getScaleList')) {
    function getScaleList()
    {
        $statuses = [
            BS01 => ucfirst(BS01),
            BS02 => ucfirst(BS02),
            BS03 => ucfirst(BS03),
            BS04 => ucfirst(BS04),
            BS05 => ucfirst(BS05),
            BS06 => ucfirst(BS06),
            BS07 => ucfirst(BS07),
            BS08 => ucfirst(BS08),
            BS09 => ucfirst(BS09),
            BS10 => ucfirst(BS10),
            BS11 => ucfirst(BS11),
            BS12 => ucfirst(BS12),
            BS13 => ucfirst(BS13),
            BS14 => ucfirst(BS14),
            BS15 => ucfirst(BS15),
            BS16 => ucfirst(BS16),
            BS17 => ucfirst(BS17),
            BS18 => ucfirst(BS18),
            BS19 => ucfirst(BS19),
            FIXEDPRICE => ucfirst(FIXEDPRICE),
        ];
        return $statuses;
    }
}
if (!function_exists('getEmployeeDepartmentList')) {
    function getEmployeeDepartmentList()
    {
        $statuses = [
            GENERAL_ADMINISTRATION => ucfirst(GENERAL_ADMINISTRATION),
            LANDS => ucfirst(LANDS),
            ENGINEERING => ucfirst(ENGINEERING),
            REVENUE => ucfirst(REVENUE),
            CANTT_GENERAL_HOSPITAL => ucfirst(CANTT_GENERAL_HOSPITAL),
            ENFORCEMENT => ucfirst(ENFORCEMENT),
            WATER_SUPPLY => ucfirst(WATER_SUPPLY),
            GARDEN => ucfirst(GARDEN),
            ACCOUNTS => ucfirst(ACCOUNTS),
            ESTABLISHMENT => ucfirst(ESTABLISHMENT),
            RENT_CONTROLLER => ucfirst(RENT_CONTROLLER),
            CEO_OFFICE => ucfirst(CEO_OFFICE),
            MAGISTRATE_BRANCH => ucfirst(MAGISTRATE_BRANCH),
            REST_HOUSE => ucfirst(REST_HOUSE),
            ELECTRIC => ucfirst(ELECTRIC),
            STORE => ucfirst(STORE),
            TIP_CELL => ucfirst(TIP_CELL),
            LIBRARY => ucfirst(LIBRARY),
            IT => ucfirst(IT),
            LEGAL => ucfirst(LEGAL),
            WORKSHOP => ucfirst(WORKSHOP),
            EDUCATION => ucfirst(EDUCATION),
            SLAUGHTER_HOUSE => ucfirst(SLAUGHTER_HOUSE),
            CANTT_ADMIN_DTE => ucfirst(CANTT_ADMIN_DTE),
            BUILDING_CONTROL_CELL => ucfirst(BUILDING_CONTROL_CELL),
            CB_SCHOOLS_COLLEGES => ucfirst(CB_SCHOOLS_COLLEGES),
            CANTT_PUBLIC_SCHOOL_BOY_SCOLLEGE => ucfirst(CANTT_PUBLIC_SCHOOL_BOY_SCOLLEGE),
            CB_CARE => ucfirst(CB_CARE),
            CB_PUBLIC_SCHOOL_COLLEGE => ucfirst(CB_PUBLIC_SCHOOL_COLLEGE),
            CANTT_PUBLIC_HIGH_SCHOOL_GIRLS_COLLEGE => ucfirst(CANTT_PUBLIC_HIGH_SCHOOL_GIRLS_COLLEGE),
            HR_GOVT_SIDE => ucfirst(HR_GOVT_SIDE),
            HOARDINGS => ucfirst(HOARDINGS),
            SANITATION => ucfirst(SANITATION),
        ];
        return $statuses;
    }
}

if (!function_exists('getRequestStatusList')) {
    function getRequestStatusList()
    {
        $requestStatusList = [
            PENDING => ucfirst(PENDING),
            APPROVED => ucfirst(APPROVED),
            CANCELLED => ucfirst(CANCELLED),
        ];
        return $requestStatusList;
    }
}

//not used in system
if (!function_exists('calculateBottles')) {
    function calculateBottles($patientRequiredVolume, $volumePerBottle = 20)
    {
        return ceil($patientRequiredVolume / $volumePerBottle);
    }
}

//used in cachbookController
if (!function_exists('calculatePercentage')) {
    function calculatePercentage($discount, $price)
    {
        $discountOnAmount = ($discount / 100) * $price;
        $discounttedPrice = $price - $discountOnAmount;
        if ($discounttedPrice > 0) {
            return $discounttedPrice;
        } else {
            return 0;
        }
    }
}

if (!function_exists('getMedicineTypeList')) {
    function getMedicineTypeList()
    {
        $medicineType = [
            TABLET => ucfirst(TABLET),
            CAPSULE => ucfirst(CAPSULE),
            SYRUP => ucfirst(SYRUP),
            SUSPENSION => ucfirst(SUSPENSION),
            INJECTION => ucfirst(INJECTION),
            INFUSION => ucfirst(INFUSION),
            CREAM => ucfirst(CREAM),
            OINTMENT => ucfirst(OINTMENT),
            LOTION => ucfirst(LOTION),
            GEL => ucfirst(GEL),
            BALM => ucfirst(BALM),
            TOPICAL_SOLUTION => ucfirst(TOPICAL_SOLUTION),
            SACHET => ucfirst(SACHET),
            JAR => ucfirst(JAR),
            AEROSOL => ucfirst(AEROSOL),
            AEROSOL_AMPOULE => ucfirst(AEROSOL_AMPOULE),
            INHALER => ucfirst(INHALER),
            SOLUTION => ucfirst(SOLUTION),
            ORAL_SOLUTION => ucfirst(ORAL_SOLUTION),
            ORAL_SOLUTION_AMPOULE => ucfirst(ORAL_SOLUTION_AMPOULE),
            ENEMA_SOLUTION => ucfirst(ENEMA_SOLUTION),
            CLEANING_SOLUTION => ucfirst(CLEANING_SOLUTION),
            EVOHALER => ucfirst(EVOHALER),
            ORAL_DROPS => ucfirst(ORAL_DROPS),
            NASAL_DROPS => ucfirst(NASAL_DROPS),
            EYE_DROPS => ucfirst(EYE_DROPS),
            EAR_DROPS => ucfirst(EAR_DROPS),
            NASAL_SPRAY => ucfirst(NASAL_SPRAY),
            MOUTHWASH => ucfirst(MOUTHWASH),
            TOOTHPASTE => ucfirst(TOOTHPASTE),
            MEDICALACCESSORIES => ucfirst(MEDICALACCESSORIES),
            PESSARY => ucfirst(PESSARY),
        ];
        return $medicineType;
    }

    if (!function_exists('getDetermineMedicalType')) {
        function getDetermineMedicalType()
        {
            return array(
                'tablet', 'capsule', 'injection', 'sachet', 'medical_accessories', 'infusion', 'aerosol_ampoule',
                'oral_solution_ampoule'
            );
        }
    }



    if (!function_exists('getRoleWise')) {
        function getRoleWise($role)
        {
            if ($role && Auth::user()->hms_id == 1) {
                $redirectUrl = array(
                    "admin" => "/",
                    "super-admin" => "/",
                );
                if ($redirectUrl[$role]) {
                    return $redirectUrl[$role];
                }
                return '/';
            } else {
                $redirectUrl = array(
                    "admin" => "/",
                    "shop" => "/shop",
                    'qa' => '/qa',
                    'distribution' => '/distribution',
                    "super-admin" => "/",
                );
                if ($redirectUrl[$role]) {
                    return $redirectUrl[$role];
                }
                return '/';
            }
        }
    }
}

if (!function_exists('getPermissionsViaRoles')) {
    function getPermissionsViaRoles()
    {
        $permissionsViaRoles = NULL;
        $permissionsViaRoles = Permissions::join('role_has_permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->where('role_has_permissions.role_id', Auth::user()->role_id)->get();
        return $permissionsViaRoles;
    }
}




if (!function_exists('getUSerBySearch')) {
    function getUSerBySearch($searchNo, $slug)
    {
        $users = User::SearchUserJoin($slug)
            ->Where('users.id', $searchNo)
            ->SearchUserSelect()
            ->get();

        if (count($users) > 0) {
            return $users;
        } else {
            $users = User::SearchUserJoin($slug)
                ->where(function ($query) use ($searchNo) {
                    $searchNoLower = strtolower($searchNo);
                    $fullName = DB::raw("CONCAT(users.firstname, ' ', users.lastname)");
                    $query->orWhere('users.cnic', 'LIKE', '%' . $searchNo . '%')
                        ->orWhere('users.phone', 'LIKE', '%' . $searchNo . '%')
                        ->orWhere('users.firstname', 'LIKE', '%' . $searchNo . '%')
                        ->orWhere('users.lastname', 'LIKE', '%' . $searchNo . '%')
                        ->orWhereRaw('LOWER(' . $fullName . ') LIKE ?', '%' . $searchNoLower . '%');
                })->SearchUserSelect()->get();
            if (count($users) > 0) {
                return $users;
            } else {
                return $users;
            }
        }
    }
}
