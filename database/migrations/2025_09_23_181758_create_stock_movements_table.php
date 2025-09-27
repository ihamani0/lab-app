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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('material_id')->constrained('materials')->cascadeOnDelete();
            $table->enum('type', ['purchase_in','consumption_out','adjustment']);
            $table->integer('quantity'); // + for purchase, - for consumption


            $table->string('batch_number')->nullable();
            $table->date('expiry_date')->nullable();

            

            $table->date('movement_date')->nullable();

             $table->morphs('related'); // e.g. link to purchase_item, work_order, adjustment


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
