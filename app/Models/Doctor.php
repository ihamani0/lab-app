<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'cabine'
    ];

    public function patients(){
        return $this->hasMany(Patient::class, 'doctor_id');
    }

}
