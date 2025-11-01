<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Exports\ConsumptionExport;
use App\Exports\PdfExporter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConsumptionResource;
use App\Models\Consumption;
use App\Repositories\ConsumptionRepository;
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
            'filters' => $request->only(['search' , 'date_from' , 'date_to'])
        ]);
    }


    private function aggregatedConsumptions(Request $request){

        $start = $request->get('date_from') ? Carbon::parse($request->get('date_from'))->startOfDay() : now()->startOfMonth();

        $end   = $request->get('date_to')   ? Carbon::parse($request->get('date_to'))->endOfDay()   : now()->endOfMonth();


        $perPage = (int) $request->get('per_page', 15);

        $search = $request->get('search');


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
            $query->where('materials.name', 'LIKE', "%{$search}%")
                ->orWhere('materials.sku', 'LIKE', "%{$search}%");
        }

            $query->orderByDesc('total_quantity');

            $query->paginate($perPage);

            return $query->paginate($perPage);
    }


    public function export(Request $request , ConsumptionRepository $repo){

        // dd($request->all());
        $start = $request->get('date_from') ?? now()->startOfMonth();
        $end   = $request->get('date_to') ?? now()->endOfMonth();
        $search = $request->get('q');
        $format = $request->get('format', 'xlsx'); // or 'pdf'

        $data = $repo->aggregated($start , $end , $search)->get();

        // dd($data->get());

        $filename = 'consumptions_' . now()->format('Ymd_His') . '.' . $format;

        if($format == 'pdf'){
            return PdfExporter::Download('Pdf/ConsumptionReport' , $filename , $data );
        }

        return ConsumptionExport::download($filename , $data);
    }
}
