<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
         // available language in template array
        $availLocale=['en'=>'en', 'fr'=>'fr','de'=>'de','pt'=>'pt'];
         // Locale is enabled and allowed to be change
        if(session()->has('locale') && array_key_exists(session()->get('locale'),$availLocale)){
            // Set the Laravel locale
            app()->setLocale(session()->get('locale'));
        }

        return $next($request);
    }
}
