<?php

namespace App\Externals;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OtpApi
{
    public function sendOtp(array $data, string $type): ?array
    {
        $body = [
            'type' => $type,
            'company_id' => env('COMPANY_ID'),
        ];

        if ($type === 'email') {
            $body['email'] = $data['email'];
        } else {
            $body['phone'] = $data['phone'];
        }


        // Send POST request to the root server
        $response = Http::post(env('MAIN_SERVER_URL') . '/api/v1/sendOtp', $body);

        // Check if the request was successful
        if ($response->successful()) {
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to send OTP');

        return null;
    }

    public function verifyOtp(array $data)
    {
        $body = [
            'otp_id' => $data['otp_id'],
            'otp' => $data['otp'],
        ];

        // Send POST request to the root server
        $response = Http::post(env('MAIN_SERVER_URL') . '/api/v1/verifyOtpWithoutLogin', $body);

        // Check if the request was successful
        if ($response->successful()) {
            Log::info('OTP API Response: ' . json_encode($response->json('data')));
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to verify OTP');

        return false;
    }
}
