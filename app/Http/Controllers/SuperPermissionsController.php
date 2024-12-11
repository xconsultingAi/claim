<?php

namespace App\Http\Controllers;

use App\Models\SuperPermissionsModel;
use Illuminate\Http\Request;
use App\Http\Requests\SuperPermissionsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SuperPermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('hms-settings.has_super_permissions.index');
    }

    public function getpermissionList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }

        $permission = SuperPermissionsModel::all();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $permission,
        ]);
    }

    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SuperPermissionsModel  $superPermissionsModel
     * @return \Illuminate\Http\Response
     */
    public function show(SuperPermissionsModel $superPermissionsModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SuperPermissionsModel  $superPermissionsModel
     * @return \Illuminate\Http\Response
     */
    public function edit(SuperPermissionsModel $superPermissionsModel)
    {
        //
    }
    
    public function checkExistingValue($value)
    {
        //dd($value);
        //$value = $request->input('permissionId');
        $hmsId = Auth::user()->hms_id;
        // Perform the database query
        $exists = DB::table('hms_has_permission')
            ->where('hms_id', $hmsId)
            ->where('permissions_id', $value)
            ->count();

        return response()->json(['exists' => $exists]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SuperPermissionsModel  $superPermissionsModel
     * @return \Illuminate\Http\Response
     */
    public function update(SuperPermissionsRequest $request, SuperPermissionsModel $superPermissionsModel, $id)
    {
        
        $hms_id = Auth::user()->hms_id;
        if (!Auth::user() || !$hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        try {
            DB::beginTransaction();

            $permissionId = $request->input('permissionId');
            $hmsId =  Auth::user()->hms_id;
            

            $existingRecord = DB::table('hms_has_permission')
                ->where('hms_id', $hmsId)
                ->where('permissions_id', $permissionId)
                ->exists();

            if ($existingRecord) {
                DB::rollBack();
                return response()->json([
                    "status" => FAILURE,
                    'message' => 'Permission already exists for Super Admin',
                ]);
            }

            $inserted = DB::table('hms_has_permission')->insert([
                'hms_id' => $hmsId,
                'permissions_id' => $permissionId,
            ]);

            if ($inserted) {
                DB::commit();
                return response()->json([
                    "status" => SUCCESS,
                    'message' => 'Record inserted successfully',
                ]);
            } else {
                DB::rollBack();
                return response()->json([
                    "status" => FAILURE,
                    'message' => 'Failed to insert record',
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::debug($e);
            return response()->json([
                "status" => FAILURE,
                'message' => $permissionId ." " . $e->getMessage()
            ]);
        }
    }

  

    public function disable (SuperPermissionsRequest $request, SuperPermissionsModel $superPermissionsModel, $id)
    {
        
        $hms_id = Auth::user()->hms_id;
        if (!Auth::user() || !$hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        try {
            DB::beginTransaction();

            $hmsId =  Auth::user()->hms_id;

            $removed = DB::table('hms_has_permission')
                ->where('hms_id', $hmsId)
                ->where('permissions_id', $id)
                ->delete();


            if ($removed) {
                DB::commit();
                return response()->json([
                    "status" => SUCCESS,
                    'message' => 'Permission Disabled successfully',
                ]);
            } else {
                DB::rollBack();
                return response()->json([
                    "status" => FAILURE,
                    'message' => 'Failed to Disabled Permission',
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::debug($e);
            return response()->json([
                "status" => FAILURE,
                'message' => $id ." " . $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SuperPermissionsModel  $superPermissionsModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(SuperPermissionsModel $superPermissionsModel)
    {
        //
    }
}
