<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandsController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Brand::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }
        $brands = $query->with('category')
                            ->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'))
                                        ->through(fn ($brand) => [
                                            'id'     => $brand->id,
                                            'name'   => $brand->name,
                                            "description" => $brand->description,
                                            'category' => $brand->category ? [
                                                'id'   => $brand->category->id,
                                                'name' => $brand->category->name,
                                            ] : null ,
                                            'create' => $brand->created_at->format('M d, Y'),
                                            'update' => $brand->updated_at ? $brand->updated_at->format('M d, Y H:i') : null,
                                        ]);


        return Inertia::render('Inventory/Brands/Brands' ,
        [
            "brands" => $brands  ,
            "categories" => Category::all(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'category_id' => 'required|integer'
        ]);

        Brand::create($validated);

        return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'category_id' => 'required|integer'
        ]);

        $brand->update($validated);

        return redirect()->back()->with('success', 'Brand updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return redirect()->route('brands.index')->with("success", "Brand deleted successfully.");
    }


    /**
     * get brands based on categories
     */
    public function byCategory($categoryId)
    {
        return Brand::where('category_id', $categoryId)->get();
    }
}
