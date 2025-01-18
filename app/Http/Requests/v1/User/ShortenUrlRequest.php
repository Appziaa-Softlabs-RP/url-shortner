<?php

namespace App\Http\Requests\v1\User;

use Illuminate\Foundation\Http\FormRequest;

class ShortenUrlRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'long_url' => [
                'required',
                'url',
                'max:2048',
                'regex:/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?(\?[^\s]*)?$/'
            ],
            'title' => [
                'nullable',
                'string',
                'max:255'
            ],
            'dlt_code' => [
                'nullable',
                'string',
                'exists:dlt_codes,code',
                'max:6'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'long_url.regex' => `We'll need a valid URL, like "https://yourbrnd.com/niceurl"`,
            'long_url.url' => `We'll need a valid URL, like "https://yourbrnd.com/niceurl"`,
        ];
    }
}
