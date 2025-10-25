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
        Schema::create('consumptions', function (Blueprint $table) {
            $table->id();

                $table->foreignId('stock_movement_id')->nullable()->constrained('stock_movements');

                // $table->foreignId('prosthesis_case_id')->constrained('prosthesis_cases')->cascadeOnDelete();

                $table->foreignId('material_id')->constrained('materials')->cascadeOnDelete();

                $table->foreignId('technician_id')->nullable()->constrained('users')->nullOnDelete();

                $table->integer('quantity_used');
                $table->decimal('unit_cost', 12, 2);  // locked at consumption time (FIFO or WAC)
                $table->decimal('total_cost', 12, 2); // quantity_used * unit_cost
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consumptions');
    }
};
