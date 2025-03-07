<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermissionRequest extends FormRequest
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
                'name' => 'required|string|unique:permissions,name',
            ];
        }else if($this->method() == 'PUT'){
            $permissionId = $this->segment(2);
            return [
                'name' => 'required|string|unique:permissions,name,' . $permissionId,
            ];
        }else{
            //
        }
    }
}
