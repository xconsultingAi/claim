<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Image;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QAController extends Controller
{
    public function index()
    {
        return view('qa.index');
    }

    public function getclaimList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        $branch = Claim::where('status',1)
                        ->orWhere('status',5)
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
            'message' => $request->qa_message,
        ]);
        try {
            DB::beginTransaction();
            $claim = Claim::find($request->id);
            if($request->status == 2){
                $claim->update([
                    'status' => $request->status,
                    'qa_message' => $request->qa_message,
                    'is_closed' => 1,         
                ]);
            }else{
                $claim->update([
                    'status' => $request->status,
                    'qa_message' => $request->qa_message,      
                ]);
            }
            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => 'Claim Record has been updated successful'
                ],
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }


    }
    public function receivedClaim(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'is_received' => $request->is_received,
            'received_date_and_time' => $request->received_date_and_time,
        ]);
        try {
            DB::beginTransaction();
            $claim = Claim::find($request->id);
                $claim->update([
                    'status' => 5,
                    'receiving_remarks' => $request->received_remarks,
                    'is_received' => $request->is_received,  
                    'received_date_and_time' => $request->received_date_and_time,      
                ]);
            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => 'Claim Record has been updated successful'
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
    public function gallary($id)
    {
        // Fetch all images from the database
        $defect_images = Image::where('claim_id',$id)->get();

        return view('qa.gallary', compact('defect_images'));
    }
}
