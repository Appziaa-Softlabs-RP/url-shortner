<?php

namespace App\Http\Requests\v1\Ai;

use Illuminate\Foundation\Http\FormRequest;

class CompareCvRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'job_description' => 'required|string',
            'pdfs' => 'required|array|max:5',
            'pdfs.*' => [
                'required',
                'file',
                'mimes:pdf',
                'max:2048'
            ]
        ];
    }
}
