<?php

namespace App\Http\Requests\v1\Admin\Card\Template;

use Illuminate\Foundation\Http\FormRequest;

class AddTemplateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'priority' => ['required', 'integer'],
            'credits' => ['required', 'integer'],
            'type' => ['required', 'in:vertical,horizontal,both'],
            'vertical_front_template' => ['nullable', 'string'],
            'vertical_back_template' => ['nullable', 'string'],
            'horizontal_front_template' => ['nullable', 'string'],
            'horizontal_back_template' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ];
    }
}
