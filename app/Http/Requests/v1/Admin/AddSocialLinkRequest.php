<?php

namespace App\Http\Requests\v1\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AddSocialLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'icon' => [
                'required',
                'mimes:jpeg,jpg,png,svg,xml',
                'max:2048',
            ],
            'status' => 'required|boolean',
        ];
    }
}
