<?php

namespace App\Exports;

use App\Models\Material;
use Maatwebsite\Excel\Concerns\FromCollection;

class MaterialsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Material::with(['category', 'brand'])->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'SKU',
            'Name',
            'Description',
            'Price',
            'Stock Quantity',
            'Unit',
            'Category',
            'Brand',
            'Created At',
        ];
    }

        public function map($material): array
    {
        return [
            $material->id,
            $material->sku,
            $material->name,
            $material->description,
            $material->price,
            $material->stock_quantity,
            $material->unit,
            $material->category?->name,
            $material->brand?->name,
            $material->created_at->format('Y-m-d H:i'),
        ];
    }
}
