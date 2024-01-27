<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {
            $middlewareParameters = $request->route()->middleware();

            if (in_array('auth:admin', $middlewareParameters)) {
                return route('admin.login'); // Replace 'admin.login' with your admin login route name
            } else {
                return route('login'); // Replace 'login' with your regular user login route name
            }
        }
    }
}
