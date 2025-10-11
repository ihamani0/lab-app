<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseRequest extends FormRequest
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
            'case_items.required'               => 'At leaset one Item is required.',
            'case_items.*.service_id.required'  => 'Each item must have a service selected.',
            'case_items.*.shade.required'       => 'Shade For Item is required.',
            'case_items.*.quantity.required'    => 'Each item must include a quantity.',
            'case_items.*.quantity.required'    => 'Each item must include a quantity.',
            'case_items.*.unit_price.required'  => 'Each item must include a price.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */


    public function rules(): array
    {
        return [
            'doctor_id'                 => 'required|exists:doctors,id',
            'patient_id'                => 'required|exists:patients,id',
            'technician_id'             => 'required|exists:users,id',
            'assistant'                 => 'required|string',
            'delivered_date'            => 'nullable|date',
            'description'               => 'nullable|string',
            'status'                    => 'nullable|string',
            'case_items'                => ['required', 'array', 'min:1'],
            'case_items.*.service_id'   => ['required', 'exists:services,id'],
            'case_items.*.shade'        => ['required'],
            'case_items.*.quantity'     => ['required'],
            'case_items.*.unit_price'   => ['required'],
            'case_items.*.status'       => ['required'],
        ];
    }
}
