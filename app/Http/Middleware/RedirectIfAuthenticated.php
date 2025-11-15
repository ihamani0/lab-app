<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // --- THIS IS THE MODIFIED, ROLE-AWARE LOGIC ---

                /** @var \App\Models\User $user */
                $user = Auth::user();

                if ($user->hasRole('doctor')) {
                    return redirect()->route('doctor.dashboard');
                }

                if ($user->hasRole('accounting')) {
                    return redirect()->route('accounting.dashboard');
                }

                // Default for admin, tech, or any other role
                return redirect('/dashboard'); // This redirects to '/dashboard'
            }
        }

        return $next($request);
}
}
