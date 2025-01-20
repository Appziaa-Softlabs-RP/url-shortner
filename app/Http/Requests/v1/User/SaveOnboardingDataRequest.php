<?php

namespace App\Http\Requests\v1\User;

use Illuminate\Foundation\Http\FormRequest;

class SaveOnboardingDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'nullable',
                'string',
                'max:255'
            ],
            'industry' => [
                'nullable',
                'string',
                'max:255'
            ],
            'intended_use' => [
                'nullable',
                'json'
            ],
            'team_size' => [
                'nullable',
                'string',
                'max:255'
            ],
            'company_role' => [
                'nullable',
                'string',
                'max:255'
            ]
        ];
    }
}
