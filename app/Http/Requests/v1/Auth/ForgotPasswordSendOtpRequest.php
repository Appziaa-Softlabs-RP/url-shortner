<?php

namespace App\Http\Requests\v1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordSendOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'required|in:phone,email',
            'email' => 'nullable|email|exists:users,email',
            'phone' => 'nullable|digits:10|exists:users,phone',
        ];
    }
}
