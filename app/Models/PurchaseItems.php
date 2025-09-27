<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseItems extends Model
{


    protected $fillable =[
        'purchase_id',
        'material_id',
        'ordered_quantity',
        'received_quantity',
        'remaining_quantity', // calcula auto
        'unit_price', //from user
        'discount_percentage', //from user
        'discount_amount', // calcula auto
        'tax_percentage', // from user
        'tax_amount', // cacule auto
        'total_price', // cacule auto
        'batch_number', //from user
        'expiry_date',//from user
    ];




    public function material(){
        return $this->belongsTo(Material::class, 'material_id');
    }
    public function purchase(){
        return $this->belongsTo(Purchase::class, 'purchase_id');
    }

    protected static function booted(){
        static::saving(function($item){
            $subtotal = $item->unit_price * $item->ordered_quantity;

            $item->discount_amount = $subtotal * ($item->discount_percentage / 100);

            $item->tax_amount = ($subtotal - $item->discount_amount) * ($item->tax_percentage / 100);

            $item->total_price = $subtotal - $item->discount_amount + $item->tax_amount;

            // Auto-fill remaining quantity
            if ($item->remaining_quantity === null) {
                $item->remaining_quantity = $item->ordered_quantity - $item->received_quantity;
            }
        });
    }
}
