<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseRequest;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $purchases = Purchase::with('supplier', 'items')->latest()->paginate(10);

        return Inertia::render('Inventory/Purchases/Purchases', [
            'purchases' => $purchases,
        ]);
    }

    public function create(){
        return Inertia::render('Inventory/Purchases/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PurchaseRequest $request)
    {
        //
        try {
            DB::transaction(function () use($request){
                $purchase = Purchase::create(collect($request->validate)->except('invoice_pdf')->toArray());

                if($request->hasFile('invoice_pdf')){
                    $purchase
                        ->addMediaFromRequest('invoice_pdf')
                        ->toMediaCollection('invoices');
                }

                 // ✅ Save items
                foreach ($request->items as $itemData) {
                        $purchase->items()->create($itemData);
                }

            });

            return redirect()->route('purchases.index')->with('success', 'Purchase created successfully.');
        }catch(\Exception $e){
            Log::error('Error creating purchases: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the purchases.']);
        }
    }






    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
