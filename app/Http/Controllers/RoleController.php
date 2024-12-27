<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\{
    User,
    Permissions AS CustomerPermissionModel
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        // $this->middleware('permission:roles_read|roles_write|roles_create|roles_delete', ['only' => ['index','store','getRolesList','getUsersList']]);
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

        $roles = Role::withCount('users')
            ->where('roles.hms_id', Auth::user()->hms_id)->get();
        $pageConfigs = ['pageHeader' => false,];
        return view('roles.index', [
            'roles' => $roles,
            'pageConfigs' => $pageConfigs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permissions = CustomerPermissionModel::join('hms_has_permission', 'hms_has_permission.permissions_id', '=', 'permissions.id')
            ->where('hms_has_permission.hms_id', Auth::user()->hms_id)
            ->pluck('permissions.name as name','permissions.id as id');
            
        //$permissions = Permission::get()->pluck('name', 'id');
        $view = view('roles/_modals/create-permission', compact('permissions'));
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $view->render(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\RoleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $hms_id = Auth::user()->hms_id;
        $branch_id = Auth::user()->branch_id;
        if (!Auth::user() || !$hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }

        try {
            DB::beginTransaction();
            $role = Role::create([
                'name' => $request->input('name'),
                'slug' => Str::slug($request->input('name')),
                'hms_id' => $hms_id,
                'branch_id' =>$branch_id
            ]);

            
            if ($role->syncPermissions($request->input('permissions'))) {
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
        $role = Role::find($id);
        // $permissions = CustomerPermissionModel::join('hms_has_permission','hms_has_permission.permissions_id', '=', 'permissions.id')
        //     ->where('hms_has_permission.hms_id', Auth::user()->hms_id)
        //     ->get()->pluck('permissions.name', 'permissions.id');
        $permissions = CustomerPermissionModel::join('hms_has_permission', 'hms_has_permission.permissions_id', '=', 'permissions.id')
            ->where('hms_has_permission.hms_id', Auth::user()->hms_id)
            ->pluck('permissions.name as name','permissions.id as id');
        //$permissions = Permission::get()->pluck('name', 'id');
        $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
            ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
            ->all();
        $view = view('roles/_modals/create-permission', compact('role','permissions','rolePermissions'));
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $view->render(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\RoleRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $id)
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
            $role = Role::findById($id);
            $role->name = $request->input('name');
            $role->save();
            $role->syncPermissions($request->input('permissions'));
            if ($role) {
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
                $role = Role::where('id',$id)->delete();
                if ($role) {
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

    public function getUsersList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }

        $usersWithRoles = User::where('hms_id', Auth::user()->hms_id)
            ->select('id', 'email', 'name', 'username')
            ->with('roles:id,name')->get()->toArray();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $usersWithRoles,
        ]);
    }
}
