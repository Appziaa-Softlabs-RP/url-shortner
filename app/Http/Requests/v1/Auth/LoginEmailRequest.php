<?php

namespace App\Http\Requests\v1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginEmailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        logger()->info("logging in...");
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ];
    }
}
