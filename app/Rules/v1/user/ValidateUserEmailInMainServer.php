<?php

namespace App\Rules\v1\user;

use App\Externals\VerificationApi;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateUserEmailInMainServer implements ValidationRule
{
    protected VerificationApi $verificationApi;

    protected $email;

    public function __construct($email, VerificationApi $verificationApi)
    {
        $this->email = $email;
        $this->verificationApi = $verificationApi;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Use the Externals service to validate the phone number
        if (! $this->verificationApi->isUserEmailExists(
            email: $this->email
        )) {
            $fail('This email does not exist.');
        }
    }
}
