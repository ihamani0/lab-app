<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = [
        'name',
        'descrption',
    ];


    public function brand(){
        return $this->hasMany(Brand::class, 'category_id');
    }
}
