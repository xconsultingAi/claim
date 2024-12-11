<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuperPermissionsRequest extends FormRequest
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
        if($this->method() == 'POST'){
            return [
                'permissions_id' => 'unique:hms_has_permission',
            ];
        }else if($this->method() == 'PUT'){
            $permissionId = $this->segment(3);
            return [
                'permissions_id' => 'unique:hms_has_permission' . $permissionId,
            ];
        }else if($this->method() == 'DELETE'){
            $permissionId = $this->segment(3);
            return [
            'permissions_id' => 'exists:hms_has_permission'  . $permissionId,
            ];
        }
    }
}
