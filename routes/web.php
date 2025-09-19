<?php

use App\Http\Controllers\Admin\PatientController;
use App\Models\Patient;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return \Inertia\Inertia::render('Dashboard');
});




Route::resource('/patients' , PatientController::class)->except(['create' , 'show']);

Route::get('/test', function () {

    return \Inertia\Inertia::render('Test' );

});
