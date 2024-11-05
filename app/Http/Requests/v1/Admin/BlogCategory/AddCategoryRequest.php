<?php

namespace App\Http\Requests\v1\Admin\BlogCategory;

use Illuminate\Foundation\Http\FormRequest;

class AddCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'slug' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|boolean',
        ];
    }
}
