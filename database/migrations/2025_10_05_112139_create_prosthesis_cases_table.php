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
        Schema::create('prosthesis_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case_number')->unique();

            $table->foreignId('patient_id')->constrained('patients')->noActionOnDelete();
            $table->foreignId('doctor_id')->constrained('doctors')->noActionOnDelete();

            $table->foreignId('technician_id')->nullable()->constrained('users')->nullOnDelete();
            
            $table->string('assistant')->nullable();

            $table->string('description')->nullable(); // crown, bridge, etc
            $table->date('received_date')->nullable();
            $table->date('delivered_date')->nullable();

            $table->decimal('total_cost', 10, 2)->default(0); // auto-updated sum from case_items
            $table->decimal('paid_amount', 10, 2)->default(0); // sum from payments
            $table->enum('payment_status', ['unpaid', 'partial', 'paid'])->default('unpaid');


            $table->enum('status', [
                'pending', 'in_progress', 'completed', 'delivered', 'on_hold', 'canceled'
            ])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prosthesis_cases');
    }
};
