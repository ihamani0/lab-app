<?php

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Category::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }
        $category = $query->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'))
                                        ->through(fn ($category) =>[
                                            'id' => $category->id,
                                            'name' => $category->name,
                                            'description' => $category->description,
                                            'create' => $category->created_at->format('M d, Y'),
                                            'update' => $category->updated_at ? $category->updated_at->format('M d, Y H:i') : null,
                                        ]);

        return Inertia::render('Inventory/Categories/Categories' , [ "categories" => $category ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                ],
                'description' => 'nullable|string|max:255',
            ]);

        Category::create($validated);

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }




    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {

        $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                ],
                'description' => 'nullable|string|max:255',
            ]);
        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')->with("success", "Category deleted successfully.");
    }



}
