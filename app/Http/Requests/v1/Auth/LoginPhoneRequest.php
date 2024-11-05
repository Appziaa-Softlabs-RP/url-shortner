<?php

namespace App\Http\Requests\v1\Auth;

use App\Externals\VerificationApi;
use App\Rules\v1\user\ValidateUserEmailInMainServer;
use App\Rules\v1\user\ValidateUserPhoneInMainServer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class LoginPhoneRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        Log::info(json_encode($this->input('email')));

        return [
            'type' => [
                'required',
                'string',
                'in:phone,email',
            ],
            'phone' => [
                'required_if:type,phone',
                'string',
                new ValidateUserPhoneInMainServer(
                    $this->input('phone'),
                    new VerificationApi()
                ),
            ],
            'email' => [
                'required_if:type,email',
                'string',
                new ValidateUserEmailInMainServer(
                    $this->input('email'),
                    new VerificationApi()
                ),
            ],
        ];
    }
}
