<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseInvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
        public function toArray(Request $request): array{

        return [
            'id' => $this->id ,
            'invoice_number' => $this->invoice_number ,
            'total_amount' => $this->total_amount ,
            'tva_amount' => $this->tva_amount ,
            'discount_amount' => $this->discount_amount ,
            'net_amount' => $this->net_amount ,
            'invoice_date' => $this->invoice_date ? $this->invoice_date : null ,
            'status' => $this->status ,
            'payment_status' => $this->payment_status ,

            'case' => $this->case ?[

                    'id' => $this->case->id,
                    'case_number' => $this->case->case_number,
                    //fetech doctor relation
                    'patient' => [
                        'id' => $this->case->patient->id,
                        'name' => $this->case->patient->name,
                    ],
                    //fetech doctor relation
                    'doctor'=> [
                        'id' => $this->case->doctor->id,
                        'name' => $this->case->doctor->name,
                        'email' => $this->case->doctor->email,
                    ] ,
                    'technician'=> [
                        'id' => $this->case->technician->id,
                        'name' => $this->case->technician->name,
                    ] ,
                    'description' => $this->case->description,

                    'received_date' => $this->case->received_date ? $this->case->received_date : null,

                        'case_items' => $this->case->CaseItems ?  $this->case->CaseItems->map(function($item){
                            return [
                                'id' => $item->id,
                                'quantity' => $item->quantity,
                                'unit_price' => $item->unit_price,
                                'service' => $item->service ? [
                                    'id' => $item->service->id,
                                    'name' => $item->service->name,
                                ] : null,
                            ];
                        })  : [] ,

                    ] : null ,
                ];
    }
}
