<?php

namespace App\Http\Requests\v1\Admin\Blog;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
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
            'content' => 'required|string',
            'category_id' => 'required|integer|exists:blog_categories,id',
            'slug' => [
                'required',
                'string'
            ],
            'status' => 'required|boolean',
        ];
    }
}
