<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'material_id' , 'type' , 'quantity' , 'raison' ,  'movement_date' , 'related'
    ];

    public function Material(){
        return $this->belongsTo(Material::class , "material_id" );
    }

    



}
