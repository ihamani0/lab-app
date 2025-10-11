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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prosthesis_case_id')->constrained('prosthesis_cases')->cascadeOnDelete();

            $table->decimal('total_cost', 10, 2)->default(0); // auto-updated sum from case_items
            $table->decimal('paid_amount', 10, 2)->default(0); // sum from payments
            $table->enum('payment_status', ['unpaid', 'partial', 'paid'])->default('unpaid');

            $table->date('payment_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
