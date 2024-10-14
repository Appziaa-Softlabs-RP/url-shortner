<?php

namespace App\Http\Requests\v1\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GenerateJobDescriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'job_title' => 'required|string',
            'industry' => 'nullable|string',
            'tone' => 'required|string',
        ];
    }
}
