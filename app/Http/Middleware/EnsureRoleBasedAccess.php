<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureRoleBasedAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next , string $roles): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $userRoles = explode('|', $roles);
        $hasRole = Auth::user()->hasAnyRole($userRoles);

        if (!$hasRole) {
            // Instead of aborting, redirect to appropriate dashboard
            $redirectPath = match (true) {
                Auth::user()->hasRole('doctor') => route('doctor.dashboard'),
                Auth::user()->hasRole('accounting') => route('accounting.dashboard'),
                Auth::user()->hasRole(['super-admin', 'technician']) => route('dashboard'),
                default => route('login'),
            };

            return redirect($redirectPath);
        }

        return $next($request);
    }
}
