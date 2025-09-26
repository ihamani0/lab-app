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
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();
             $table->foreignId('purchase_id')->constrained('purchases')->cascadeOnDelete();

            $table->foreignId('material_id')->constrained('materials')->cascadeOnDelete();

            $table->integer('quantity');
            $table->integer('remaining_quantity'); // tracks remaining from this lot
            $table->decimal('unit_price', 12, 2);
            $table->string('discount_percentage');
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
};
