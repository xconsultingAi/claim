<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Illuminate\Http\Request;

class ClaimSettlementController extends Controller
{
    public function index($id){
        $claim = Claim::where('id',$id)->with('shops')->get();
        return view('claim.claim-settlement-form',['claim' => $claim]);
    }
}
