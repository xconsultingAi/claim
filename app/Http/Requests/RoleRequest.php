<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
                'name' => 'required|string:roles,name',
                'permissions' => 'required|array',
            ];
        }else if($this->method() == 'PUT'){
            $roleID = $this->segment(2);
            return [
                'name' => 'required|string:roles,name,' . $roleID,
                'permissions' => 'required|array',
            ];
        }else{
            //
        }
    }

    public function messages()
    {
        return [
            'name.required' => 'Role name is required.',
            'name.unique' => 'Role name is already exist in the system.',
            'permissions.required' => 'Role Permissions are required.'
        ];
    }
}
