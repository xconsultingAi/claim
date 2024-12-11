<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    public function index()
    {
        return view('location.index');
    }
    public function getlocationList($latitude,$longitude)
    {
        $radius = 2000; 
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        // $branch = User::join('roles', 'users.role_id', '=', 'roles.id')
        // ->where('slug', 'shop')
        // ->select('users.*')
        // ->get();


        $branch = User::join('roles', 'users.role_id', '=', 'roles.id')
                ->where('roles.slug', 'shop')
                ->select('users.*', DB::raw(
                    "( 6371 * acos( cos( radians($latitude) ) * cos( radians(users.latitude) ) * cos( radians(users.longitude) - radians($longitude) ) + sin( radians($latitude) ) * sin( radians(users.latitude) ) ) ) AS distance"
                ))
                ->having('distance', '<=', $radius)
                ->orderBy('distance', 'asc')
                ->get();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
        ]);
    }

}
