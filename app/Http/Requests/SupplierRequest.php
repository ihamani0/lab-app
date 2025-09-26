<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
class SupplierRequest extends FormRequest
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

        $supplierId = $this->route('supplier')?->id;

        return [
            'name'          => [
                                'required' , 'string','max:255',
                                    Rule::unique('suppliers', 'name' )->ignore($supplierId)
                                ],
            'email'         => [
                                    'nullable' , 'email','max:255',
                                    Rule::unique('suppliers', 'email' )->ignore($supplierId)
                                ],
            'phone'         => 'nullable|string|regex:/^[0-9\-\+\s\(\)]+$/|max:20',
            'address'       => 'nullable|string|max:255',
            'description'   => 'nullable|string|max:255',
            'facebook'      => 'nullable|string|max:255',
            'instagram'     => 'nullable|string|max:255',
            'whatsapp'      => 'nullable|string|max:255',
            'website'       => 'nullable|string|max:255',
            'logo'          => [
                                'nullable',
                                File::image()->max(2048), // 2MB max
                                ],
        ];
    }
}
