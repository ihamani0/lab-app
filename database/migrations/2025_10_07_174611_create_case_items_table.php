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
        Schema::create('case_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prosthesis_case_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained('services');
            $table->foreignId('technician_id')->nullable()->constrained('users');

            $table->string('tooth_number')->nullable();

            $table->text('description')->nullable(); // e.g., "Zirconia Crown, Shade A2"

            $table->string('shade')->nullable(); //  Shade A2"
            $table->string('disk_type')->nullable(); //  Shade 3d Pro "

            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->enum('status', [
                'pending', 'in_progress', 'completed', 'quality_check', 'remake'
            ])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_items');
    }
};
