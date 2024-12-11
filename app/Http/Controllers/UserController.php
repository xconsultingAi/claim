<?php

namespace App\Http\Controllers;

use App\Helpers\Upload;
use App\Helpers\UploadAttachments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ReceptionistController;
use App\Http\Controllers\PharmacistController;
use App\Models\User;
use App\Models\Patients;
use App\Models\Role;
use App\Models\Dependents;
use App\Models\Doctors;
use App\Models\Employees;
use App\Models\Pharmacists;
use App\Models\Receptionists;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role as ModelsRole;
use Carbon\Carbon;


class UserController extends Controller
{
    protected $path = 'cghlahore/Images/';


    // register used for hospital
    public function addUser()
    {
        $pageConfigs = ['blankPage' => true];
        $maritalStatus = getMaterialstatusList();
        $roles = array();
        $hmsList = getHmsList();
        //$branches = getBranchesList();
        $roles = Role::where('hms_id', Auth::user()->hms_id)->get()->toArray();
        return view('/user/add-user', ['pageConfigs' => $pageConfigs])->with([
            'roles' => $roles,
            'hmsList' => $hmsList,
            'maritalStatus' => $maritalStatus
            // 'branches' => $branches,
            // 'userInfo' => $userInfo
        ]);
    }

    public function createPcmUser()
    {
        $pageConfigs = ['blankPage' => false];
        $maritalStatus = getMaterialstatusList();
        $roles = array();
        $hmsList = getHmsList();
        $employeerelation = getEmployeerelationList();

        $contacts = getContactList();
        //$branches = getBranchesList();
        $roles = Role::where('hms_id', Auth::user()->hms_id)->get()->toArray();
        return view('/private-clinic/user/create', ['pageConfigs' => $pageConfigs])->with([
            'roles' => $roles,
            'hmsList' => $hmsList,
            'maritalStatus' => $maritalStatus,
            'employeerelation' => $employeerelation,
            'pageConfigs' => $pageConfigs,
            // 'userInfo' => $userInfo
        ]);
    }

    public function create(Request $request)
    {
        $date = $request->dob;
        $carbonDate = Carbon::parse($date);
        $formattedDate = $carbonDate->format('Y-m-d');
        $request->merge([
            'password' => Hash::make($request->password) // Hash the password before storing
        ]);

        try {
            DB::beginTransaction();
            $role = Role::where('id', $request->role_id)->get();
            if (!$role) {
                return response()->json([
                    "status" => FAILURE,
                    "message" => 'role not found.',
                ], 400);
            }

            $imageUrl = '';
            if ($request->hasFile('profile_image')) {
                $imageUrl = UploadAttachments::uploadAttachments($request, $this->path, 'profile_image');
            }

            $roleName = $role[0]->name;
            $createUser = User::create([
                'hms_id' => $request->hms_id,
                'branch_id' => $request->branch_id,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'father_husband' => $request->father_husband,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'role_id' => $request->role_id,
                'profile_image' => $imageUrl,
                'gender' => $request->gender,
                'dob' => $formattedDate,
                'status' => $request->status,
                'is_super' => $request->is_super,
                'is_employee' => $request->is_employee,
                'is_dependent' => $request->is_dependent,
                'er_firstname' => $request->er_firstname,
                'er_lastname' => $request->er_lastname,
                'er_email' => $request->er_email,
                'er_phone' => $request->er_phone,
                'er_cnic' => $request->er_cnic,
                'er_address' => $request->er_address,
                'er_mobile' => $request->er_mobile,
                'er_address_1' => $request->er_address_1,
                'er_address_2' => $request->er_address_2,
                'er_address_3' => $request->er_address_3,
                'er_relationship' => $request->er_relationship,
            ]);
            $createUser->assignRole($roleName);

            DB::commit();
            return response()->json([
                "status" => "success",
                'message' => 'New user ' . $createUser->name . ' has been created successful'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                "status" => FAILURE,
                'message' => $e->getMessage()
            ]);
        }
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

        try {
            DB::beginTransaction();
            $user = User::find($request->id);
            $role = Role::find($user->role_id);
            $newRole = Role::find($request->role_id);
            $newRoleName = $newRole->name;
            if (!$role) {
                return response()->json([
                    "status" => FAILURE,
                    "message" => 'role not found.',
                ], 400);
            }

            $roleName = $role->name;
            $user->removeRole($roleName);
            if ($request->password != $user->password) {
                $request->merge([
                    'hms_id' => Auth::user()->hms_id,
                    'branch_id' => Auth::user()->branch_id,
                    'password' => Hash::make($request->password) // Hash the password before storing
                ]);
            }
            $imageUrl = '';
            if ($request->hasFile('profile_image')) {
                $imageUrl = UploadAttachments::uploadAttachments($request, $this->path, 'profile_image');
            }
            $user->assignRole($newRoleName);
            $user->save();
            $user = $user->update([
                'hms_id' => $request->hms_id,
                'branch_id' => $request->branch_id,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'father_husband' => $request->father_husband,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'role_id' => $request->role_id,
                'profile_image' => $imageUrl ? $imageUrl : $user->profile_image,
                'gender' => $request->gender,
                'dob' =>  $formattedDate,
                'status' => $request->status,
                'is_super' => $request->is_super,
                'is_employee' => $request->is_employee,
                'is_dependent' => $request->is_dependent,
                'er_firstname' => $request->er_firstname,
                'er_lastname' => $request->er_lastname,
                'er_email' => $request->er_email,
                'er_phone' => $request->er_phone,
                'er_cnic' => $request->er_cnic,
                'er_address' => $request->er_address,
                'er_mobile' => $request->er_mobile,
                'er_address_1' => $request->er_address_1,
                'er_address_2' => $request->er_address_2,
                'er_address_3' => $request->er_address_3,
                'er_relationship' => $request->er_relationship,
            ]);

            DB::commit();
            return response()->json([
                "status" => "success",
                'message' => 'User has been updated successful'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "failure", 'message' => $e], 401);
        }
    }

