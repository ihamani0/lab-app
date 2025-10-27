<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsumptionResource;
use App\Models\Consumption;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Matrix\Decomposition\QR;

class ConsumptionController extends Controller{



    public function index(Request $request)
    {


        $consumptions = $this
                    ->aggregatedConsumptions($request)
                    ->appends($request->only('search'));


        // dd($consumptions);

        return Inertia::render('Case/Consumption/ConsumptionIndex' , [
            'consumptions' => $consumptions ,
        ]);
    }


    private function aggregatedConsumptions(Request $request){

        $start = $request->get('start_date') ? Carbon::parse($request->get('start_date'))->startOfDay() : now()->startOfMonth();

        $end   = $request->get('end_date')   ? Carbon::parse($request->get('end_date'))->endOfDay()   : now()->endOfMonth();


        $perPage = (int) $request->get('per_page', 15);

        $search = $request->get('q');


        $query = DB::table('consumptions')
            ->join('materials' , 'consumptions.material_id', '=', 'materials.id')
            ->whereBetween('consumptions.created_at', [$start, $end])
            ->select(
                'materials.id as material_id',
                'materials.name as material_name',
                'materials.sku as material_sku',
                'materials.stock_quantity as in_stock',
                'materials.price as unit_price',
                DB::raw('SUM(consumptions.quantity_used) as total_quantity'),
                DB::raw('SUM(consumptions.total_cost) as total_cost'),

                // average unit cost over the period
                DB::raw('CASE WHEN SUM(consumptions.quantity_used) = 0
                            THEN 0 ELSE SUM(consumptions.total_cost) / SUM(consumptions.quantity_used) END as avg_unit_cost')
            )
            ->groupBy('materials.id', 'materials.name')
            ;


        if ($search) {
            $query->where('materials.name', 'LIKE', "%{$search}%");
        }

            $query->orderByDesc('total_quantity');

            $query->paginate($perPage);

            return $query->paginate($perPage);
    }
}
