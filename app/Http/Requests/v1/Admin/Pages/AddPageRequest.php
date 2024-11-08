<?php

namespace App\Http\Requests\v1\Admin\Pages;

use Illuminate\Foundation\Http\FormRequest;

class AddPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_page_id' => 'nullable|exists:pages,id',
            'blocks' => 'required|array',
            'blocks.*.name' => 'required|string|max:255',
            'blocks.*.component' => 'required|array',
            'blocks.*.component.name' => 'required|string|max:255',
            'blocks.*.component.component_id' => 'required|integer|exists:components,id'
        ];
    }
}
