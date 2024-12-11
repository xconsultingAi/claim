<?php

namespace App\Http\Controllers;
use App\Models\vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class VehicleController extends Controller
{
    public function index()
    {
        
        return view('vehicle.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $getTitleList = User::where('role_id', 24)->pluck('name', 'id')->all();
   
        return view('vehicle.create', [
            'getTitleList' => $getTitleList,
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
        $validator = Validator::make($request->all(), [
            "companyId" => "required",
            "vehicle_name" => "required|vehicle_name",
            "vehicle_model" => "vehicle_model",
            "number_plate" => "number_plate",
        ]);
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => 'Please login again.',
            ], 400);
        }
     
        try {
            DB::beginTransaction();
            $createUser = vehicle::create([
                'companyId' => $request->companyId,
                'vehicle_name' => $request->vehicle_name,
                'vehicle_model' => $request->vehicle_model,
                'number_plate' => $request->number_plate,

            ]);
            if (!$createUser->id) {
                DB::rollBack();
                return response()->json($createUser);
            }

          
            DB::commit();
            return response()->json([
                "status" => SUCCESS,
                'message' => 'New doctor has been created successful'
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
        $getTitleList = User::where('role_id', 24)->pluck('name', 'id')->all();
        $branch = vehicle::find($id);
        return view('vehicle.edit', [
            'getTitleList' => $getTitleList,
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
            "companyId" => "required",
            "vehicle_name" => "required",
            "vehicle_model" => "required",
            "number_plate" => "required",
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
            $user = vehicle::find($request->id);
            
            $user->update([
                'companyId' => $request->companyId,
                'vehicle_name' => $request->vehicle_name,
                'vehicle_model' => $request->vehicle_model,
                'number_plate' => $request->number_plate,
              
            ]);
            if (!$user->id) {
                DB::rollBack();
                return response()->json($user);
            }
            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => 'User has been updated successful'
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
                $branch = vehicle::find($id);
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
    public function getvehicleList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        $branch = Vehicle::join('users', 'vehicles.companyId', '=', 'users.id')
        ->get(['vehicles.*', 'users.name as company_name']);

        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
        ]);
    }

}
