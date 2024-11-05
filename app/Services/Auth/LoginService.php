<?php

namespace App\Services\Auth;

use App\Externals\RewardsAuthApi;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Auth;

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

        if (! $userMain) {
            throw new \Exception('Failed to get user details');
        }

        $data = [
            'user' => $userMain['user'],
            'token' => $token,
        ];

        return $data;
    }

    public function login(array $data): array
    {
        $userMain = $this->rewards->login($data);

        if (! $userMain) {
            throw new \Exception('Failed to login user');
        }

        $user = User::where('rewards_id', $userMain['user']['rewards_id'])->first();

        if ($user) {
            // updating token in db
            $user->update([
                'main_server_token' => $userMain['token'],
            ]);

            return $this->authenticate($user);
        }

        throw new \Exception('User not found');
    }

    public function loginOtpVerify(array $data)
    {
        $userMain = $this->rewards->loginWithOtp($data);

        if (! $userMain) {
            throw new \Exception('Failed to login user');
        }

        $user = User::where('rewards_id', $userMain['rewards_id'])->first();

        if ($user) {
            return $this->authenticate($user);
        }

        throw new \Exception('User not found');
    }
}
