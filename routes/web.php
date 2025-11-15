<?php

use App\Http\Controllers\Accounting\AccountingDashboardController;
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
use App\Http\Controllers\Doctor\DoctorDashboardController;
use Illuminate\Support\Facades\Route;



require __DIR__.'/auth.php';

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');


// Authenticated user routes
Route::middleware(['auth','active'])->group(function () {




    Route::middleware('role:super-admin|technician')->group(function () {

        Route::get('/dashboard', [DashboardController::class , 'index'])->name('dashboard');

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


        Route::get('/prosthesis-case', [CaseController::class, 'index'])->name('prosthesis-case.index');
        Route::get('/prosthesis-case/create', [CaseController::class, 'create'])->name('prosthesis-case.create');
        Route::get('/prosthesis-case/{prosthesis-case}', [CaseController::class, 'show'])->name('prosthesis-case.show');
        Route::get('/prosthesis-case/{prosthesis_case}/edit', [CaseController::class, 'edit'])->name('prosthesis-case.edit');



    });
    //end of super admin and technician routes


    Route::middleware(['auth', 'role:super-admin|technician|doctor'])->group(function () {

        Route::post('/prosthesis-case', [CaseController::class, 'store'])->name('prosthesis-case.store');

        Route::put('/prosthesis-case/{prosthesis_case}', [CaseController::class, 'update'])->name('prosthesis-case.update');

        Route::delete('/prosthesis-case/{prosthesis_case}', [CaseController::class, 'destroy'])->name('prosthesis-case.destroy');

    });

    // Doctor routes
    Route::middleware('role:doctor')->prefix('doctor')->name('doctor.')->group(function () {

        Route::get('/dashboard', [DoctorDashboardController::class, 'index'])->name('dashboard');
            // Other doctor routes can go here...

        Route::get('/prosthesis-case/{prosthesis_case}/edit', [DoctorDashboardController::class, 'edit'])->name('prosthesis-case.edit');
    });

    // Accounting routes
    Route::middleware( 'role:accounting')->prefix('accounting')->name('accounting.')->group(function () {
        Route::get('/dashboard', [AccountingDashboardController::class, 'index'])->name('dashboard');
        // Other accounting routes can go here...
    });


});


// Route::resource('/Prosthesis-case' , CaseController::class);

// require __DIR__.'/settings.php';

