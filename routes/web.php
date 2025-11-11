<?php

use App\Http\Controllers\Admin\Case\CaseController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HumenResource\AccountingController;
use App\Http\Controllers\Admin\HumenResource\PatientController;
use App\Http\Controllers\Admin\HumenResource\DoctorController;
use App\Http\Controllers\Admin\HumenResource\TechnicienController;
use App\Http\Controllers\Admin\Inventory\BrandsController;
use App\Http\Controllers\Admin\Inventory\CategorieController;
use App\Http\Controllers\Admin\Inventory\MaterialsController;
use App\Http\Controllers\Admin\Inventory\PurchasesController;
use App\Http\Controllers\Admin\Inventory\SuppliersController;
use App\Http\Controllers\Admin\Prosthesis\ConsumptionController;
use App\Http\Controllers\Admin\Prosthesis\InvoiceController;
use App\Http\Controllers\Admin\Prosthesis\ServiceController;
use App\Http\Controllers\Admin\Report\CaseController as ReportCaseController;
use App\Http\Controllers\Admin\Report\FinancialController;
use App\Http\Controllers\Admin\Report\InventoryController;
use App\Http\Controllers\Admin\Stock\StockController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/' , function(){
    return redirect()->route('dashboard');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class , 'index'])->name('dashboard');
});



//Resource Humen
Route::resource('/patients' , PatientController::class)->except(['create' , 'show' ,'edit']);

Route::resource('/doctors' , DoctorController::class)->except(['create' , 'show' , 'edit' ]);
Route::put('/doctors/{id}/toggle-active' , [DoctorController::class , 'toggleActive']);


Route::resource('/techniciens' , TechnicienController::class)
            ->except(['create' , 'show' , 'edit', 'update']);

Route::put('/techniciens/{user}' , [TechnicienController::class , 'update']);
Route::put('/techniciens/{id}/toggle-active' , [TechnicienController::class , 'toggleActive']);


Route::resource('/accounting' , AccountingController::class)
            ->except(['create' , 'show' , 'edit', 'update']);
Route::put('/accounting/{user}' , [AccountingController::class , 'update'])->name('accounting.update');
Route::put('/accounting/{id}/toggle-active' , [AccountingController::class , 'toggleActive'])
->name('accounting.toggleActive');

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

Route::get('/materials/export/{format}', [MaterialsController::class, 'export'])
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



Route::resource("/prosthesis-service" , ServiceController::class)->except(['create' , 'show' ,'edit']);;


Route::resource("/prosthesis-invoice" ,InvoiceController::class)->except('show');

Route::get("/prosthesis-invoice/{case_invoice}/download-invoice" ,[InvoiceController::class , 'downloadInvoice']);

Route::get("/prosthesis-invoice/export/{format}" ,[InvoiceController::class , 'export']);


Route::resource("/prosthesis-consumption" ,ConsumptionController::class)->except('show');
Route::get('/prosthesis-consumption/export', [ConsumptionController::class, 'export'])
    ->name('consumptions.export');



Route::get('/report/financial' , [FinancialController::class , 'index']);
Route::get('/report/production' , [ReportCaseController::class , 'index']);
Route::get('/report/inventory' , [InventoryController::class , 'index']);



// Route::middleware(['role:super-admin', 'active'])
//     ->prefix('admin')
//     ->name('admin.')
//     ->group(function () {
//             Route::resource('technicians' , TechnicienController::class)->except(['create' , 'show']);

//             Route::post('technicians/{technician}/toggle-active', [TechnicienController::class,'toggleActive'])
//              ->name('technicians.toggleActive');
//     });


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
