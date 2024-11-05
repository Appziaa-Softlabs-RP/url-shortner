<?php

namespace App\Rules\v1\user;

use App\Externals\verificationApi;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateUserPhoneInMainServer implements ValidationRule
{
    protected VerificationApi $verificationApi;

    protected $phone;

    public function __construct($phone, VerificationApi $verificationApi)
    {
        $this->phone = $phone;
        $this->verificationApi = $verificationApi;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Use the Externals service to validate the phone number
        if (! $this->verificationApi->isUserPhoneExists(
            phone: $this->phone
        )) {
            $fail('This phone number does not exist.');
        }
    }
}
