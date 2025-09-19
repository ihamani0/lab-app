<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
     protected $fillable = [
        'prosthesis_case_id', 'amount', 'payment_date', 'status',
    ];

    public function case()
    {
        return $this->belongsTo(ProsthesisCase::class, 'prosthesis_case_id');
    }
}
