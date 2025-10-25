<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consumption extends Model
{
    protected $fillable = [
        'prosthesis_case_id',
        'material_id',
        'technician_id',
        'quantity_used','unit_cost' , 'total_cost'
    ];

    public function prothesicCase(){
        return $this->belongsTo(ProsthesisCase::class, 'prosthesis_case_id');
    }
    public function material(){
        return $this->belongsTo(Material::class, 'material_id');
    }
    public function technician(){
        return $this->belongsTo(User::class, 'technician_id');
    }
}
