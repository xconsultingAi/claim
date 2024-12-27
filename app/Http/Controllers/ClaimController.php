<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Claim;
use App\Models\Image;
use App\Models\Role;
use App\Models\User;
use App\Models\Shop;
use Illuminate\Support\Facades\Hash;

class ClaimController extends Controller
{
    public function index()
    {
        return view('claim.index');
    }
    public function closedClaim()
    {
        return view('claim.closed');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if(Auth::user()->roles[0]->name == 'Shop'){
            $shops = Shop::where('id',Auth::user()->shop_id)->get();
        }else{
            $shops = Shop::all();
        }
        
        return view('claim.create',[
                'shops' => $shops,
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
            'article_number' => 'required|numeric',
            'name' => 'required',
            'invoice' => 'required|numeric',
            'purchase_date' => 'required|date',
            'article_price' => 'required',
            'period' => 'required',
            'customer_name' => 'required',
            'customer_address' => 'required',
            'customer_email' => 'required',
            'ptcl_number' => 'required',
            'cell' => 'required',
            'shop_id' => 'required',
            'invoice_image.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'defect_image.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
       
        if ($validator->fails()) {
            // dd($validator->errors());
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
            $roles= Role::where('hms_id', Auth::user()->hms_id)
            ->where('slug', 'shop')
            ->pluck('id')
            ->first();

            if (!$roles) {
                return response()->json([
                    "status" => FAILURE,
                    "message" => 'role not found.',
                ], 400);
            }

            $request->merge([
                'password' => Hash::make($request->password) // Hash the password before storing
            ]);
            $request->merge([
                'hms_id' => Auth::user()->hms_id,
            ]);
            $imagePath = null;
        if ($request->hasFile('invoice_image')) {
            // Store the image in the 'public' disk (you can change this to cloud storage)
            $imagePath = $request->file('invoice_image')->store('images', 'public');
        }
       

            $createClaim = Claim::create([
                'hms_id' => $request->hms_id,
                'article_number' => $request->article_number,
                'name' => $request->name,
                'invoice' => $request->invoice,
                'purchase_date' => $request->purchase_date,
                'article_price' => $request->article_price,
                'period' => $request->period,
                'customer_name' => $request->customer_name,
                'customer_address' => $request->customer_address,
                'customer_email' => $request->customer_email,
                'ptcl_number' => $request->ptcl_number,
                'cell' => $request->cell,
                'shop_id' => $request->shop_id,
                'proposed_status' => $request->proposed_status,
                'color' => $request->color,
                'size' => $request->size,
                'invoice_image'=> $imagePath,
            ]);
            if ($request->hasFile('defect_image')) {
                foreach ($request->file('defect_image') as $image) {
                    $path= $image->store('images', 'public');

                    Image::create([
                        'claim_id' => $createClaim->id,  // Link the image to the claim
                        'defect_image' => $path,
                    ]);
                }
            }
           
        // // Store each uploaded image
        
       
            if (!$createClaim->id) {
                DB::rollBack();
                return response()->json($createClaim);
            }

          
            DB::commit();
            return response()->json([
                "status" => SUCCESS,
                'message' => 'New Claim has been created successful'
            ]);
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return response()->json(["status" => FAILURE, 'message' => $e], 401);
        }
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
        $branch = Claim::find($id);
        $shops = Shop::all();
        return view('claim.edit', [
            'statuses' => $statuses,
            'branch' => $branch,
            'shops' => $shops,
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
            'article_number' => 'required',
            'name' => 'required',
            'invoice' => 'required',
            'purchase_date' => 'required',
            'article_price' => 'required',
            'period' => 'required',
            'customer_name' => 'required',
            'customer_address' => 'required',
            'customer_email' => 'required',
            'ptcl_number' => 'required',
            'cell' => 'required',
            'shop_id' => 'required',
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
        $request->merge([
            'hms_id' => Auth::user()->hms_id,
        ]);

        try {
            DB::beginTransaction();
            $claim = Claim::find($request->id);
            
            $claim->update([
                'hms_id' => $request->hms_id,
                'article_number' => $request->article_number,
                'name' => $request->name,
                'invoice' => $request->invoice,
                'purchase_date' => $request->purchase_date,
                'article_price' => $request->article_price,
                'period' => $request->period,
                'customer_name' => $request->customer_name,
                'customer_address' => $request->customer_address,
                'customer_email' => $request->customer_email,
                'ptcl_number' => $request->ptcl_number,
                'cell' => $request->cell,
                'shop_id' => $request->shop_id,
                'proposed_status' => $request->proposed_status,
                'color' => $request->color,
                'size' => $request->size,
                'inward_gate_pass' => $request->inward_gate_pass,        
            ]);

            DB::commit();
            return response()->json(
                [
                    "status" => SUCCESS,
                    'message' => 'Shop has been updated successful'
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

    public function getclaimList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        if(Auth::user()->roles[0]->name == 'Shop'){
            $branch = Claim::where('status',0)
                           ->where('is_closed',0)
                           ->where('shop_id',Auth::user()->shop_id)
                           ->whereHas('shops', function($query){
                               $query->where('is_active', 1);
                            })
                           ->with('shops')->get();
        }elseif(Auth::user()->roles[0]->name == 'Super Admin'){
            $branch = Claim::where('status',0)
                           ->where('is_closed',0)
                           ->whereHas('shops', function($query){
                            $query->where('is_active', 1);
                            })
                           ->with('shops')->get();
        }else{
            $branch = Claim::where('status',0)
            ->where('is_closed',0)
            ->whereHas('shops', function($query){
                $query->where('is_active', 1);
              })
            ->with('shops')->get();
        }
        //  if(Auth::user()->roles[0]->name == 'Shop'){
        //     $branch = Claim::where('shop_id',Auth::user()->shop_id)->with('shops')->get();
        // }elseif(Auth::user()->roles[0]->name == 'Super Admin'){
        //     $branch = Claim::with('shops')->get();
        // }
        $branch_id = Claim::find($branch[0]->id);
        $imageUrl = $branch_id->invoice_image ? asset('storage/' . $branch_id->invoice_image) : null;
        return response()->json([
            'status' => SUCCESS,
            'message' => GET_RECORD_SUCCESS,
            'data' => $branch,
            'image' => $imageUrl,
        ]);
    }
    public function getclosedclaimList()
    {
        if (!Auth::user() || !Auth::user()->hms_id) {
            return response()->json([
                "status" => FAILURE,
                "message" => LOGIN_FAILURE,
            ],400);
        }
        // if(Auth::user()->roles[0]->name == 'Shop'){
        //     $branch = Claim::where('is_closed',1)->where('shop_id',Auth::user()->shop_id)->with('shops')->get();
        // }elseif(Auth::user()->roles[0]->name == 'Super Admin'){
        //     $branch = Claim::where('is_closed',1)->with('shops')->get();
        // }
        if(Auth::user()->roles[0]->name == 'Shop'){
            $branch = Claim::where('is_closed',1)
                           ->where('shop_id',Auth::user()->shop_id)
                           ->whereHas('shops', function($query){
                               $query->where('is_active', 1);
                            })
                           ->with('shops')->get();
        }elseif(Auth::user()->roles[0]->name == 'Super Admin'){
            $branch = Claim::where('is_closed',1)
                           ->whereHas('shops', function($query){
                            $query->where('is_active', 1);
                            })
                           ->with('shops')->get();
        }else{
            $branch = Claim::where('is_closed',1)
                           ->whereHas('shops', function($query){
                                $query->where('is_active', 1);
                            })
                            ->with('shops')->get();
        }
        //  if(Auth::user()->roles[0]->name == 'Shop'){
        //     $branch = Claim::where('shop_id',Auth::user()->shop_id)->with('shops')->get();
        // }elseif(Auth::user()->roles[0]->name == 'Super Admin'){
        //     $branch = Claim::with('shops')->get();
        // }

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
            'message' => $request->message,
        ]);
        // dd($validator->fails());
        // if ($validator->fails()) {
        //     return response()->json([
        //         "status" => FAILURE,
        //         "message" => $validator->errors(),
        //     ], 400);
        // }

        // if (!Auth::user() || !Auth::user()->hms_id) {
        //     return response()->json([
        //         "status" => FAILURE,
        //         "message" => 'Please login again.',
        //     ], 400);
        // }

        try {
            DB::beginTransaction();
            $claim = Claim::find($request->id);
            // if ($request->password != $user->password) {
            //     $request->merge([
            //         'password' => Hash::make($request->password) // Hash the password before storing
            //     ]);
            // }
            
            $claim->update([
                'status' => $request->status,
                'message' => $request->message,             
            ]);
            // if (!$user->id) {
            //     DB::rollBack();
            //     return response()->json($user);
            // }
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

}
