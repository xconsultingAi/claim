<?php

namespace App\Http\Controllers;

use App\Helpers\UploadAttachments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientTypeController;
use App\Http\Controllers\DependentController;
use Carbon\Carbon;
use App\Models\{
    User,
    Patients,
    Role,
    Dependents,
    Medicine,
    PatientEmployment,
    PatientVisit,
    Appointment,
    Contacts,
    Forms,
    PatientLettersModel,
    Prescription,
    ScannedDocument,
    ExternalHospitals,
    InsurancePlan,
    InsuranceCompany,
    UserHasContact,
    PatientAccountsModel,
    PatientMedicalModel,
    PatientAppointmentModel,
};

// use Hash;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{

    protected $path = 'PCM/Patient/Profile-Image';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        // $this->middleware('permission:patient_read|patient_write|patient_create|patient_delete', ['only' => ['index','store','getpatientList','getUsersList']]);
        // $this->middleware('permission:patient_create', ['only' => ['create','store']]);
        // $this->middleware('permission:patient_write', ['only' => ['edit','update']]);
        // $this->middleware('permission:patient_delete', ['only' => ['destroy']]);
    }

    /**
     * Search & listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('patient.index');
    }
    public function getPatientSummaryById()
    {
        return view('patient.patient-summary');
    }
    public function getPatientHistoryById()
    {
        return view('patient.patient-PersonalHistory');
    }
    public function getPatientMedicalHistoryById()
    {
        return view('patient.patient-MedicalHistory');
    }
    public function getPatientExaminationHistoryById()
    {
        return view('patient.patient-ExaminationHistory');
    }
    public function getPatientNotesById($id)
    {

        // Fetch appointments for the given patient ID
        $appointments = Appointment::where('patient_user_id', $id)->get();

        // Pass the appointments data to the view
        return view('patient.patient-Notes', compact('appointments'));
    }
    public function getPatientScannedDocumentsById()
    {
        return view('patient.patient-ScannedDocuments');
    }
    public function getPatientLettersById()
    {
        return view('patient.patient-Letters');
    }
    public function getPatientAddPersonalHistoryById()
    {
        return view('patient.patient-AddPersonalHistory');
    }
    // register used for hospital
    public function addPatient()
    {
        $pageConfigs = ['blankPage' => true];
        $roles = array();
        $relation = getEmployeerelationList();
        $department = getEmployeeDepartmentList();
        $scale = getScaleList();
        $employeetype = getEmployeetypeList();
        $employeenature = getEmployeenatureList();

        $roles = Role::RoleByHms()->get();
        // $dependentAllowedUsers = getDependsOwn();
        $patientType = getPatientTypes(); //get patient types from helper functions
        return view('/patient/add-patient', ['pageConfigs' => $pageConfigs])->with([
            'roles' => $roles,
            'patientType' => $patientType,
            'department' => $department,
            'scale' => $scale,
            'employeetype' => $employeetype,
            'employeenature' => $employeenature,
            'relation' => $relation,
        ]);
    }

    public function createPcmPatient()
    {
        $pageConfigs = ['blankPage' => false];
        $roles = array();
        $relation = getEmployeerelationList();
        $department = getEmployeeDepartmentList();
        $scale = getScaleList();
        $employeetype = getEmployeetypeList();
        $employeenature = getEmployeenatureList();
        $roles = Role::get();
        // $dependentAllowedUsers = getDependsOwn();
        $patientType = getPatientTypes();
        $maritalStatus = getMaterialstatusList();
        $getTitleList = getTitleList();
        $externalhospitals = getExternalHospitalsList();
        $contacts = getContactList();
        $gpContacts = getGpList();
        $solicitorContacts = getSolicitorList();
        $insuranceCompany = getInsuranceCompanies();
        $contactType = Contacts::getcontactType();
        $status = InsuranceCompany::getStatus();
        $paymentMode = InsuranceCompany::getPaymentMethod();
        $companies = getInsuranceCompanies();

        //get patient types from helper functions

        return view('/private-clinic/patient/create', ['pageConfigs' => $pageConfigs])->with([
            'roles' => $roles,
            'status' => $status,
            'paymentMode' => $paymentMode,
            'companies' => $companies,
            'patientType' => $patientType,
            'department' => $department,
            'scale' => $scale,
            'employeetype' => $employeetype,
            'employeenature' => $employeenature,
            'relation' => $relation,
            'maritalStatus' => $maritalStatus,
            'getTitleList' => $getTitleList,
            'externalhospitals' => $externalhospitals,
            'contacts' => $contacts,
            'gpContacts' => $gpContacts,
            'solicitorContacts' => $solicitorContacts,
            'insuranceCompany' => $insuranceCompany,
            'contactType' => $contactType,
        ]);
    }

    public function getInsurancePlans($companyId)
    {
        $plans = InsurancePlan::where('insurance_company_id', $companyId)->pluck('name', 'id');
        return response()->json($plans);
    }

    public function getInsuranceCompanies()
    {
        $insuranceCompany = getInsuranceCompanies();
        return response()->json($insuranceCompany);
    }

    public function create(Request $request)
    {
        $date = $request->dob;
        $carbonDate = Carbon::parse($date);
        $formattedDate = $carbonDate->format('Y-m-d');
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => "failure",
                "message" => 'Please login again.',
            ], 400);
        }
        $imageUrl = '';

        if ($request->hasFile('profile_image')) {
            $imageUrl = UploadAttachments::uploadAttachments($request, $this->path, 'profile_image');
            unset($request['profile_image']);
        }
        if (isset($request->email)) {
            $password = Hash::make($request->email);
        } else {
            $password = Hash::make('surjx');
        }

        $request->merge([
            'password' => $password,
            'hms_id' => Auth::user()->hms_id,
            'branch_id' => Auth::user()->branch_id,
        ]);

        try {
            DB::beginTransaction();

            $role = Role::where('hms_id', Auth::user()->hms_id)->where('slug', 'patient')->get();
            if (count($role) < 1) {
                return response()->json([
                    "status" => FAILURE,
                    "message" => 'role not found.',
                ], 400);
            }

            $roleName = $role->first()->name;

            $createUser = User::create([
                'hms_id' => $request->hms_id,
                'branch_id' => $request->branch_id,
                'title' => $request->title,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'marital_status' => $request->marital_status,
                'religion' => $request->religion,
                'pharmacy' => $request->pharmacy,
                'case_ref_no' => $request->case_ref_no,
                'insurance_company' => $request->insurance_company,
                'insurance_company_plan' => $request->insurance_company_plan,
                'insurance_no' => $request->insurance_no,
                'notes' => $request->notes,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'mobile_no' => $request->mobile_no,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'address_line_2' => $request->address_line_2,
                'address_line_3' => $request->address_line_3,
                'zipcode' => $request->zipcode,
                'occupation' => $request->occupation,
                'role_id' => $request->role_id,
                'profile_image' => $imageUrl ? $imageUrl : '',
                'gender' => $request->gender,
                'dob' =>  $formattedDate,
                'status' => $request->status,
                'is_super' => $request->is_super,
                'is_rip' => $request->is_rip ?? 0,
                'is_non_paying' => $request->is_non_paying ?? 0,
                'er_title' => $request->er_title,
                'er_firstname' => $request->er_firstname,
                'er_lastname' => $request->er_lastname,
                'er_email' => $request->er_email,
                'er_phone' => $request->er_phone,
                'er_cnic' => $request->er_cnic,
                'er_mobile' => $request->er_mobile,
                'er_address' => $request->er_address,
                'er_address_1' => $request->er_address_1,
                'er_address_2' => $request->er_address_2,
                'er_address_3' => $request->er_address_3,
                'er_relationship' => $request->er_relationship,
                'externalhospital' => $request->externalhospital,
                'externalhospital_1' => $request->externalhospital_1,
                'externalhospital_2' => $request->externalhospital_2,
                'externalhospital_3' => $request->externalhospital_3,
                'mrn_no' => $request->mrn_no,
                'mrn_no1' => $request->mrn_no1,
                'mrn_no2' => $request->mrn_no2,
                'mrn_no3' => $request->mrn_no3,
            ]);
            $createUser->assignRole($roleName);
            if (!$createUser->id) {
                DB::rollBack();
                return response()->json($createUser);
            }

            $request['user_id'] = $createUser->id;
            $createPatient = Patients::create($request->all());
            $userHasContact = UserHasContact::create([
                'hms_id' => $request->hms_id,
                'patient_id' => $createPatient->id,
                'gp_id' => $request->general_practitioner,
                'solicitor_id' => $request->solicitor,
                'ref_to' => $request->referral_to,
                'ref_by' => $request->ref_doc,
            ]);
            if (!$createPatient->id) {
                DB::rollBack();
                return response()->json($createPatient);
            }
            DB::commit();
            return response()->json([
                "status" => "success",
                'message' => "Patient Created Successfully",
                'newPatient' => [
                    'id' => $createUser->id,
                    'firstname' => $createUser->firstname,
                    'lastname' => $createUser->lastname,
                    'mobile_no' => $createUser->mobile_no
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failure", 'message' => $e], 401);
        }
    }

    public function createPatient(Request $request)
    {
        $createPatient = Patients::create([
            'user_id' => $request->user_id,
            'patient_type_id' => intval($request->patient_type_id),
            'disease' => $request->disease,
        ]);


        if ($createPatient) {
            return array(
                'status' => 'success',
                'message' => 'Record has been created successful'
            );
        }
        return array("status" => "failure", 'message' => 'something_went_wrong');
    }

    public function update(Request $request)
    {
        $date = $request->dob;
        $carbonDate = Carbon::parse($date);
        $formattedDate = $carbonDate->format('Y-m-d');
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => "failure",
                "message" => 'Please login again.',
            ], 400);
        }
        $imageUrl = '';
        if ($request->hasFile('profile_image')) {
            $imageUrl = UploadAttachments::uploadAttachments($request, $this->path, 'profile_image');
        }
        $request->merge([
            'hms_id' => Auth::user()->hms_id,
            'branch_id' => Auth::user()->branch_id,
        ]);
        try {
            DB::beginTransaction();
            $user = User::find($request->id);
            $user->update([
                'hms_id' => $request->hms_id,
                'branch_id' => $request->branch_id,
                'title' => $request->title,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'marital_status' => $request->marital_status,
                'religion' => $request->religion,
                'pharmacy' => $request->pharmacy,
                'case_ref_no' => $request->case_ref_no,
                'insurance_company' => $request->insurance_company,
                'insurance_company_plan' => $request->insurance_company_plan,
                'insurance_no' => $request->insurance_no,
                'notes' => $request->notes,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'mobile_no' => $request->mobile_no,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'address_line_2' => $request->address_line_2,
                'address_line_3' => $request->address_line_3,
                'zipcode' => $request->zipcode,
                'occupation' => $request->occupation,
                'role_id' => $request->role_id,
                'profile_image' => $imageUrl ?? $request->profile_image,
                'gender' => $request->gender,
                'dob' =>  $formattedDate,
                'status' => $request->status,
                'is_super' => $request->is_super,
                'is_rip' => $request->is_rip ?? 0,
                'is_non_paying' => $request->is_non_paying ?? 0,
                'er_title' => $request->er_title,
                'er_firstname' => $request->er_firstname,
                'er_lastname' => $request->er_lastname,
                'er_email' => $request->er_email,
                'er_phone' => $request->er_phone,
                'er_cnic' => $request->er_cnic,
                'er_mobile' => $request->er_mobile,
                'er_address' => $request->er_address,
                'er_address_1' => $request->er_address_1,
                'er_address_2' => $request->er_address_2,
                'er_address_3' => $request->er_address_3,
                'er_relationship' => $request->er_relationship,
                'externalhospital' => $request->externalhospital,
                'externalhospital_1' => $request->externalhospital_1,
                'externalhospital_2' => $request->externalhospital_2,
                'externalhospital_3' => $request->externalhospital_3,
                'mrn_no' => $request->mrn_no,
                'mrn_no1' => $request->mrn_no1,
                'mrn_no2' => $request->mrn_no2,
                'mrn_no3' => $request->mrn_no3,
            ]);
            if (!$user->id) {
                DB::rollBack();
                return response()->json($user);
            }
            $this->patientmrnupdate($request, $user->id);
            if ($request->patient_id) {
                $patient = Patients::find($request->patient_id);
                $patient->update($request->all());
                $patientHasContact = UserHasContact::where('patient_id', $patient->id)->first();
                if ($patientHasContact) {
                    $patientHasContact->update([
                        'gp_id' => $request->general_practitioner,
                        'solicitor_id' => $request->solicitor,
                        'ref_to' => $request->referral_to,
                        'ref_by' => $request->ref_doc,
                    ]);
                } else {
                    $patientHasContact = UserHasContact::create([
                        'hms_id' => $request->hms_id,
                        'patient_id' => $patient->id,
                        'gp_id' => $request->general_practitioner,
                        'solicitor_id' => $request->solicitor,
                        'ref_to' => $request->referral_to,
                        'ref_by' => $request->ref_doc,
                    ]);
                }
            } else {
                $request['user_id'] = $request->id;
                $patient = Patients::create($request->all());
            }

            if (!$patient->id) {
                DB::rollBack();
                return response()->json($patient);
            }

            DB::commit();
            return response()->json([
                "patient_id" => $user->id,
                "status" => "success",
                'message' => "Patient Updated Successfully\nPatient ID : " . $user->id,
                'newPatient' => [
                    'id' => $user->id,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'phone' => $user->phone
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failure", 'message' => $e], 401);
        }
    }

    public function updatePatient(Request $request)
    {
        $patient = Patients::find($request->patient_id);

        // $patient->user_id = $request->user_id;
        $patient->patient_type_id = $request->patient_type_id;
        $patient->disease = $request->disease;
        $patient->save();

        if ($patient->id) {
            return array(
                'status' => 'success',
                'message' => 'Record has been updated successful'
            );
        }

        return array("status" => "failure", 'message' => 'something_went_wrong');
    }

    public function patientList()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/patient/patient-list', ['pageConfigs' => $pageConfigs]);
    }

    public function getPatientList()
    {
        $roles = Role::where('hms_id', Auth::user()->hms_id)
            ->where('branch_id', Auth::user()->branch_id)
            ->where('slug', 'patient')
            ->where('status', 'active')->first();

        if ($roles && $roles->id) {
            $users = User::Join('patients', 'users.id', '=', 'patients.user_id')
                ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
                ->leftJoin('patient_employment', function ($join) {
                    $join->on('users.id', '=', 'patient_employment.user_id');
                })
                //                ->leftJoin('patient_employment', 'users.id', '=', 'patient_employment.user_id')
                ->where('users.hms_id', Auth::user()->hms_id)
                ->where('users.branch_id', Auth::user()->branch_id)
                ->where('users.role_id', $roles->id)
                ->select(
                    'users.id',
                    'users.firstname',
                    'users.lastname',
                    'users.email',
                    'users.phone',
                    'users.cnic',
                    'users.status',
                    'users.gender',
                    'patients_type.name as patients_type_name',
                )->get();

            if ($users) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'user fectched successfully',
                    'data' => $users->toArray()
                ]);
            } else {
                return response()->json([
                    'status' => 'success',
                    'message' => 'user not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 'empty',
                'message' => 'role not found'
            ]);
        }
    }

    public function getPatientById(Request $request)
    {
        
        if ($request->id) {
            $result = $this->getPatientRelatedInfo($request->id);
            if ($result['status'] == 'success') {
                return response()->json([
                    "status" => "success",
                    "userInfo" => $result['user'],
                ], 200);
            } else {
                return response()->json([
                    "status" => "failure",
                    "message" => $result['message'],
                ], 400);
            }
        } else {
            return response()->json([
                "status" => "failure",
                "message" => "Id not found",
            ], 400);
        }
    }

    public function getPatientRelatedInfo($id)
    {
        try {
            $user = User::where('id', $id)->first();
            $user = $user ? $user->toArray() : array();
            if (count($user) > 0 && $user['role_id']) {
                $patient = Patients::where('user_id', $id)->first();
                $patientID = $patient->id;
                $contact = UserHasContact::where('patient_id', $patientID)->first();
                $user['patient'] = $patient ? $patient->toArray() : array();
                $user['contact'] = $contact ? $contact->toArray() : array();
                return array("status" => "success", 'user' => $user);
            } else {
                return array("status" => "failure", 'message' => 'user not found');
            }
        } catch (\Exception $e) {
            return array("status" => "failure", 'message' => $e);
        }
    }

    public function patientCountDetail()
    {
        $patientsCountDetail = array();
        $roles = Role::where('hms_id', Auth::user()->hms_id)
            ->where('branch_id', Auth::user()->branch_id)
            ->where('slug', 'patient')
            ->where('status', 'active')->first();

        if ($roles && $roles->id) {
            $patientsCountDetail['totalPatient'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('role_id', $roles->id)->count();

            $patientsCountDetail['pendingPatient'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('role_id', $roles->id)
                ->where('status', 'pending')->count();

            $patientsCountDetail['activePatient'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('role_id', $roles->id)
                ->where('status', 'active')->count();

            $patientsCountDetail['inActivePatient'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('role_id', $roles->id)
                ->where('status', 'in_active')->count();


            return response()->json([
                'status' => 'success',
                'patientsCountDetail' => $patientsCountDetail
            ]);
        } else {
            return response()->json([
                'status' => 'empty',
                'message' => 'role not found'
            ]);
        }
    }

    public function delete($id)
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => "failure",
                "message" => 'Please login again.',
            ], 400);
        }

        try {
            DB::beginTransaction();
            if ($id) {
                $user = User::find($id);
                $user->patient ? $user->patient->delete() : '';
                $user->dependent ? $user->dependent->delete() : '';
                $user->patientEmployee ? $user->patientEmployee->delete() : '';

                $role = Role::find($user->role_id);
                if (!$role) {
                    return response()->json([
                        "status" => FAILURE,
                        "message" => 'role not found.',
                    ], 400);
                }

                $roleName = $role->name;
                $user->removeRole($roleName);
                $user->delete();
                if (!$user) {
                    DB::rollBack();
                    return response()->json([
                        "status" => FAILURE,
                        'message' => $user
                    ]);
                }

                DB::commit();
                return response()->json([
                    "status" => "success",
                    'message' => 'Patient has been deleted successful'
                ]);
            } else {
                return response()->json([
                    "status" => "failure",
                    'message' => 'id is missing.'
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failure", 'message' => $e], 401);
        }
    }

    public function getPatientBySearch($searchNo)
    {
        if ($searchNo) {
            $patientEmployee = User::ReceptionSearchComman()
                ->Where('patient_employment.employee_no', $searchNo)
                ->ReceptionSearchSelect()
                ->get();
            $patientPrivate = User::ReceptionSearchComman()
                ->Where('users.id', $searchNo)
                ->ReceptionSearchSelect()
                ->get();
            $patient = $patientEmployee->concat($patientPrivate);
            if (count($patient) > 0) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'user fectched successfully',
                    'data' => $patient,
                ]);
            } else {
                $patient = User::ReceptionSearchComman()
                    ->where(function ($query) use ($searchNo) {
                        $searchNoLower = strtolower($searchNo);
                        $fullName = DB::raw("CONCAT(users.firstname, ' ', users.lastname)");
                        $query->orWhere('users.cnic', 'LIKE', '%' . $searchNo . '%')
                            ->orWhere('users.phone', 'LIKE', '%' . $searchNo . '%')
                            ->orWhere('users.firstname', 'LIKE', '%' . $searchNo . '%')
                            ->orWhere('users.lastname', 'LIKE', '%' . $searchNo . '%')
                            ->orWhere('patients_type.name', 'LIKE', '%' . $searchNo . '%')
                            ->orWhereRaw('LOWER(' . $fullName . ') LIKE ?', '%' . $searchNoLower . '%');
                    })->ReceptionSearchSelect()->get();
                // dd($patient->toSQL());
                if (count($patient) > 0) {
                    return response()->json([
                        'status' => 'success',
                        'message' => 'user fectched successfully',
                        'data' => $patient,
                    ]);
                } else {
                    return response()->json([
                        'status' => 'success',
                        'message' => 'user not found',
                        'data' => $patient,
                    ]);
                }
            }
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'role not found'
            ]);
        }
    }

    public function getPatientDetailById($id)
    {
        $patientList = array();
        $departmentsList = getDepartmentsList();
        $clinicalServicesList = getClinicalServicesList();
        $patient =  User::JoinWithPatient()
            ->where('users.id', $id)
            ->SelectPatientColumn()->get()->first();

        if ($patient && $patient->is_dependent == 1 && $patient->depends_on_user_id) {
            $dependentPatient = User::JoinWithPatient()
                ->where('dependents.depends_on_user_id', $patient->depends_on_user_id)
                ->SelectPatientColumn();

            $parentPatient = User::JoinWithPatient()
                ->where('users.id', $patient->depends_on_user_id)
                ->SelectPatientColumn();

            $patientList = $dependentPatient->union($parentPatient)->get();
        } elseif ($patient && $patient->is_dependent == 0) {
            $dependentPatient =  User::JoinWithPatient()
                ->where('dependents.depends_on_user_id', $patient->id)
                ->SelectPatientColumn();

            $parentPatient =  User::JoinWithPatient()
                ->where('users.id', $patient->id)
                ->SelectPatientColumn();

            $patientList = $parentPatient->union($dependentPatient)->get();
        }



        return view('patient.patient-detail', [
            'patientList' => $patientList,
            'departmentsList' => $departmentsList,
            'clinicalServicesList' => $clinicalServicesList,
        ]);
    }

    /**
     * Show the index page of doctors.
     *
     * @return \Illuminate\Http\Response
     */
    public function privateClinicPatientIndex()
    {
        return view('private-clinic.patient.index');
    }

    public function privateClinicPatientList(Request $request)
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ], 400);
        }
        getletterscount();
        $perPage = $request->input('length', 10);
        $currentPage = ($request->input('start', 0) / $perPage) + 1;
        $searchTerm = $request->input('search', '');

        $query = User::join('roles', 'users.role_id', '=', 'roles.id')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->where('roles.slug', 'patient')
            ->select('users.*', 'roles.name as role_name', 'roles.slug as role_slug')
            ->orderBy('users.firstname', 'asc');

        if (!empty($searchTerm)) {
            $searchTerm = $searchTerm['value'];
            // Check if the search term is a date in "DD-MM-YYYY" format and convert it to "YYYY-MM-DD"
            if (preg_match('/\d{2}-\d{2}-\d{4}/', $searchTerm)) {
                $dateParts = explode('-', $searchTerm);
                $searchTerm = $dateParts[2] . '-' . $dateParts[1] . '-' . $dateParts[0];
            }
            $query->where(function ($query) use ($searchTerm) {
                $query->orWhere('users.firstname', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.lastname', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.phone', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.gender', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.id', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.mobile_no', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.dob', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.address', 'LIKE', "%$searchTerm%")
                    ->orWhere('users.address_line_2', 'LIKE', "%$searchTerm%");
            });
        }

        // Get total records count
        $totalRecords = $query->count();

        // Fetch the data with pagination
        $patients = $query->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'draw' => (int) $request->input('draw', 1), // Draw counter for DataTables
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalRecords,
            'data' => $patients->items(),
        ]);
    }


    public function toggleStatus($id)
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ], 400);
        }

        try {
            $patient = User::find($id);
            if ($patient) {
                $patient->status = $patient->status === 'active' ? 'in_active' : 'active';
                $patient->save();

                return response()->json([
                    "status" => SUCCESS,
                    'message' => $patient->status === 'active' ? 'Patient activated successfully' : 'Patient deactivated successfully',
                    'newStatus' => $patient->status
                ]);
            } else {
                return response()->json([
                    "status" => FAILURE,
                    'message' => RECORD_NOT_FOUND
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => FAILURE,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Profile View.
     *
     * @return \Illuminate\Http\Response
     */

    public function profileView($patient_id)
    {
        $patients = Patients::where('user_id', $patient_id)->first();
        $contact = UserHasContact::where('patient_id', $patients->id)->first();
        // $contact = UserHasContact::where('patient_id', $patient_id)->first();
        $patient = getPatientName($patient_id);
        $gdpr = getGDPRPatient($patient_id);
        $balance = getPatientBalance($patient_id);
        $general_practitioner = null;
        $solicitor = null;
        $referral_to = null;
        $ref_doc = null;
        if ($patients) {
            if ($contact) {
                $general_practitioner = Contacts::where('id', $contact->gp_id)->value('display_name');
                $referral_to = Contacts::where('id', $contact->ref_to)->value('display_name');
                $solicitor = Contacts::where('id', $contact->solicitor_id)->value('display_name');
                $ref_doc = Contacts::where('id', $contact->ref_by)->value('display_name');
            }
            $external_hospital_1 = $patient && $patient->externalhospital
                ? ExternalHospitals::where('id', $patient->externalhospital)->value('name')
                : null;
            $external_hospital_2 = $patient && $patient->externalhospital_1
                ? ExternalHospitals::where('id', $patient->externalhospital_1)->value('name')
                : null;
            $external_hospital_3 = $patient && $patient->externalhospital_2
                ? ExternalHospitals::where('id', $patient->externalhospital_2)->value('name')
                : null;
            $external_hospital_4 = $patient && $patient->externalhospital_3
                ? ExternalHospitals::where('id', $patient->externalhospital_3)->value('name')
                : null;
            $insurance_company = $patient && $patient->insurance_company
                ? InsuranceCompany::where('id', $patient->insurance_company)->value('name')
                : null;
            $insurance_company_plan = $patient && $patient->insurance_company_plan
                ? InsurancePlan::where('id', $patient->insurance_company_plan)->value('name')
                : null;
            $patient->general_practitioner = $general_practitioner;
            $patient->referral_to = $referral_to;
            $patient->solicitor = $solicitor;
            $patient->ref_doc = $ref_doc;
            $patient->external_hospital = $external_hospital_1;
            $patient->externalhospital_1 = $external_hospital_2;
            $patient->externalhospital_2 = $external_hospital_3;
            $patient->externalhospital_3 = $external_hospital_4;
            $patient->insurance_company = $insurance_company ? $insurance_company : '';
            $patient->insurance_company_plan = $insurance_company_plan ? $insurance_company_plan : '';
            return view('private-clinic.patient.profile', [
                'patient' => $patient,
                'balance' => $balance,
                'gdpr' => $gdpr
            ]);
        } else {
            return response()->json([
                "status" => FAILURE,
                'message' => CREATED_RECORD_FAILURE
            ]);
        }
    }


    /**
     * Display patient visit and add Prescription.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPatientHistory($id)
    {
        $pageConfigs = ['blankPage' => false];
        if (!Auth::user() && !Auth::user()->hms_id && !Auth::user()->branch_id && $id) {
            return redirect()->back();
        }
        $patientVisit =  PatientVisit::JoinWithPatientVisit()
            ->SelectPatientVisitColumn()
            ->UserId($id)->OPD()->NotEqualStatus('incomplete')->orderByDesc('created_at')->get();

        if ($patientVisit) {
            $clinical_service_id = $patientVisit[0]->clinical_service_type_id;
        }

        $patientIdentity = User::PatientInfoById($id)->get()->first();
        if (!isset($patientIdentity)) {
            return redirect()->back()->with('message', 'Record added successfully!');
        }

        $medicines = Medicine::JoinWithInventory($clinical_service_id)->SelectMedicineColumn()->get();
        $lpMedicines = Medicine::NotInInventory()->get();
        $medicines->merge($lpMedicines);
        $medicines = collect($medicines);
        $lpMedicines = collect($lpMedicines);

        $mergedMedicines = $medicines->merge($lpMedicines);

        $radiologyInvestigation = getInvestigationList('radiology', $patientIdentity->patient_type_id);
        $pathiologyInvestigation = getInvestigationList('pathiology', $patientIdentity->patient_type_id);
        $procedures = getProcedureList($patientIdentity->patient_type_id);

        return view('doctor-desk.opd.history', ['pageConfigs' => $pageConfigs])->with([
            'patientVisit' => $patientVisit,
            'patientIdentity' => $patientIdentity,
            'medicines' => $mergedMedicines,
            'radiologyInvestigation' => $radiologyInvestigation,
            'pathiologyInvestigation' => $pathiologyInvestigation,
            'procedures' => $procedures,
        ]);
    }
    public function patientSummary($patient_id)
    {
        $pageConfigs = ['blankPage' => false];
        if (!Auth::user() || !Auth::user()->hms_id || !Auth::user()->branch_id) {
            return redirect()->back();
        }
        $patient = getPatientName($patient_id);
        $gdpr = getGDPRPatient($patient_id);
        $balance = getPatientBalance($patient_id);
        $document = ScannedDocument::where('patient_id', $patient_id)->get();
        $appointments = Appointment::where('patient_user_id', $patient_id)->get();
        // $forms = Forms::where('patient_id', $patient_id)->get();
        // $letters = PatientLettersModel::where('patient_id', $patient_id)->get();
        $prescriptions = Prescription::join('medicines', 'medicines.id', '=', 'private_clinic_prescriptions.medicine_id')
            ->where('private_clinic_prescriptions.patient_id', $patient_id)
            ->prescriptionByHmsId()
            ->select('private_clinic_prescriptions.follow_up_date', 'medicines.generic_name', 'private_clinic_prescriptions.frequency', 'private_clinic_prescriptions.duration', 'private_clinic_prescriptions.created_at')
            ->get();
        // Combine all data into a single array
        $allData = compact('document', 'appointments', 'forms', 'letters', 'prescriptions');
        return view('private-clinic.patient.summary', compact('pageConfigs', 'patient', 'allData', 'balance', 'gdpr'));
    }

    public function patientmrnupdate(Request $request, $patient_id)
    {

        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => "failure",
                "message" => 'Please login again.',
            ], 400);
        }
        try {
            DB::beginTransaction();
            $user = User::find($patient_id);
            $user->update([
                'externalhospital' => $request->externalhospital,
                'externalhospital_1' => $request->externalhospital_1,
                'externalhospital_2' => $request->externalhospital_2,
                'externalhospital_3' => $request->externalhospital_3,
                'mrn_no' => $request->mrn_no,
                'mrn_no1' => $request->mrn_no1,
                'mrn_no2' => $request->mrn_no2,
                'mrn_no3' => $request->mrn_no3,

            ]);
            DB::commit();
            return response()->json([
                "status" => "success",
                'message' => "MRNS Updated Successfully\nPatient ID : " . $user->id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failure", 'message' => $e], 401);
        }
    }
    public function store(Request $request)
    {


        $hms_id = Auth::user()->hms_id;
        if (!Auth::user() || !$hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ], 400);
        }
        $request['hms_id'] = $hms_id;
        try {
            DB::beginTransaction();
            $branch = Contacts::create($request->all());
            if ($branch) {
                DB::commit();
                return response()->json([
                    "status" => SUCCESS,
                    'message' => CREATED_RECORD_SUCCESS
                ]);
            } else {
                DB::rollBack();
                return response()->json([
                    "status" => FAILURE,
                    'message' => CREATED_RECORD_FAILURE
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                "status" => FAILURE,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getPatientDetailReport($patient_id, $patienthistory, $appointment, $accounts, $prescriptions)
    {

        $pageConfigs = ['blankPage' => false];
        $patients = Patients::where('user_id', $patient_id)->first();
        $contact = UserHasContact::where('patient_id', $patient_id)->first();
        $patient = getPatientName($patient_id);
        $gdpr = getGDPRPatient($patient_id);
        $balance = getPatientBalance($patient_id);
        $general_practitioner = [];
        $solicitor = [];
        $referral_to = [];
        $ref_doc = [];
        $patientinvoice = [];
        $patientmedicalmodel = [];
        $patientappointment = [];
        $prescription = [];
        if ($patients) {
            if ($contact) {
                $referral_to = optional(Contacts::where('id', $contact->ref_to)->first())->toArray() ?? [];
                $solicitor = optional(Contacts::where('id', $contact->solicitor_id)->first())->toArray() ?? [];
                $ref_doc = optional(Contacts::where('id', $contact->ref_by)->first())->toArray() ?? [];
                $general_practitioner = optional(Contacts::where('id', $contact->gp_id)->first())->toArray() ?? [];
            }
            $external_hospital_1 = ExternalHospitals::where('id', $patient->externalhospital)->value('name');
            $external_hospital_2 = ExternalHospitals::where('id', $patient->externalhospital_1)->value('name');
            $external_hospital_3 = ExternalHospitals::where('id', $patient->externalhospital_2)->value('name');
            $external_hospital_4 = ExternalHospitals::where('id', $patient->externalhospital_3)->value('name');

            $insurance_company = InsuranceCompany::where('id', $patient->insurance_company)->value('name');
            $insurance_company_plan = InsurancePlan::where('id', $patient->insurance_company_plan)->value('name');
            $patient->referral_to = $referral_to;
            $patient->solicitor = $solicitor;
            $patient->ref_doc = $ref_doc;
            $patient->external_hospital = $external_hospital_1;
            $patient->externalhospital_1 = $external_hospital_2;
            $patient->externalhospital_2 = $external_hospital_3;
            $patient->externalhospital_3 = $external_hospital_4;
            $patient->insurance_company = $insurance_company ? $insurance_company : '';
            $patient->insurance_company_plan = $insurance_company_plan ? $insurance_company_plan : '';
            $patientinvoice = PatientAccountsModel::where('patient_id', $patient_id)->get() ?? collect();
            $patientmedicalmodel = PatientMedicalModel::where('patient_id', $patient_id)->get() ?? collect();
            $patientappointment = PatientAppointmentModel::select(
                'appointment.created_at',
                'appointment.type',
                'appointment.status',
                'appointment.title',
                'appointment.description',
                'branch.name as branch_name'
            )
                ->join('branch', 'appointment.branch_id', '=', 'branch.id')
                ->where('appointment.patient_user_id', $patient_id)
                ->get() ?? collect();

            $prescription = Prescription::select(
                'private_clinic_prescriptions.created_at',
                'prescription_has_medicine.frequency',
                'prescription_has_medicine.duration',
                'medicines.drug_name as medicine_name' // assuming you want to include medicine name as well
            )
                ->join('prescription_has_medicine', 'private_clinic_prescriptions.id', '=', 'prescription_has_medicine.prescription_id')
                ->join('medicines', 'medicines.id', '=', 'prescription_has_medicine.medicine_id')
                ->where('private_clinic_prescriptions.patient_id', $patient_id)->get() ?? collect();
        }
        return view('private-clinic.patient.patient-report', compact(
            'pageConfigs',
            'patient',
            'patientinvoice',
            'patientmedicalmodel',
            'patientappointment',
            'patienthistory',
            'appointment',
            'accounts',
            'prescription',
            'general_practitioner',
            'solicitor',
            'ref_doc',
            'patienthistory',
            'prescriptions',

        ));
    }
}
