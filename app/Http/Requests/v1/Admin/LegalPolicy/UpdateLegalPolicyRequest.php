<?php

namespace App\Http\Requests\v1\Admin\LegalPolicy;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLegalPolicyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'file' => 'nullable|file',
        ];
    }
}
