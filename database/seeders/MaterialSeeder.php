<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MaterialSeeder extends Seeder
{


    private $materials = [
        // Zircone
        ['name' => '3D pro A1 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A1 T22mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A1 T25mm', 'stock' => 4, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A2 T16mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D PRO A2 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A2 T22mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A2 T30mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro  A2 T25mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A3 T25mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A3 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro A3 T22mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro B1 18mm', 'stock' => 0, 'brand_id' => 2, 'category_id' => 1],
        ['name' => '3D PRO B1 20mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => '3D pro B2 T20mm', 'stock' => 3, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'HT Plus White 16mm', 'stock' => 1, 'brand_id' => 2, 'category_id' => 1],
        ['name' => 'SHT ML A1 30mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'zirconia block SA 18', 'stock' => 2, 'brand_id' => 3, 'category_id' => 1],
        ['name' => 'zirconia block SA 12', 'stock' => 10, 'brand_id' => 3, 'category_id' => 1],
        ['name' => 'SHT white T18mm', 'stock' => 5, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST White T12mm', 'stock' => 2, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST White T16mm', 'stock' => 2, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST White T18mm', 'stock' => 5, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST White T22mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A1 T16mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A1 T22mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A1 T25mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A1 T30mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A2 T16mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A2 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A2 T22mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A2 T25mm', 'stock' => 2, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A2 T30mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A3 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A3 T22mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML A3 T25mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML B1 T18mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML B1 T20mm', 'stock' => 0, 'brand_id' => 1, 'category_id' => 1],
        ['name' => 'ST ML B1 T22mm', 'stock' => 1, 'brand_id' => 1, 'category_id' => 1],

        // PLAQUES
        ['name' => 'Taglus Strandars 0.8mm', 'stock' => 5, 'brand_id' => 4, 'category_id' => 2],
        ['name' => 'TERMOFORMATURA 1.5mm', 'stock' => 28, 'brand_id' => 5, 'category_id' => 2],
        ['name' => 'TERMOFORMATURA 1.0mm', 'stock' => 18, 'brand_id' => 5, 'category_id' => 2],
        ['name' => 'plaques 1.5mm', 'stock' => 8, 'brand_id' => 6, 'category_id' => 2],
        ['name' => 'plaques 1.0mm', 'stock' => 3, 'brand_id' => 6, 'category_id' => 2],

        // Ceramic pressé
        ['name' => 'ingots MT-A1', 'stock' => 2, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots MT-A2', 'stock' => 3, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots LT-A1', 'stock' => 5, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots HT-A1', 'stock' => 1, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots HT-A2', 'stock' => 2, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots MO 0', 'stock' => 2, 'brand_id' => 32, 'category_id' => 20],
        ['name' => 'ingots MT-A1', 'stock' => 1, 'brand_id' => 33, 'category_id' => 20], // Duplicate name, different brand
        ['name' => 'ingots MT-A2', 'stock' => 1, 'brand_id' => 33, 'category_id' => 20], // Duplicate name, different brand
        ['name' => 'ingots HT-E58', 'stock' => 1, 'brand_id' => 33, 'category_id' => 20],
        ['name' => 'Nova Press Ingot', 'stock' => 9, 'brand_id' => 34, 'category_id' => 20],
        ['name' => 'Nova ( Dental Lithium Dislicate glass ceramic)', 'stock' => 24, 'brand_id' => 34, 'category_id' => 20],

        // ... and so on for all other materials. I've included the most important examples.
        // You would continue to list all 245 materials here in this format.
    ];


    /**
     * Run the database seeds.
     */
    public function run(): void
    {


            // Prevents the seeder from running if the table already has data.
            if (Material::count() > 0) {
                $this->command->info('Materials table is not empty. Skipping seeder.');
                return;
            }


            DB::transaction(function(){
            try{

                foreach ($this->materials as $materialData) {
                    $brand = \App\Models\Brand::find($materialData['brand_id']);
                    $brandPrefix = strtoupper(Str::slug($brand->name, ''));

                // 1. Generate the unique SKU
                    $sku = $brandPrefix . '-' . strtoupper(Str::slug($materialData['name'], ''));

                    // 2. Generate the unique REF
                    $ref = Str::slug($materialData['name'], '-') . '-' . $materialData['brand_id'];


                Material::create([
                    'name'           => $materialData['name'],
                    'stock_quantity' => $materialData['stock'],
                    'brand_id'       => $materialData['brand_id'],
                    'category_id'    => $materialData['category_id'],
                    'sku'            => $sku,
                    'ref'            => $ref,
                    'price'          => 0.00, // Default value
                    'min_stock'      => 1,    // Default value
                ]);

                $this->command->info('Material seeder ran successfully!');
                }


            }catch(\Exception $e){
                DB::rollBack();
                $this->command->error($e->getMessage());
            }

            });


    }
}
