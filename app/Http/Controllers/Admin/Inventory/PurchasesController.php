<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseRequest;
use App\Models\Material;
use App\Models\Purchase;
use App\Models\Supplier;
use App\Services\PurchaseCalculator;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class PurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){

        // dd($request->alL());

        $query = Purchase::query()->with(['supplier','purchaseItems.material']);

            // 🔎 Search (sku + name)
        if ($request->filled('search')) {
                $search = strtolower($request->search);
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(invoice_number) LIKE ?', ["%{$search}%"]);
                });

        }

        // Time search
        if($request->filled('date_from') && $request->filled('date_to')){

            $query->whereBetween('purchase_date', [ Carbon::parse($request->date_from)->toDateString(),Carbon::parse($request->date_to)->toDateString()]);

        }else if($request->filled('date_from') && !$request->filled('date_to')){

            $query->where('purchase_date', $request->date_from);
        }else if ($request->filled('date_to')) {
     $query->whereDate('purchase_date', $request->date_to);
        }


        //  supplier filter
        if ($request->filled('supplier')) {
                $query->where('supplier_id', $request->supplier);
        }

        //status
        if($request->filled('status')){
            switch($request->status){
                case "draft":
                    $query->where('payment_status', 'draft');
                    break;
                case "pending":
                    $query->where('payment_status', 'pending');
                    break;
                case "paid":
                    $query->where('payment_status', 'paid');
                    break;
                case "cancelled":
                    $query->where('status', 'cancelled');
                    break;
                case "confirmed":
                    $query->where('status', 'confirmed');
                    break;
                case "received":
                    $query->where('status', 'received');
                    break;
                default:
                    break;
            }
        }

        $purchases = $query
                        ->latest()
                        ->paginate(10)
                        ->appends($request->all());


        return Inertia::render('Inventory/Purchases/Purchases', [
            'purchases' => $purchases,
            "suppliers" => Supplier::all(),
            'filters'   => $request->only(['search', 'status', 'supplier', ]),
            "materials" => Material::all()
        ]);
    }

    public function create(){
        $material = Material::all();
        $supplier = Supplier::all();
        return Inertia::render('Inventory/Purchases/Create' ,[
            'materials' => $material,
            'suppliers' => $supplier,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PurchaseRequest $request , PurchaseCalculator $purchCaculate){
        //

        try {
            DB::transaction(function () use($request , $purchCaculate){
                $purchase = Purchase::create([
                    'supplier_id' => $request->supplier_id,
                    'invoice_number' => $request->invoice_number,
                    'purchase_date'  => $request->purchase_date
                        ? \Carbon\Carbon::parse($request->purchase_date)->toDateString()
                        : now()->toDateString(),
                ]);

                if($request->hasFile('invoice_pdf')){
                    $purchase
                        ->addMediaFromRequest('invoice_pdf')
                        ->toMediaCollection('invoices');
                }

                 // ✅ Save items
                foreach ($request->items as $itemData) {
                        $purchase->purchaseItems()->create($itemData);
                }

                // ensure purchase totals are correct (in case events didn't run)
                $purchCaculate->recalculate($purchase);

            });

            return redirect()->route('purchases.index')->with('success', 'Purchase created successfully.');
        }catch(\Exception $e){
            Log::error('Error creating purchases: ' . $e->getMessage());
            dd($e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the purchases.']);
        }
    }



    public function edit(Purchase $purchase){

        $purchase->load(['purchaseItems.material', 'supplier']);

        return Inertia::render("Inventory/Purchases/Edit", [
            "purchase" => $purchase,
            "materials" => Material::all(),
            "suppliers" => Supplier::all(),
        ]);

    }




    /**
     * Update the specified resource in storage.
     */
    public function update(PurchaseRequest $request, Purchase $purchase , PurchaseCalculator $purchCaculate){

        // dd($request->all());

        try{
            DB::transaction(function() use ($request , $purchase , $purchCaculate){

                $purchase->update([
                    'supplier_id' => $request->supplier_id,
                    'invoice_number' => $request->invoice_number,
                    'purchase_date'  => $request->purchase_date
                    ? \Carbon\Carbon::parse($request->purchase_date)->toDateString()
                    : $purchase->purchase_date, // keep old if not provided
                    "status" => $request->status,
                    "paid_amount" => $request->paid_amount,
                ]);


                if ($request->hasFile('invoice_pdf')) {
                    $purchase
                        ->clearMediaCollection('invoices') // ✅ remove old one
                        ->addMediaFromRequest('invoice_pdf')
                        ->toMediaCollection('invoices');
                }

                // ✅ Handle items: you can decide to delete and reinsert OR update individually
                $purchase->purchaseItems()->delete(); // remove old
                foreach ($request->items as $itemData) {
                    $purchase->purchaseItems()->create($itemData);
                }

                $purchCaculate->recalculate($purchase);

                });

                return redirect()->route('purchases.index')->with('success', 'Purchase updated successfully.');


        }catch(\Exception $e){
            Log::error('Error updating purchase: ' . $e->getMessage());

        return redirect()
            ->back()
            ->withInput()
            ->withErrors(['error' => 'Something went wrong while updating the purchase.']);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $purchase = Purchase::findOrFail($id);
        $purchase->delete();

        return redirect()->route('purchases.index')->with("success", "Purchase deleted successfully.");
    }


    public function downloadInvoice(Purchase $purchase){
        $media = $purchase->getFirstMedia('invoices');

        if (! $media) {
            abort(404, 'Invoice not found.');
        }

        return Response::download($media->getPath(), $media->file_name);
    }
}
