<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CaseInvoice extends Model  implements HasMedia
{
    //
    use InteractsWithMedia;

    public static $TVA = 0;
    public static $DISCOUNT = 0 ;

    protected $fillable =[
        'invoice_number' , 'prosthesis_case_id' , 'total_amount' , 'tva_amount' , 'discount_amount', 'net_amount', 'invoice_date', 'status', 'payment_status'
    ];



    public function case(){
        return $this->belongsTo(ProsthesisCase::class, 'prosthesis_case_id');
    }


}
