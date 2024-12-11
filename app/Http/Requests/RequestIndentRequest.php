<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestIndentRequest extends FormRequest
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
            'medicine_id' => 'required',
            'supplier_pharmacy_id' => 'required', 
            'receiver_pharmacy_id' => 'required', 
            'quantity' => 'required|numeric',
        ];
    }
}
