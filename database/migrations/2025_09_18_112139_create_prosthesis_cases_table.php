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
            $table->foreignId('patient_id')->constrained('patients')->noActionOnDelete();
            $table->string('doctor_id')->constrained('doctors')->noActionOnDelete();
            $table->foreignId('technician_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('assistant')->nullable();
            $table->string('description')->nullable(); // crown, bridge, etc
            $table->date('received_date')->nullable();
            $table->date('delivered_date')->nullable();
            $table->decimal('total_price', 10, 2)->nullable();
            $table->enum('status', ['pending', 'in_progress', 'delivered'])->default('pending');

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
