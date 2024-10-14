<?php

namespace App\Http\Requests\v1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'otp_id' => "required|string",
            'otp' => "required|string|digits:6",
            'type' => "required|string|in:email,phone",
        ];
    }
}
