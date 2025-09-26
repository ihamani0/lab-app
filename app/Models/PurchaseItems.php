<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseItems extends Model
{


    protected $fillable =[
        "purchase_id",
        'material_id',
        'quantity',
        "remaining_quantity",
        'unit_price',
        'total_price',
        'discount_percentage',
        'discount_amount',
        'purchase_date',
    ];



    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
