<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::query()
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->through(fn ($supplier) => [
                'id'            => $supplier->id,
                'name'          => $supplier->name,
            // 'contact_person' => $supplier->contact_person,
                'email'         => $supplier->email,
                'phone'         => $supplier->phone,
                'address'       => $supplier->address,
                'description'   => $supplier->description,
                'facebook'      => $supplier->facebook,
                'instagram'     => $supplier->instagram,
                'whatsapp'      => $supplier->whatsapp,
                'website'       => $supplier->website,
                'logoUrl'       => $supplier->getFirstMediaUrl('logo') ?? null,
                'created_at'    => $supplier->created_at->format('M d, Y'),
                'updated_at'    => $supplier->updated_at ? $supplier->updated_at->format('M d, Y H:i') : null,
            ]);

            // dd($suppliers);

        return Inertia::render("Inventory/Suppliers/Suppliers", [
            'suppliers' => $suppliers
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SupplierRequest $request)
    {
        try {
            DB::transaction(function () use ($request){

                $validatedData = collect($request->validated())->except('logo')->toArray();

                $supplier = Supplier::create($validatedData);

                if ($request->hasFile('logo')) {
                    $supplier
                    ->addMediaFromRequest('logo')
                    ->toMediaCollection('logo');
                }
            });

            return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully.');

        } catch(\Exception $e) {

            Log::error('Error creating Supplier: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the Suppliers data.']);
            }

    }



    /**
     * Update the specified resource in storage.
     */
    public function update(SupplierRequest $request, Supplier $supplier)
    {

        try {
            DB::transaction(function () use ($request , $supplier){

                $validatedData = collect($request->validated())->except('logo')->toArray();

                // Update supplier info
                $supplier->update($validatedData);

                if ($request->hasFile('logo')) {
                    $supplier
                    ->clearMediaCollection('logo')
                    ->addMediaFromRequest('logo')
                    ->toMediaCollection('logo');
                }
            });

            return redirect()->route('suppliers.index')->with('success', 'Supplier Update successfully.');

        } catch(\Exception $e) {

            Log::error('Error Updating Supplier: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the Suppliers data.']);
            }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();

        return redirect()->route('suppliers.index')->with("success", "Supplier deleted successfully.");
    }
}
