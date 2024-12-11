<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthenticationController extends Controller
{
    // Reset Password basic
    public function reset_password_basic()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-reset-password-basic', ['pageConfigs' => $pageConfigs]);
    }

    // Reset Password cover
    public function reset_password_cover()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-reset-password-cover', ['pageConfigs' => $pageConfigs]);
    }

    // email verify basic
    public function verify_email_basic()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-verify-email-basic', ['pageConfigs' => $pageConfigs]);
    }

    // email verify cover
    public function verify_email_cover()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-verify-email-cover', ['pageConfigs' => $pageConfigs]);
    }

    // two steps basic
    public function two_steps_basic()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-two-steps-basic', ['pageConfigs' => $pageConfigs]);
    }

    // two steps cover
    public function two_steps_cover()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-two-steps-cover', ['pageConfigs' => $pageConfigs]);
    }

    // register multi steps
    public function register_multi_steps()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/authentication/auth-register-multisteps', ['pageConfigs' => $pageConfigs]);
    }

    // register used for hospital
    public function register()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/auth/auth-register', ['pageConfigs' => $pageConfigs]);
    }

    // login used for hospital
    public function login(Request $request)
    {
        $response = null;
        if($request->input('response')){
            $response = $request->input('response');
        }
        
        $pageConfigs = ['blankPage' => true];

        return view('/auth/auth-login', ['pageConfigs' => $pageConfigs])->with('response', $response);
    }

    public function loginVerify(Request $request)
    {
        $pageConfigs = ['blankPage' => true];
        $response = array(
            'status' => 'failed', 
            'message' => 'incorrect email & password.'
        );
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required|min:3",
        ]);
        

        if ($validator->fails()) {
            // return redirect()->route('auth-login')->with('response', $response);
            return redirect()->route('auth-login')->with('error', 'Please provide valid email and password.');
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
          
            //RoleById
            //this code is work for super user. super user able to switch in hospital and its branch.
            if (Auth::user()->is_super == 1) {
                Auth::user()->hms_id = 1;
                Auth::user()->branch_id = 1;
            } 

            //this line is set role related info in auth
            Auth::user()->load('role');
            Auth::user()->load('hms');

            $user = User::where("email", $request->email)
            ->where("status", "active")
            ->get();       
            if (Auth::user() && Auth::user()->role->slug) {
                if ($url = getRoleWise(Auth::user()->role->slug)) {
                    return redirect()->intended($url);
                } else {
                    redirect()->intended(route('/'));
                }
            }
            if ($user) {
                return redirect()->intended(route('/'));
            }
        } else {
            // return redirect()->route('auth-login')->with('response', $response);
            return redirect()->route('auth-login')->with('error', 'Incorrect email or password. Please try again.');
        }
    }
}
