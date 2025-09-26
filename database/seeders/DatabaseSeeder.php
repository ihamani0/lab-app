<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Doctor;
use App\Models\Material;
use App\Models\Patient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Doctor::factory(10)->create();
        Patient::factory(20)->create();
            // 1. Create 5 categories
        $categories = Category::factory()->count(5)->create();

        // 2. Create 10 brands
        $brands = Brand::factory()->count(10)->create([
            'category_id' => $categories->random()->id, // pick random category
        ]);

        // 3. Create 50 products
        Material::factory()->count(50)->create([
            'category_id' => $categories->random()->id, // pick random category
            'brand_id' => $brands->random()->id,       // pick random brand
        ]);
    }
}
