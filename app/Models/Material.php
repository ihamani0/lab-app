<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{

    protected $fillable = [
        'name',
        'description',
        'image',
        'brand_id',
        'category_id',
        'unit',
        'stock_quantity',
    ];
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function purchases(){
        return $this->hasMany(Purchase::class, 'material_id');
    }


    

}
