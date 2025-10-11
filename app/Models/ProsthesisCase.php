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
            $model->case_number = self::generateCaseNumber();
        });

    }

    protected static function generateCaseNumber(){
        do{
            $code = random_int(1000000 , 9999999);
        }while(self::where('case_number', $code)->exists());
        return $code ;
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
