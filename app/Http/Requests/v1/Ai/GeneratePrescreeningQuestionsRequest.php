<?php

namespace App\Http\Requests\v1\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePrescreeningQuestionsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => 'required|string'
        ];
    }
}
