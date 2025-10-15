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
        Schema::create('case_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('prosthesis_case_id')->constrained('prosthesis_cases')->cascadeOnDelete();
            $table->decimal('total_amount', 10, 2);
            $table->decimal('tva_amount', 10, 2)->nullable();
            $table->decimal('discount_amount', 10, 2)->nullable();
            $table->decimal('net_amount', 10, 2)->nullable();
            $table->date('invoice_date')->default(now());
            $table->string('status')->default('draft');
            $table->string('payment_status')->default('unpaid');
            $table->date('payment_date')->nullable();
            $table->string('pdf_path')->nullable(); // if you store invoice files with spatie/media
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_invoices');
    }
};
