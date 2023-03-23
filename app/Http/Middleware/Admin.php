<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Services\Soft\Http;
use Closure;
class Admin
{
    public function handle($request, Closure $next, $guard = null)
    {
        $auth = Auth::check();

        if($auth){
            $user = Auth::user();
            if($user->role == 'admin'){
                return $next($request);
            }
        }
        return Http::error(["error" => "user not admin!"]);
    }
}
