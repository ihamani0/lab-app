<?php


namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class inventorryReportService{


    private $dbDriver ;

    public function __construct()
    {
        $this->dbDriver = DB::getDriverName();
    }


    public function getDateRange($request){

        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();


        $from = $request->input('date_from')
            ? Carbon::parse($request->input('date_from'))->setTimezone(config('app.timezone'))->toDateString()
            : $startMonth;

        $to = $request->input('date_to')
            ? Carbon::parse($request->input('date_to'))->setTimezone(config('app.timezone'))->toDateString()
            :$endMonth;

        return [$from, $to];

    }


    public function getKpis($from,$to){

        $totalMatrilas = DB::table('materials')->count();

        $totalLowStockItems = DB::table('materials')
                    ->whereColumn('stock_quantity' , '<' , "min_stock")
                    ->count();

        $totalPurchases = DB::table('purchases')
                    ->whereBetween('purchase_date' , [$from,$to])->count();

        $totalStockValue=DB::table('materials')
                    ->selectRaw('SUM(price * stock_quantity) as total_stock_value')
                    ->value('total_stock_value');

        return [
                'totalMatrilas' => $totalMatrilas,
                'totalLowStockItems' => $totalLowStockItems,
                'totalPurchases'=>$totalPurchases,
                'totalStockValue'=>$totalStockValue
        ];
    }




    public function getIncomingMaterilas($from,$to){

        if ($this->dbDriver === 'pgsql') {

            $monthExpr = "TO_CHAR(purchases.purchase_date, 'YYYY-MM')";

        } elseif ($this->dbDriver === 'sqlite') {

            $monthExpr = "strftime('%Y-%m', purchases.purchase_date)";
        } else {
            $monthExpr = "DATE_FORMAT(purchases.purchase_date, '%Y-%m')";
        }

        return DB::table('purchases')
            ->join('purchase_items' , 'purchases.id' , '=' , 'purchase_items.purchase_id')
            ->selectRAW(
                "$monthExpr as month, SUM(purchase_items.received_quantity) as incoming_quantity"
            )
            ->whereBetween('purchases.purchase_date' , [ $from,$to])
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function($row){
                return [
                    'month' => $row->month,
                    'incoming_quantity' => $row->incoming_quantity
                ];
            });
    }

    public function getOutgoingMaterials($from,$to){

        if ($this->dbDriver === 'pgsql') {
            $monthOut = "TO_CHAR(consumptions.created_at, 'YYYY-MM')";
        } elseif ($this->dbDriver === 'sqlite') {
            $monthOut = "strftime('%Y-%m', consumptions.created_at)";
        } else {
            $monthOut = "DATE_FORMAT(consumptions.created_at, '%Y-%m')";
        }

        return DB::table('consumptions')
            ->selectRaw("$monthOut as month , SUM(consumptions.quantity_used) as outgoing_quantity")
            ->whereBetween('consumptions.created_at' , [$from,$to])
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function($row){
                return [
                    'month' => $row->month,
                    'outgoing_quantity' => $row->outgoing_quantity
                ];
            });
    }


    public function getStockValueByCategory(){

        return DB::table('materials')
            ->join('categories', 'materials.category_id', '=', 'categories.id')
            ->select(
                'categories.name as category_name',
                DB::raw('SUM(materials.price * materials.stock_quantity) as total_stock_value')
            )
            ->groupBy('categories.name')
            ->orderByDesc('total_stock_value')
            ->get();
    }



    public function getCurrentStock($request){

        return DB::table('materials')
                    ->join('categories', 'materials.category_id', '=', 'categories.id')
                    ->join('brands', 'materials.brand_id', '=', 'brands.id')
                    ->select(
                        'materials.id',
                        'materials.name as material_name',
                        'brands.name as brand_name',
                        'categories.name as category_name',
                        'materials.stock_quantity',
                        'materials.min_stock',
                        DB::raw("CASE
                                    WHEN materials.stock_quantity <= materials.min_stock THEN 'Low Stock'
                                    ELSE 'In Stock'
                                END as status")
                    )
                    ->when($request->input('category_id'), function ($query, $categoryId) {
                        $query->where('materials.category_id', $categoryId);
                    })
                    ->orderBy('materials.name')
                    ->get();
    }


    public function getPurchaseHistory($from , $to){

        return DB::table('purchases')
                ->join('suppliers', 'purchases.supplier_id', '=', 'suppliers.id')
                ->select(
                    'purchases.id',
                    'purchases.purchase_date',
                    'suppliers.name as supplier_name',
                    'purchases.net_amount as total_amount',
                    'purchases.payment_status as status'
                )
                ->when([$from , $to], function ($query) use ($from , $to) {
                    $query->whereBetween('purchases.purchase_date', [$from, $to]);
                })
                ->orderByDesc('purchases.purchase_date')
                ->limit(100)
                ->get();

    }


    public function getStockMovements($request){

        return DB::table('stock_movements')
                ->join('materials', 'stock_movements.material_id', '=', 'materials.id')
                ->select(
                    'stock_movements.movement_date as date',
                    'stock_movements.type',
                    'stock_movements.quantity',
                    'materials.name as material_name',
                    'stock_movements.raison'
                )
                ->when($request->input('material_id'), function ($query, $materialId) {
                    $query->where('stock_movements.material_id', $materialId);
                })
                ->orderByDesc('stock_movements.movement_date')
                ->limit(100)
                ->get();
    }
}
