<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProsthesisCase extends Model
{

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'technician_id',
        'description',
        'received_date',
        'delivered_date',
        'total_price',
        'status',
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
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
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

}
