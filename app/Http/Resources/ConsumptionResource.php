<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsumptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity_used,
            'unit_price' => $this->unit_cost,
            'total_cost' => $this->total_cost,
            'material' => $this->material ? [
                'id' => $this->material->id,
                'sku' => $this->material->sku,
                'ref' => $this->material->ref,
                'lot' => $this->material->lot,
                'name' => $this->material->name,
                'stock_quantity' => $this->material->stock_quantity,
            ] : null,
            'created_at' => $this->created_at ? $this->created_at->format('M d, Y') : null,
        ];
    }
}

