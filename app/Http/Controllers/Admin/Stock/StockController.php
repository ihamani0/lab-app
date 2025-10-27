<?php

namespace App\Http\Controllers\Admin\Stock;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockMovementRequest;
use App\Models\Consumption;
use App\Models\Material;
use App\Models\StockMovement;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(Request $request){

        $query = Material::query()->with(['stockMovements' , 'purchaseItems']);

        if ($request->filled('search')) {
                $search = strtolower($request->search);
                $query = $query->where(function ($q) use ($search){
                        $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                        $q->orWhereRaw('LOWER(sku) LIKE ?', ["%{$search}%"]);

                        // $materialQuery->orWhereRaw('LOWER(ref) LIKE ?', ["%{$search}%"]);

                });
        }
        $stocks =   $query
                    ->orderByDesc("updated_at")
                    ->paginate(10)
                    ->appends($request->all())
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

        return Inertia::render("Stock/Interacation/Stock" , [
            'Stocks' => $stocks,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(StockMovementRequest $request)
    {
            try {
                $validated = $request->validated();

                 DB::transaction(function () use ($validated) {
                    
                    $material = Material::findOrFail($validated['material_id']);

                    $quantityChange = $validated['type'] === 'consumption_out'
                        ? -abs($validated['delta'])
                        : abs($validated['delta']);

                    // Create stock movement
                    $movement = StockMovement::create([
                        'material_id'   => $validated['material_id'],
                        'type'          => $validated['type'],
                        'quantity'      => $quantityChange,
                        'raison'        => $validated['raison'] ?? null,
                        'movement_date' => now(),
                    ]);

                    $material->stock_quantity += $quantityChange;

                    if ($material->stock_quantity < 0) {
                        throw new \Exception('Stock cannot be negative!');
                    }

                    $material->save();

                    // Log consumption
                    if ($validated['type'] === 'consumption_out') {
                        $unitCost = $material->price ?? 0;
                        $quantityUsed = abs($validated['delta']);

                        Consumption::create([
                            'stock_movement_id' => $movement->id,
                            'material_id'       => $validated['material_id'],
                            'quantity_used'     => $quantityUsed,
                            'unit_cost'         => $unitCost,
                            'total_cost'        => $unitCost * $quantityUsed,
                        ]);
                    }
                });

                return redirect()->back()->with('success', 'Stock updated successfully.');

            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', $e->getMessage());
            }
        }



    public function stock_movment(Request $request){

        $query = StockMovement::query()->with(['material']);

                    // 🔎 Search (sku + name)
        if ($request->filled('search')) {
                $search = strtolower($request->search);
                $query = $query->where(function ($q) use ($search){
                    $q->whereHas('material' , function ($materialQuery) use ($search){
                        $materialQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                        $materialQuery->orWhereRaw('LOWER(sku) LIKE ?', ["%{$search}%"]);
                        // $materialQuery->orWhereRaw('LOWER(ref) LIKE ?', ["%{$search}%"]);
                    });
                });
        }
            if ($request->filled('type')) {
                switch ($request->type) {
                    case 'purchase_in':
                        $query->where('type' , 'purchase_in');
                        break;
                    case 'consumption_out':
                        $query->where('type' , 'consumption_out');
                        break;
                    case 'adjustment':
                        $query->where('type', 'adjustment');
                        break;
                    default:
                }
            }

            if($request->filled('date_from') && $request->filled('date_to')){

                $query->whereBetween('movement_date', [ Carbon::parse($request->date_from)->toDateString(),Carbon::parse($request->date_to)->toDateString()]);

            }else if($request->filled('date_from') && !$request->filled('date_to')){

                $query->where('movement_date', $request->date_from);
            }else if ($request->filled('date_to')) {
                $query->whereDate('movement_date', $request->date_to);
            }


            $stock_movement  = $query
                ->orderByDesc("id")
                ->paginate(10)
                ->appends($request->all())
                ->through(fn ($stock) => [
                'id'                => $stock->id,
                'type'              => $stock->type,
                'quantity'          => $stock->quantity,
                'raison'            => $stock->raison ,
                'movement_date'     => $stock->movement_date ,
                'material'          => $stock->material ? [
                        'name'              => $stock->material->name,
                        'sku'               => $stock->material->sku,
                        'ref'               => $stock?->material->ref,
                        'lot'               => $stock?->material->lot,
                ] : null ,  // Handle null price
            ]);



        return Inertia::render('Stock/Movments/StockMovement' , [
            'stock_movement' => $stock_movement ,
            'filters' => $request->only(['search', 'type'])
        ]);
    }

}
