<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    //
    protected $fillable =[
        'material_id',
        'supplier_id',
        'quantity',
        'unit_price',
        'total_price',
        'discount_percentage',
        'discount_amount',
        'purchase_date',
    ];


    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function purchaseItems(){
        return $this->hasMany(PurchaseItems::class, 'material_id');
    }


}

