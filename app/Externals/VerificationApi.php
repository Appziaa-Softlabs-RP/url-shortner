<?php

namespace App\Externals;

use Illuminate\Support\Facades\Http;

class VerificationApi
{
    public function isUserEmailExists(string $email): bool
    {
        $body = [
            'email' => $email,
            'company_id' => env('COMPANY_ID'),
        ];

        $response = Http::post(env('MAIN_SERVER_URL').'/api/v1/verify-user-email-exists', $body);

        if ($response->failed()) {
            return false;
        }

        return true;
    }

    public function isUserPhoneExists(string $phone): bool
    {
        $body = [
            'phone' => $phone,
            'company_id' => env('COMPANY_ID'),
        ];

        $response = Http::post(env('MAIN_SERVER_URL').'/api/v1/verify-user-phone-exists', $body);

        if ($response->failed()) {
            return false;
        }

        return true;
    }
}
