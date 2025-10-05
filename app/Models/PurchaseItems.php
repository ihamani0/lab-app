<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseItems extends Model
{


    protected $fillable =[
        'purchase_id',
        'material_id',
        'received_quantity',
        'remaining_quantity', // calcula auto
        'discount_amount', // calcula auto
        'tax_amount', // cacule auto
        'total_price', // calcule auto

        'ordered_quantity',//from user
        'unit_price', //from user
        'discount_percentage', //from user
        'tax_percentage', // from user
        'batch_number', //from user
        'expiry_date',//from user
    ];


    protected $casts = [
    'ordered_quantity'   => 'float',
    'unit_price'         => 'float',
    'discount_percentage'=> 'float',
    'tax_percentage'     => 'float',
    'discount_amount'    => 'float',
    'tax_amount'         => 'float',
    'total_price'        => 'float',
    'received_quantity'  => 'float',
    'remaining_quantity' => 'float',
    'expiry_date'         => 'datetime',
    ];

    public function material(){
        return $this->belongsTo(Material::class, 'material_id');
    }
    public function purchase(){
        return $this->belongsTo(Purchase::class, 'purchase_id');
    }


}
