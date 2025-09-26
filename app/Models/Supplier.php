<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Supplier extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'email',
        'website',
        'description',
        'facebook',
        'instagram',
        'whatsapp',
    ];

    public function purchase(){
        return $this->hasMany(Purchase::class, 'supplier_id');
    }

    public function getlogoUrlAttribute()
    {
        return $this->getFirstMediaUrl('logo');
    }

}
