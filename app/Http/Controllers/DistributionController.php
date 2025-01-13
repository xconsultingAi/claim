<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Claim;
use App\Models\Role;
use App\Models\User;
use App\Models\Shop;
use Illuminate\Support\Facades\Hash;

class DistributionController extends Controller
{
    public function index()
    {
        return view('distribution.index');
    }
    public function repair()
    {
        return view('distribution.repair');
    }

    public function getclaimList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        $branch = Claim::where('status',4)
                        ->where('is_closed',0)
                        ->whereHas('shops', function($query){
                            $query->where('is_active', 1);
                        })
                        ->with('shops')->get();
        // $branch = Claim::with('shops')->get();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
        ]);
    }
    public function getRepairList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        $branch = Claim::where('status',3)
                        ->where('is_closed',0)
                        ->whereHas('shops', function($query){
                            $query->where('is_active', 1);
                        })
                        ->with('shops')->get();
        // $branch = Claim::with('shops')->get();
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
        ]);
    }
    public function submitRecord(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => $request->status,
            'distribution_message' => $request->distribution_message,
        ]);
        try {
            DB::beginTransaction();
            $claim = Claim::find($request->id);
            
            $claim->update([
                'status' => $request->status,
                'distribution_message' => $request->distribution_message,
                'is_closed' => 1,            
            ]);
            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => ' Done Successful'
                ],
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }


    }
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
                $branch = Claim::find($id);
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
}
