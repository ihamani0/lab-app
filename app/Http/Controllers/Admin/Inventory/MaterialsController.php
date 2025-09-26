<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Exports\MaterialsExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Material;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class MaterialsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){

            $query = Material::query()->with(['brand', 'category']);

            // 🔎 Search (sku + name)
            if ($request->filled('search')) {
                $search = strtolower($request->search);
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(sku) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                });
            }

            // 📂 Category filter
            if ($request->filled('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // 🏷️ Brand filter
            if ($request->filled('brand_id')) {
                $query->where('brand_id', $request->brand_id);
            }

            if ($request->filled('unit')) {
                $query->where('unit', $request->unit);
            }

            // ↕️ Sorting

            if ($request->filled('sort_by')) {
                switch ($request->sort_by) {
                    case 'stock_desc':
                        $query->orderBy('stock_quantity' , 'desc');
                        break;
                    case 'stock_asc':
                        $query->orderBy('stock_quantity' , 'asc');
                        break;
                    case 'price_asc':
                        $query->orderBy('price', 'asc');
                        break;
                    case 'price_desc':
                        $query->orderBy('price', 'desc');
                        break;
                    case 'latest':
                        $query->orderByDesc('created_at');
                        break;
                    case 'oldest':
                        $query->orderBy('created_at', 'asc');
                        break;
                    default:
                        $query->orderByDesc('id');
                }
            } else {
                $query->orderByDesc('id');
            }


        $materials = $query
            ->orderByDesc('id')
            ->paginate(10)
            ->appends($request->all())
            ->through(fn ($material) => [
                'id'                => $material->id,
                'sku'               => $material->sku,
                'name'              => $material->name,
                'description'       => $material->description,
                'price'             => $material->price ?? 0, // Handle null price
                'stock_quantity'    => $material->stock_quantity,
                'min_stock'         => $material->min_stock,
                'unit'              => $material->unit,
                'category'          => $material->category ? [
                    'id'            => $material->category->id,
                    'name'          => $material->category->name,
                ] : null,
                'brand'             => $material->brand ? [
                    'id'            => $material->brand->id,
                    'name'          => $material->brand->name,
                ] : null,
                "imageUrl"          => $material->getFirstMediaUrl('images') ?: null,
                "qrcode"            => $material->getFirstMediaUrl('qrcodes') ?: null,
                "barcode"           => $material->getFirstMediaUrl('barcodes') ?: null,
                'created_at'        => $material->created_at->format('M d, Y'),
                'updated_at'        => $material->updated_at?->format('M d, Y H:i'),
            ]);



        // dd($materials);

        return Inertia::render('Inventory/Materials/Materials', [
            'materials'  => $materials,
            'categories' => Category::all(),
            'brands'     => Brand::all(),
            'filters'    => $request->only(['search', 'category_id', 'unit', 'sort_by']),
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request){

        try {

            DB::beginTransaction();

            // Create product
            $product = Material::create(collect($request->validate)->except('image')->toArray());

            // Attach image if exists
            if ($request->hasFile('image')) {
                $product
                    ->addMediaFromRequest('image')
                    ->toMediaCollection('images');
            }

            // Commit if everything ok
            DB::commit();

            return redirect()
                ->route('materials.index')
                ->with('success', 'Material created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            // Optional: log error
            Log::error('Error creating material: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the material.']);
            }

    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        //

        $material = Material::findOrFail($id);


        $validated = $request->validate([
        'sku'            => 'required|unique:materials,sku,' . $material->id,
        'name'           => 'required|string|max:255',
        'description'    => 'nullable|string|max:255',
        'brand_id'       => 'required|integer|exists:brands,id',
        'category_id'    => 'required|integer|exists:categories,id',
        'unit'           => 'required|string|max:255',
        'min_stock'      => 'required|integer|min:0',
        'stock_quantity' => 'required|integer|min:0',
        'price'          => 'nullable|numeric|min:0',
        'image'          => 'nullable|image|max:2048', // add max size for safety
        ]);


        try {
        DB::beginTransaction();

        // Create product
        $material->update(collect($validated)->except('image')->toArray());

        // Attach image if exists
        if ($request->hasFile('image')) {
            $material->clearMediaCollection('images');
            $material->addMediaFromRequest('image')->toMediaCollection('images');
        }

        // Commit if everything ok
        DB::commit();

        return redirect()
            ->route('materials.index')
            ->with('success', 'Material updated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            // Optional: log error
            Log::error('Error creating material: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while saving the material.']);
            }

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $material = Material::findOrFail($id);
        $material->delete();

        return redirect()->route('materials.index')->with("success", "Material deleted successfully.");
    }







    public function downloadPdfForQrCode(string $id){
        $material = Material::findOrFail($id);
        $pdf = Pdf::loadView('Pdf.QrCode' , [
        'material' => $material,
        'qrcode'   => $material->getFirstMediaPath('qrcodes'),
        ])->setPaper([0, 0, 226.77, 151.18], 'portrait');
        // 80mm x 53mm label size
        //setPaper([0,0,width,height]) lets you match your label dimensions.
        // (1mm = 2.835pt → for 80mm width use ~226pt, adjust height as needed).
        // dd($material->getFirstMediaPath('qrcodes'));
        return $pdf->download("label-{$material->sku}.pdf");
    }




    public function confirmDecrementPage(string $id){
        $material = Material::findOrFail($id);
        return Inertia::render('Inventory/Materials/ConfirmDecrement' , [
            'material' => $material,
        ]);
    }

    public function decrementStockUsingQrCode(string $id){
        $material = Material::lockForUpdate()->findOrFail($id);


        if($material->stock_quantity <= 0){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Stock is already empty!',
                ], 400);
        }


        $material->decrement('stock_quantity');


        // Stock_movment



        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Stock decremented successfully',
        //     'material' => $material->fresh(),
        //     // 'movement_id' => $movement->id,
        // ]);
        return Inertia::render('Inventory/Materials/StockUpdate', [
            'status' => 'success',
            'message' => 'Stock decremented successfully',
            'material' => $material->fresh(),
        ]);
    }



    public function export(Request $request){
    $format = $request->get('format', 'xlsx'); // default to xlsx
    $fileName = 'materials_' . now()->format('Y_m_d_His');

    if ($format === 'csv') {
        return Excel::download(new MaterialsExport, $fileName . '.csv');
    }

    return Excel::download(new MaterialsExport, $fileName . '.xlsx');
    }




}
