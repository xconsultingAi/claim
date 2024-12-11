<?php

namespace App\Http\Controllers;

use App\Helpers\UploadAttachments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\EmployeeController;
use App\Models\User;
use App\Models\Role;
use App\Models\Doctors;
use App\Models\DoctorType;
use App\Models\Employees;
use App\Models\Branch;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role as ModelsRole;
use Carbon\Carbon;
use Psy\Readline\Hoa\Console;

class DriverController extends Controller
{
    public function index()
    {
        return view('driver.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $statuses = getPatientStatusList();
        return view('driver.create', [
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

     
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => 'Please login again.',
            ], 400);
        }
      
     
        try {
            DB::beginTransaction();
            $roles= Role::where('hms_id', Auth::user()->hms_id)
            ->where('slug', 'driver')
            ->pluck('id')
            ->first();

            $request->merge([
                'password' => Hash::make($request->password) // Hash the password before storing
            ]);
            $request->merge([
                'hms_id' => Auth::user()->hms_id,
                'branch_id' => Auth::user()->id,
            ]);
         
            $createUser = User::create([
                'hms_id' => $request->hms_id,
                'branch_id' => $request->branch_id,
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'mobile_no' => $request->mobile_no,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'contact_person' => $request->contact_person,
                'role_id' => $roles,

            ]);
           
            if (!$createUser->id) {
                DB::rollBack();
                return response()->json($createUser);
            }

          
            DB::commit();
            return response()->json([
                "status" => SUCCESS,
                'message' => 'New Driver has been created successful'
            ]);
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $statuses = getPatientStatusList();
        $branch = User::find($id);
        return view('driver.edit', [
            'statuses' => $statuses,
            'branch' => $branch,
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
    
        $validator = Validator::make($request->all(), [
            "id" => "required",
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
        ]);
       
       
        if ($validator->fails()) {
            return response()->json([
                "status" => FAILURE,
                "message" => $validator->errors(),
            ], 400);
        }

        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => 'Please login again.',
            ], 400);
        }

        try {
            DB::beginTransaction();
            $user = driver::find($request->id);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'mobile_no' => $request->mobile_no,
                'cnic' => $request->cnic,
                'address' => $request->address,
                'contact_person' => $request->contact_person,
              
            ]);
            if (!$user->id) {
                DB::rollBack();
                return response()->json($user);
            }
            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => 'Driver has been updated successful'
                ],
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }

        try {
            DB::beginTransaction();
            if ($id) {
                $branch = driver::find($id);
                $branch->save();
                $branch->delete();
                if ($branch) {
                    DB::commit();
                    return response()->json([
                        "status" => SUCCESS,
                        'message' => DELETE_RECORD_SUCCESS
                    ]);
                }else{
                    DB::rollBack();
                    return response()->json([
                        "status" => FAILURE,
                        'message' => DELETE_RECORD_FAILURE
                    ]);
                }

            } else {
                return response()->json([
                    "status" => FAILURE,
                    'message' => RECORD_NOT_FOUND
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

    public function getdriverList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        $branch = User::where('users.role_id', 5)
    ->join('users as company', function ($join) {
        $join->on('users.branch_id', '=', 'company.id')
            ->where('company.role_id', 24);
    })
    ->select('users.*', 'company.name as companyname') // Adjust as needed
    ->get();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
        ]);
    }
    
}
