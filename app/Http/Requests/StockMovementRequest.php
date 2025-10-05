<?php

namespace App\Http\Requests;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StockMovementRequest extends FormRequest
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
            'material_id' => ['required', 'exists:materials,id'],
            'delta' => ['required', 'integer' ,'not_in:0'],
            'type' => ['required', 'in:purchase_in,consumption_out,adjustment'],
            'raison' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function withValidator(Validator $validator){
        $validator->after(function( $validator){
            $delta = (int)$this->input('delta');
            $type = $this->input('type');

            if($delta > 0 && !in_array($type , ['purchase_in' , 'adjustment'])){
                 return $validator->errors()->add('type', 'Positive stock changes must be purchase In or adjustment.');
            }

            if($delta < 0 && !in_array($type , ['consumption_out' , 'adjustment'])){
                 return $validator->errors()->add('type', 'Negative stock changes must be consumption Out or adjustment.');
            }
                        // ✅ Stock underflow rule
            if ($delta < 0) {
                $material = Material::find($this->input('material_id'));

                if ($material && $material->stock_quantity + $delta < 0) {
                    return $validator->errors()->add('delta', 'Not enough stock available for this operation.');
                }
            }
        });
    }
}
