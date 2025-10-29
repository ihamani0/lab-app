<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ConsumptionRepository
{

    public function aggregated($start, $end, $search = null){

        $query = DB::table('consumptions')
                    ->join('materials', 'consumptions.material_id', '=', 'materials.id')
                    ->whereBetween('consumptions.created_at' , [$start , $end])
                    ->select(
                        'materials.name as material_name' ,
                    DB::raw('SUM(consumptions.quantity_used) as total_qty') ,
                    DB::raw('SUM(consumptions.total_cost) as total_cost') ,
                    DB::raw('ROUND(
                        CASE
                            WHEN SUM(consumptions.quantity_used) = 0 THEN 0
                            ELSE SUM(consumptions.total_cost) / SUM(consumptions.quantity_used)
                        END, 2
                    ) as avg_cost')

                    )
                    ->groupBy('materials.name')
                    ->orderByDesc('total_qty');
                    ;
        if ($search) {
            $query->where('materials.name', 'like', "%{$search}%")
                ->orWhere('materials.sku', 'like', "%{$search}%");
        }

        return $query;
    }
}
