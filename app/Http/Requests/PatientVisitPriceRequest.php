<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientVisitPriceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'patient_type_id' => 'required|numeric',
            'department_type_id' => 'required|numeric',
            'clinical_service_id' => 'required|numeric', 
            'status' => 'required|string|in:active,in_active',
        ];
    }
}
