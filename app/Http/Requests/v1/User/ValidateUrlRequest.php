<?php

namespace App\Http\Requests\v1\User;

use Illuminate\Foundation\Http\FormRequest;

class ValidateUrlRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'url' => [
                'required',
                'url',
                'max:2048',
                'regex:/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?(\?[^\s]*)?$/'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'url.regex' => 'We\'ll need a valid URL, like "https://yourbrnd.com/niceurl"',
            'url.url' => 'We\'ll need a valid URL, like "https://yourbrnd.com/niceurl"',
        ];
    }
}
