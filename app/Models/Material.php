<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Milon\Barcode\DNS1D;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Material extends Model implements HasMedia
{
    use HasFactory;

    use InteractsWithMedia;

    public const SKU_PREFIX = 'MT-';

    protected $fillable = [
        'sku',
        'name',
        'description',
        'brand_id',
        'category_id',
        'unit',
        'stock_quantity',
        'min_stock',
        'price' // Added this since you're using it in the controller
    ];

    // Relationships
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }


    public function purchaseItems(){
        return $this->hasMany(PurchaseItems::class, 'material_id');
    }

    public function consumptions(){
        return $this->hasMany(Consumption::class, 'material_id');
    }

    public function stockMovements(){
        return $this->hasMany(StockMovement::class, 'material_id');
    }


    public function latestStockMovement(){
        return $this->hasOne(StockMovement::class, 'material_id')->latestOfMany("movement_date");
    }


    protected static function booted()
    {
        static::created(function ($product) {
            $product->generateCodes();
        });
    }

    public function generateCodes()
        {
            try {



            // --- BARCODE ---
            $dns1d = new DNS1D();
            $barcode = $dns1d->getBarcodePNG($this->sku, 'C128');

            if ($barcode) {
                $barcodePath = storage_path("app/public/material/barcodes/{$this->sku}.png");

                // Create directory if it doesn't exist
                $dir = dirname($barcodePath);
                if (!file_exists($dir)) {
                    mkdir($dir, 0755, true);
                }

                file_put_contents($barcodePath, base64_decode($barcode));

                if (file_exists($barcodePath)) {
                    $this->addMedia($barcodePath)
                        ->toMediaCollection('barcodes');
                }
            }

            // --- QR CODE ---
            $qrPath = storage_path("app/public/material/qrcodes/{$this->id}_qrcode.png");

            // Create directory if it doesn't exist
            $dir = dirname($qrPath);
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }

            $result = Builder::create()
                ->writer(new PngWriter())
                ->data(route('materials.index-decrement', $this->id))
                ->size(300)
                ->margin(10)
                ->build();

            $result->saveToFile($qrPath);

            if (file_exists($qrPath)) {
                $this->addMedia($qrPath)
                    ->toMediaCollection('qrcodes');
            }
            }catch(\Exception $e){
                Log::error('Error generating codes: ' . $e->getMessage());
            }
        }


            // Register media collections with custom paths
    public function registerMediaCollections(): void
    {
        $this
        ->addMediaCollection('images')
        ->singleFile()
        ->useDisk('public');

        $this
            ->addMediaCollection('barcodes')
            ->singleFile()
            ->useDisk('public');

        $this
            ->addMediaCollection('qrcodes')
            ->singleFile()
            ->useDisk('public');
    }

    // public function  registerMediaConversions(?Media $media = null): void
    // {
    //     $this
    //         ->addMediaConversion('thumb')
    //         ->width(150)
    //         ->height(150)
    //         ->sharpen(10)
    //         ->nonQueued(); // optional - generate immediately
    // }


    public function getBarcodeUrlAttribute()
    {
        return $this->getFirstMediaUrl('barcodes');
    }

    public function getQrCodeUrlAttribute()
    {
        return $this->getFirstMediaUrl('qrcodes');
    }

    public function getQrPathAttribute()
    {
        return public_path("storage/material/qrcodes/{$this->id}_qrcode.png");
    }


    public function getImageUrlAttribute()
    {
        return $this->getFirstMediaUrl('images');
    }









}
