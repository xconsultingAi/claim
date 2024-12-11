<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MedicineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'drug_name' => 'required|string|nullable', 
            'strength' => 'required|string|nullable', 
            // 'type' => 'required|nullable', 
            // 'manufacturer_id' => 'required|numeric|nullable',
            // 'dosage_form_id' => 'required|numeric|nullable', 
            // 'prescription_required' => 'in:1,0|nullable', 
            // 'description' => 'required|string|nullable',
        ];
    }
}
