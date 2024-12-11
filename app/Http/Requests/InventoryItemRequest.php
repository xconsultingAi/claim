<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryItemRequest extends FormRequest
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
            'item_id' => 'required|numeric', 
            // 'batch_number' => 'required|string',
            // 'unit_price' => 'required|numeric',
            // 'sale_price' => 'required|numeric',
            // 'quantity' => 'required|numeric',
            // 'quantity_unit' => 'required|string',
            // 'expiration_date' => 'required|date',
            // 'manufacturing_date' => 'required|date',
            // 'location' => 'required|string',
            // 'tax_rate' => 'required|numeric',
        ];
    }
}
