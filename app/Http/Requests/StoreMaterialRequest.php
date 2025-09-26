<?php

namespace App\Http\Requests;

use App\Models\Material;
use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // It's a good practice to add authorization logic here.
        // For example: return $this->user()->can('create', Material::class);
        return true; // For now, we'll allow everyone.
    }

    public function prepareForValidation(){
        if ($this->filled('sku')) {
            $this->merge([
                'sku' => Material::SKU_PREFIX . ltrim($this->sku, Material::SKU_PREFIX)
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sku'            => ['required', 'unique:materials,sku'],
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string|max:255',
            'brand_id'       => 'required|integer|exists:brands,id',
            'category_id'    => 'required|integer|exists:categories,id',
            'unit'           => 'required|string|max:255',
            'min_stock'      => 'required|integer|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'price'          => 'nullable|numeric|min:0',
            'image'          => [
                'nullable',
                File::image()->max(2048), // 2MB max
            ],
        ];
    }
}
