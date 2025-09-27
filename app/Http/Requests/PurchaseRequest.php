<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supplier_id'     => 'nullable|exists:suppliers,id',
            'invoice_number'  => 'nullable|string',
            'purchase_date'   => 'required|date',
            'discount_amount' => 'nullable|numeric',
            'tax_amount'      => 'nullable|numeric',
            'invoice_pdf'     => 'nullable|file|mimes:pdf|max:2048',
            'items' => ['required', 'array', 'min:1'],
            'items.*.material_id' => ['required', 'exists:materials,id'],
            'items.*.quantity' => ['required', 'numeric', 'min:1'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
            'items.*.discount' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'items.*.tax' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ];
    }
}
