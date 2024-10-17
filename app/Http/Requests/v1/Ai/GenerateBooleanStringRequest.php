<?php

namespace App\Http\Requests\v1\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GenerateBooleanStringRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'job_description' => [
                'required',
                'string',
                // 'max:255'
            ]
        ];
    }
}
