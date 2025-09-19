<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{

    protected $fillable = [
        'name',
        'description',
        'category_id',
    ];


    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }




}
