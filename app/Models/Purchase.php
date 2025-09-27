<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use SoftDeletes;
    //
    protected $fillable =[
        'supplier_id',
        "invoice_number",
        "purchase_date",
        "status",

        "subtotal_amount",
        "discount_amount",
        "tax_amount",
        "net_amount",

        "paid_amount",
        "payment_status",

    ];

    // 🔗 Relationships
    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function purchaseItems(){
        return $this->hasMany(PurchaseItems::class, 'material_id');
    }

        public function payments()
    {
        return $this->hasMany(PurchasePayment::class);
    }


}

