<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        // $this->middleware('permission:roles_read|roles_write|roles_create|roles_delete', ['only' => ['index','store','getpermissionsList']]);
        // $this->middleware('permission:roles_create', ['only' => ['create','store']]);
        // $this->middleware('permission:roles_write', ['only' => ['edit','update']]);
        // $this->middleware('permission:roles_delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pageConfigs = ['pageHeader' => false,];
        return view('permissions.index', ['pageConfigs' => $pageConfigs]);
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
     * @param  \Illuminate\Http\PermissionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionRequest $request)
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
            $permission = Permission::create(['name' => $request->input('name')]);
            if ($permission) {
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
            Log::debug($e);
            return response()->json([
                "status" => FAILURE,
                'message' => $e->getMessage()
            ]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\PermissionRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PermissionRequest $request, $id)
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
            $permission = Permission::where('id', $id)->update(['name' => $request->input('name')]);
            if ($permission) {
                DB::commit();
                return response()->json([
                    "status" => SUCCESS,
                    'message' => UPDATE_RECORD_SUCCESS
                ]);
            } else {
                DB::rollBack();
                return response()->json([
                    "status" => FAILURE,
                    'message' => UPDATE_RECORD_FAILURE
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::debug($e);
            return response()->json([
                "status" => FAILURE,
                'message' => $e->getMessage()
            ]);
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
                $permission = Permission::where('id',$id)->delete();
                if ($permission) {
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

    public function getpermissionsList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }

        // Get all permissions along with their associated roles
        $permissionsWithRoles = Permission::with('roles')->get();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $permissionsWithRoles,
        ]);
    }
}
