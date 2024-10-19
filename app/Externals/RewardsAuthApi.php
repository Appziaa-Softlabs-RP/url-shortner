<?php

namespace App\Externals;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RewardsAuthApi
{

    public function register(array $data, $type)
    {
        $data['type'] = $type;
        Log::info('RewardsAuthApi register data: ' . json_encode($data));

        // Send POST request to the root server
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->post(env('MAIN_SERVER_URL') . "/api/v1/register", $data);

        // Check if the request was successful
        if ($response->successful()) {
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to register user');
    }

    public function login(array $data)
    {
        $body = [
            'email' => $data['email'],
            'password' => $data['password'],
            'is_pass_encrypted' => 1,
            'company_id' => env('COMPANY_ID'),
        ];

        // Send POST request to the root server
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->post(env('MAIN_SERVER_URL') . "/api/v1/login-user", $body);

        // Check if the request was successful
        if ($response->successful()) {
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to login user');
    }

    public function loginWithOtp(array $data)
    {
        $body = [
            'otp_id' => $data['otp_id'],
            'otp' => $data['otp'],
            'company_id' => env('COMPANY_ID'),
        ];

        // Send POST request to the root server
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->post(env('MAIN_SERVER_URL') . "/api/v1/login-user-otp-verify", $body);

        // Check if the request was successful
        if ($response->successful()) {
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to login user');
    }

    public function getUserDetailsByRewardsId($rewardsId)
    {
        // Send POST request to the root server
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->get(env('MAIN_SERVER_URL') . "/api/v1/get-user-details-by-rewards-id/" . $rewardsId);

        // Check if the request was successful
        if ($response->successful()) {
            return $response->json('data');
        }

        // throw error
        throw new \Exception($response->json('message') ?? 'Failed to get user details');
    }

}
