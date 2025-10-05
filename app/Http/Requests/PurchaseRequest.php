<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function messages()
    {
        return [
            'items.required'               => 'At leaset one Item is required.',
            'items.*.material_id.required' => 'Each item must have a material selected.',
            'items.*.material_id.exists'   => 'The selected material does not exist.',
            'items.*.quantity.required'    => 'Each item must include a quantity.',
            'items.*.price.required'       => 'Each item must include a price.',
        ];
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $purchaseId = $this->route('purchase')?->id;

        return [
            'supplier_id'                => 'nullable|exists:suppliers,id',
            'invoice_number'             => [
                'required' ,
                'string' ,
                Rule::unique('purchases' , 'invoice_number')->ignore($purchaseId)],

            'invoice_date'               => 'nullable|date',
            'tax'                        => 'nullable|string',

            'invoice_pdf'                => 'nullable|file|mimes:pdf|max:2048',

            'items'                      => ['required', 'array', 'min:1'],
            'items.*.material_id'        => ['required', 'exists:materials,id'],
            'items.*.ordered_quantity'   => ['required', 'numeric', 'min:1'],
            'items.*.unit_price'         => ['required', 'numeric', 'min:0'],
            'items.*.discount_percentage'=> ['nullable', 'numeric', 'min:0', 'max:100'],
            'items.*.tax_percentage'     => ['nullable', 'numeric', 'min:0', 'max:100'],
            'items.*.batch_number'       => ['nullable', 'string'],
            'items.*.expiry_date'        => ['nullable', 'date'],
            'items.*.received_quantity' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}

