<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'address',
        "doctor_id"
    ];


    public function doctor(){
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }



}
