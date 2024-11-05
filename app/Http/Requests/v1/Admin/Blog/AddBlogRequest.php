<?php

namespace App\Http\Requests\v1\Admin\Blog;

use Illuminate\Foundation\Http\FormRequest;

class AddBlogRequest extends FormRequest
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
            'image' => 'required|image',
            'content' => 'required|string',
            'category_id' => 'required|integer|exists:blog_categories,id',
            'slug' => 'required|string|unique:blogs,slug',
            'status' => 'required|boolean',
        ];
    }
}