    public function userList()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/user/user-list', ['pageConfigs' => $pageConfigs]);
    }

    public function pcmUserIndex()
    {
        $pageConfigs = ['pageHeader' => false];
        return view('/private-clinic/user/index', ['pageConfigs' => $pageConfigs]);
    }

    public function getUserList()
    {
        $users = User::Join('roles', 'users.role_id', '=', 'roles.id')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->select(
                'users.*',
                'roles.name as role_name',
                'roles.slug as role_slug'
            )->get();
        if ($users) {
            return response()->json([
                'status' => 'success',
                'message' => 'user fectched successfully',
                'data' => $users->toArray(),

            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'user not found'
            ]);
        }
    }

    //role based insertion and updation from add-user screen
    public function roleRelatedEntries($request)
    {
        $role = Role::find($request->role_id)->toArray();
        if ($role && $role['slug']) {
            switch ($role['slug']) {
                case "patient":
                    $patientController = new PatientController();
                    if ($request->patient_id != '' && $request->patient_id != null) {
                        $response = $patientController->updatePatient($request);
                    } else {
                        $response = $patientController->createPatient($request);
                    }

                    break;
                case "doctor":
                    $doctorController = new DoctorController();
                    if ($request->doctor_id != '' && $request->doctor_id != null) {
                        $response = $doctorController->updateDoctor($request);
                    } else {
                        $response = $doctorController->createDoctor($request);
                    }
                    break;
                case "receptionist":
                    $receptionistController = new ReceptionistController();
                    if ($request->receptionist_id != '' && $request->receptionist_id != null) {
                        $response = $receptionistController->updateReceptionist($request);
                    } else {
                        $response = $receptionistController->create($request);
                    }
                    break;
                case "pharmacist":
                    $pharmacistController = new PharmacistController();
                    if ($request->pharmacist_id != '' && $request->pharmacist_id != null) {
                        $response = $pharmacistController->updatePharmacist($request);
                    } else {
                        $response = $pharmacistController->create($request);
                    }
                    break;
                default:
                    $response = array('status' => 'success', 'message' => 'default case');
            }
            return $response;
        } else {
            return array('status' => 'failure', 'message' => 'role not found');
        }
    }

    public function getUserById(Request $request)
    {
        if ($request->id) {
            $result = $this->getUserRelatedInfo($request->id);
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

    public function getUserRelatedInfo($id)
    {
        try {
            $user = User::where('id', $id)->first();
            $user = $user ? $user->toArray() : array();
            if (count($user) > 0 && $user['role_id']) {
                $role = Role::find($user['role_id'])->toArray();
                if ($role && $role['slug']) {
                    switch ($role['slug']) {
                        case "patient":
                            //$patientController = new PatientController();
                            $patient = Patients::where('user_id', $id)->first();
                            $user['patient'] = $patient ? $patient->toArray() : array();
                            break;
                        case "doctor":
                            //$doctorController = new DoctorController();
                            $doctor = Doctors::where('user_id', $id)->first();
                            $user['doctor'] = $doctor ? $doctor->toArray() : array();
                            break;
                        case "receptionist":
                            //$receptionistController = new ReceptionistController();
                            $receptionist = Receptionists::where('user_id', $id)->first();
                            $user['receptionist'] = $receptionist ? $receptionist->toArray() : array();
                            break;
                        case "pharmacist":
                            //$pharmacistController = new PharmacistController();
                            $pharmacist = Pharmacists::where('user_id', $id)->first();
                            $user['pharmacist'] = $pharmacist ? $pharmacist->toArray() : array();
                            break;
                        default:
                            $user['default'] = array();
                    }
                }

                $user['employee'] = array();
                if ($user['is_employee'] == 1) {
                    //$employeeController = new EmployeeController();
                    $employee = Employees::where('user_id', $id)->first();
                    $user['employee'] = $employee ? $employee->toArray() : array();
                }

                $user['dependent'] = array();
                if ($user['is_dependent'] == 1) {
                    //$dependentController = new DependentController();
                    $dependent = Dependents::where('user_id', $id)->first();
                    $user['dependent'] = $dependent ? $dependent->toArray() : array();
                }

                $user['role'] = $role;
                return array("status" => "success", 'user' => $user);
            } else {
                return array("status" => "failure", 'message' => 'user not found');
            }
        } catch (\Exception $e) {
            return array("status" => "failure", 'message' => $e);
        }
    }

    public function createUser(Request $request)
    {
        $request->merge([
            'hms_id' => Auth::user()->hms_id,
            'branch_id' => Auth::user()->branch_id,
        ]);
        $password = Hash::make($request->all());
        $createUser = User::create([
            'hms_id' => Auth::user()->hms_id,
            'branch_id' => Auth::user()->branch_id,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'father_husband' => $request->father_husband,
            'email' => $request->email,
            'password' => $password,
            'phone' => $request->phone,
            'cnic' => $request->cnic,
            'address' => $request->address,
            'role_id' => $request->role_id,
            'profile_image' => $request->profile_image,
            'gender' => $request->gender,
            'dob' =>  $request->dob,
            'status' => $request->status,
            'is_super' => $request->is_super,
            'is_employee' => $request->is_employee,
            'is_dependent' => $request->is_dependent,
            'er_firstname' => $request->er_firstname,
            'er_lastname' => $request->er_lastname,
            'er_email' => $request->er_email,
            'er_phone' => $request->er_phone,
            'er_cnic' => $request->er_cnic,
            'er_address' => $request->er_address,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
        if ($createUser->id) {
            return array(
                'status' => 'success',
                'message' => 'Record has been created successful',
                'user_id' => $createUser->id,
            );
        }
        return array("status" => "failure", 'message' => 'something_went_wrong');
    }

    public function updateUser(Request $request)
    {
        $request->merge([
            'hms_id' => Auth::user()->hms_id,
            'branch_id' => Auth::user()->branch_id,
        ]);
        $user = User::find($request->id);
        $user = $user->update($request->all());
        if ($user->id) {
            return array(
                'status' => 'success',
                'message' => 'Record has been created successful'
            );
        }
        return array("status" => "failure", 'message' => 'something_went_wrong');
    }

    //System allow these users to add dependents.
    public function dependentAllowedUsers()
    {
        $dependentAllowedUsers =  User::Join('role', 'users.role_id', '=', 'role.id')
            ->Join('patients', 'users.id', '=', 'patients.user_id')
            ->Join('patients_type', 'patients.patient_type_id', '=', 'patients_type.id')
            ->where('role.slug', 'patient')
            ->where('patients_type.can_have_dependent', 1)
            ->where('users.is_dependent', 0)
            ->where('users.status', 'active')
            ->where('users.hms_id', Auth::user()->hms_id)
            ->select('users.id', 'users.firstname', 'users.lastname', 'users.cnic', 'patients_type.verification_required')
            ->get();
        return $dependentAllowedUsers;
    }


    public function delete($id)
    {
        try {
            if ($id) {
                DB::beginTransaction();
                $user = User::find($id);
                $user->doctor ? $user->doctor->delete() : '';
                $user->employee ? $user->employee->delete() : '';
                $user->receptionist ? $user->receptionist->delete() : '';
                $user->pharmacist ? $user->pharmacist->delete() : '';
                $user->dependent ? $user->dependent->delete() : '';
                $user->patient ? $user->patient->delete() : '';
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
                    "status" => SUCCESS,
                    'message' => DELETE_RECORD_SUCCESS
                ]);
            } else {
                return response()->json([
                    "status" => FAILURE,
                    'message' => 'id is missing'
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }
    }

    public function userCountDetail()
    {
        $usersCountDetail = array();
        $roles = Role::where('hms_id', Auth::user()->hms_id)
            ->where('branch_id', Auth::user()->branch_id)
            ->where('status', 'active')->first();

        if ($roles && $roles->id) {
            $usersCountDetail['totalUser'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)->count();

            $usersCountDetail['pendingUser'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('status', 'pending')->count();

            $usersCountDetail['activeUser'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('status', 'active')->count();

            $usersCountDetail['inActiveUser'] = User::where('hms_id', Auth::user()->hms_id)
                ->where('branch_id', Auth::user()->branch_id)
                ->where('status', 'in_active')->count();

            return response()->json([
                'status' => 'success',
                'usersCountDetail' => $usersCountDetail
            ]);
        } else {
            return response()->json([
                'status' => 'empty',
                'message' => 'role not found'
            ]);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::find($id);
            if ($user->id) {
                $user->status = 'in_active';
                $user->save();
            } else {
                return array(
                    'status' => 'failure',
                    'message' => 'Record not found'
                );
            }

            if ($user->id) {
                return array(
                    'status' => 'success',
                    'message' => 'Record has been in_active successful'
                );
            }
        } catch (\Exception $e) {
            return array("status" => "failure", 'message' => $e->getMessage());
        }
    }
}
