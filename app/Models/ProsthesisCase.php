<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProsthesisCase extends Model
{

    protected $fillable = [
        'case_number',
        'patient_id',
        'doctor_id',
        'technician_id',
        'description',
        'received_date',
        'delivered_date',
        'status','assistant',
    ];

        /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'received_date' => 'date',
            'delivered_date' => 'date',
        ];
    }


    protected static function booted(){

        static::creating(function($model){
            $model->case_number = 'CAS-'.self::generateCaseNumber();
        });

    }

    protected static function generateCaseNumber(){
        do{
            $code = date('ymd') . '-' . random_int(1000, 9999);
        }while(self::where('case_number',  strval($code))->exists());
        return strval($code) ;
    }


    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function consumptions()
    {
        return $this->hasMany(Consumption::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function CaseItems(){
        return $this->hasMany(CaseItem::class , 'prosthesis_case_id');
    }




}
