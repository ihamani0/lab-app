<?php

use App\Http\Controllers\Admin\HumenResource\PatientController;
use App\Http\Controllers\Admin\HumenResource\DoctorController;
use App\Http\Controllers\Admin\HumenResource\TechnicienController;
use App\Http\Controllers\Admin\Inventory\BrandsController;
use App\Http\Controllers\Admin\Inventory\CategorieController;
use App\Http\Controllers\Admin\Inventory\MaterialsController;
use App\Http\Controllers\Admin\Inventory\SuppliersController;
use Illuminate\Support\Facades\Route;

Route::get('/' , function(){
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return \Inertia\Inertia::render('Dashboard');
})->name('dashboard');





//Resource Humen
Route::resource('/patients' , PatientController::class)->except(['create' , 'show' ,'edit']);
Route::resource('/doctors' , DoctorController::class)->except(['create' , 'show' , 'edit' ]);



Route::resource('/techniciens' , TechnicienController::class)
            ->except(['create' , 'show' , 'edit', 'update']);
Route::put('/techniciens/{user}' , [TechnicienController::class , 'update']);
Route::put('/techniciens/{id}/toggle-active' , [TechnicienController::class , 'toggleActive']);


//Invitory

Route::resource('/categories' , CategorieController::class)->except(['create' , 'show' ,'edit']);


Route::resource('/brands' , BrandsController::class)->except(['create' , 'show' ,'edit']);
Route::get('/brands/by-category/{category}', [BrandsController::class, 'byCategory']);



//
Route::resource('/materials' , MaterialsController::class)->except(['create' , 'show' ,'edit']);




Route::get('/materials/{id}/download-qr-pdf' , [MaterialsController::class , 'downloadPdfForQrCode'])->name('materials.downloadPdf');
//for code scan

Route::get('/materials/{id}/decrement' , [MaterialsController::class , 'confirmDecrementPage'])->name('materials.index-decrement');

Route::post('/materials/{id}/decrement' , [MaterialsController::class , 'decrementStockUsingQrCode'])->name('materials.update-decrement');

Route::get('/materials/export', [MaterialsController::class, 'export'])
     ->name('materials.export');


Route::post('/materials/{id}/undo', [MaterialsController::class, 'undoStock']);



// For suppliers
Route::resource('suppliers',SuppliersController::class)->except(['create' , 'show' ,'edit']);



// Route::middleware(['role:super-admin', 'active'])
//     ->prefix('admin')
//     ->name('admin.')
//     ->group(function () {
//             Route::resource('technicians' , TechnicienController::class)->except(['create' , 'show']);

//             Route::post('technicians/{technician}/toggle-active', [TechnicienController::class,'toggleActive'])
//              ->name('technicians.toggleActive');
//     });



Route::get('/test', function () {

    return \Inertia\Inertia::render('Test' );

});
