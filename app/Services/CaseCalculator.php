<?php

namespace App\Services;

use App\Models\ProsthesisCase;

class CaseCalculator {


     public function recalculate(ProsthesisCase $case) : ProsthesisCase{

        $subtotal = 0.0 ;

        foreach($case->CaseItems as $item){
            $quantity = (float)$item->quantity;
            $unit_price = (float)$item->unit_price;

            $lineSubtotal = $quantity * $unit_price ;

            $subtotal += $lineSubtotal;
        }

        $case->total_cost = round($subtotal , 2);

        $case->saveQuietly();

        return $case;
     }

}
