<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaseItem extends Model
{
    protected $fillable =[
        'prosthesis_case_id',
        'service_id',
        'technician_id',
        'tooth_number',
        'description',
        'shade',
        'disk_type',
        'quantity',
        'unit_price',
        'status',
    ];



    public function service(){
        return $this->belongsTo(Service::class, 'service_id');
    }

}



