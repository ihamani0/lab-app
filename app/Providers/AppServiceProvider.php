<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Gate::before(function($user , $ability){
            return $user->isAdminstrator() ? true : null;
        });

        if (request()->getSchemeAndHttpHost()) {
            URL::forceRootUrl(request()->getSchemeAndHttpHost());
        }


         Inertia::share([
            // 1) auth: share limited user info (or null)
            'auth' => function () {
                if (! Auth::check()) {
                    // not authenticated -> return user null
                    return ['user' => null];
                }

                $user = Auth::user();

                // Build a minimal array to send to the client
                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'is_active' => (bool) $user->is_active,
                        // role names as plain array (avoid passing collections)
                        'roles' => $user->getRoleNames()->toArray(),
                        // optional: permissions as array (use only if needed)
                        'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
                        // format datetimes to string (JS handles strings fine)
                        'doctor'=> $user->doctor ? $user->doctor : null,
                        'suspended_at' => $user->suspended_at ? $user->suspended_at->toDateTimeString() : null,
                    ],
                ];
            },

            // 2) flash messages (common pattern)
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error'   => session('error'),
                ];
            },

            // 3) you can add other small shared props here, e.g. app name
            'appName' => config('app.name'),
        ]);
    }
}
