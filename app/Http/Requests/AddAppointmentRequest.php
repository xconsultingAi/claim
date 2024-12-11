<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddAppointmentRequest extends FormRequest
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
            // "doctor_user_id"  => 'required|integer',
            // "patient_user_id"  => 'required|integer',
            // "start"  => 'required|date',
            // // "starttime"  => 'required|string',
            // "end"  => 'required|date',
            //  "type"  => 'required|string',
        ];
    }
    /**
     * @return array|string[]
     */
    public function messages()
    {
        return [
            "doctor_user_id.required" => "Doctor field is required.",
            "patient_user_id.required" => "Doctor field is required.",
            "start.required" => "Start date field is required.",
            "starttime.required" => "Start time field is required.",
            "end.required" => "Duration field is required.",
            "type.required"  => 'Visit type is required',
        ];
    }
}
