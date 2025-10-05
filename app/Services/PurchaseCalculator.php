<?php

namespace App\Services;

use App\Models\Purchase;

class PurchaseCalculator {



    public function recalculate(Purchase $purchase): Purchase {

        $subtotal = 0.0;
        $discount = 0.0;
        $tax = 0.0;


        foreach ($purchase->purchaseItems as $item) {
            $ordered   = (float) $item->ordered_quantity;
            $unit      = (float) $item->unit_price;
            $discPct   = (float) ($item->discount_percentage ?? 0);
            $taxPct    = (float) ($item->tax_percentage ?? 0);

            $lineSubtotal = $ordered * $unit;
            $lineDiscount = $lineSubtotal * ($discPct / 100);
            $lineTax      = ($lineSubtotal - $lineDiscount) * ($taxPct / 100);

            $subtotal += $lineSubtotal;
            $discount += $lineDiscount;
            $tax += $lineTax;


            // update item totals here if needed
            $item->discount_amount = round($lineDiscount, 2);
            $item->tax_amount      = round($lineTax, 2);
            $item->total_price     = round($lineSubtotal - $lineDiscount + $lineTax, 2);
            $item->saveQuietly();
        }



        $purchase->subtotal_amount  = round($subtotal, 2);
        $purchase->discount_amount  = round($discount, 2);
        $purchase->tax_amount       = round($tax, 2);
        $purchase->net_amount       = round($subtotal - $discount + $tax, 2);


        $paid = (float) ($purchase->paid_amount ?? 0);

         

        if ($paid >= $purchase->net_amount && $purchase->net_amount > 0) {
            $purchase->payment_status = 'paid';
        } elseif ($paid > 0) {
            $purchase->payment_status = 'partial';
        } else {
            $purchase->payment_status = 'unpaid';
        }

        $purchase->saveQuietly();

        return $purchase;

    }
}
