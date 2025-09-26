<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique()->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('brand_id')->constrained('brands')->noActionOnDelete();
            $table->foreignId('category_id')->constrained('categories')->noActionOnDelete();
            $table->string('unit')->default('piece'); // gram, ml, disk, etc

            $table->decimal('price', 10, 2); // السعر عند الشراء
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock')->default(0);
            $table->string('barcode')->nullable();        // raw barcode string (e.g. SKU)
            $table->string('qr_code')->nullable();        // path to generated QR image file
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
