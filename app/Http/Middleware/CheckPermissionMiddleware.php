<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckPermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next,$permission)
    {

        if (!Auth::check()) {
            return redirect()->route('auth-login');
        }

          // Get the authenticated user
          $user = Auth::user();
          // Check if the user has the required permission
          if (!$user->hasPermission($permission)) {
              // Redirect or deny access
              return response()->view('errors.403', [], 403);
          }
        return $next($request);
    }
}
