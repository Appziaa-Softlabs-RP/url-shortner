<?php

namespace App\Http\Requests\v1\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePrescreeningModalAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question' => 'required|string'
        ];
    }
}
