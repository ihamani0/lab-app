<?php

use App\Http\Controllers\Admin\Case\CaseController;
use App\Http\Controllers\Admin\HumenResource\PatientController;
use App\Http\Controllers\Admin\HumenResource\DoctorController;
use App\Http\Controllers\Admin\HumenResource\TechnicienController;
use App\Http\Controllers\Admin\Inventory\BrandsController;
use App\Http\Controllers\Admin\Inventory\CategorieController;
use App\Http\Controllers\Admin\Inventory\MaterialsController;
use App\Http\Controllers\Admin\Inventory\PurchasesController;
use App\Http\Controllers\Admin\Inventory\SuppliersController;
use App\Http\Controllers\Admin\Stock\StockController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


// For suppliers
Route::resource('purchases',PurchasesController::class);
Route::get('/purchases/{purchase}/invoice/download', [PurchasesController::class, 'downloadInvoice']) ->name('purchases.invoice.download');


Route::resource('/stock' , StockController::class);
Route::get('/movement-stock' , [StockController::class , 'stock_movment'])->name('stock.stock_movment');




Route::resource('/prosthesis-case' , CaseController::class);

Route::post('/prosthesis-case/{prosthesis_case}/generate-invoice', [CaseController::class, 'generateInvoice'])->name('invoice.generate');

Route::get('/prosthesis-case/{case_invoice}/download-invoice' , [CaseController::class , 'downloadInvoice'])->name('invoices.download');


// Route::get();



///prosthesis-consumption   //prosthesis-service ///prosthesis-invoice


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
