<?php

namespace App\Services\Auth;

use App\Externals\RewardsAuthApi;
use App\Models\PinCode;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginService
{

    // Services
    protected OtpService $otpService;
    protected RewardsAuthApi $rewards;

    public function __construct(
        OtpService $otpService,
        RewardsAuthApi $rewards
    ) {
        $this->otpService = $otpService;
        $this->rewards = $rewards;
    }

    protected function authenticate($user): array
    {
        Auth::login($user);
        $token = $user->createToken('accessToken')->accessToken;

        $user = auth()->user();
        $rewards_id = User::find(auth()->user()->id)->rewards_id;

        // getting user details from main server
        $userMain = $this->rewards->getUserDetailsByRewardsId($rewards_id);

        // append extra fields

        if(!$userMain){
            throw new \Exception('Failed to get user details');
        }

        $userMain['business_age'] = $user->business_age;
        $userMain['pin_code_id'] = PinCode::find($user->pin_code_id)->pin_code;

        $data = [
            'user' => $userMain,
            'token' => $token
        ];

        return $data;
    }

    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return [];
        }

        if (!password_verify($data['password'], $user->password)) {
            return [];
        }

        return $this->authenticate($user);
    }

    public function loginOtpVerify(array $data)
    {
        $userMain = $this->rewards->loginWithOtp($data);

        if (!$userMain) {
            throw new \Exception('Failed to login user');
        }

        $user = User::where('rewards_id', $userMain['rewards_id'])->first();

        if($user){
            return $this->authenticate($user);
        }

        throw new \Exception('User not found');
    }

}
