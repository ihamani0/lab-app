<?php

namespace App\Http\Controllers\Admin\Stock;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockMovementRequest;
use App\Models\Material;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(){
        $stocks = Material::query()->with(['stockMovements' , 'purchaseItems'])
                            ->paginate(10)
                            ->through(fn($stock)=>[
                                'id' => $stock->id,
                                'name' => $stock->name,
                                'sku' => $stock->sku,
                                'ref' => $stock->ref,
                                'lot' => $stock->lot,
                                'quantity'=>$stock->stock_quantity,
                                'min_stock'=> $stock->min_stock,
                                'stock_movements' => [
                                    'raison' => $stock->latestStockMovement?->raison,
                                    'last_move' => $stock->latestStockMovement?->type,
                                    'last_move_date' => $stock->latestStockMovement?->movement_date
                                ] ,
                            ]);


        // dd($stocks->all());

        return Inertia::render("Stock/Interacation/Stock" , ['Stocks' => $stocks]);
    }

    public function store(StockMovementRequest $request){

        try{
            $validated = $request->validated();

            // ✅ Create movement
            $movement = StockMovement::create([
                'material_id' => $validated['material_id'],
                'type' => $validated['type'],
                'quantity' => $validated['delta'],
                'raison' => $validated['raison'],
                'movement_date' => date('Y-m-d H:i:s'),
            ]);

            // ✅ Update material quantity
            $material = Material::findOrFail($validated['material_id']);
            $material->stock_quantity += $validated['delta'];
            $material->save();
        }catch(\Exception $e){
            dd($e->getMessage());
        }

    }



    public function stock_movment(Request $request){

        $query = StockMovement::query()->with(['Material']);

                    // 🔎 Search (sku + name)
        if ($request->filled('search')) {
                $search = strtolower($request->search);
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(sku) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                });
        }


        $stock_movement  = StockMovement::query()->paginate(10);



        return Inertia::render('Stock/Movments/StockMovement' , [
            'stock_movement' => $stock_movement ,
            'filters' =>
        ]);
    }

}
