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
        'cabine',
        'specialty'
        ,'user_id','in_clinic'
    ];

    public function patients(){
        return $this->hasMany(Patient::class, 'doctor_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function cases(){
        return $this->hasMany(ProsthesisCase::class, 'doctor_id');
    }
   


}
