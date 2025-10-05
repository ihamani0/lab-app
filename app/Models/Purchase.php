<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Purchase extends Model implements HasMedia
{

    use SoftDeletes ,  InteractsWithMedia;
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

    protected $casts = [
    'purchase_date' => 'date',
    'subtotal_amount'  => 'float',
    'discount_amount'  => 'float',
    'tax_amount'       => 'float',
    'net_amount'       => 'float',
    'paid_amount'      => 'float',
        ];


    // 🔗 Relationships
    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function purchaseItems(){
        return $this->hasMany(PurchaseItems::class, 'purchase_id');
    }

        public function payments()
    {
        return $this->hasMany(PurchasePayment::class);
    }


    public function getInvoiceUrlAttribute()
    {
        return $this->getFirstMediaUrl('invoices'); // returns full URL if exists, empty string otherwise
    }

    protected $appends = ['invoice_url'];


}

