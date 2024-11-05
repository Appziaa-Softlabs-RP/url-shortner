<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\OtpService;

class ForgotPasswordService
{
    // Services
    protected OtpService $otpService;

    // Repository
    protected UserRepository $userRepository;

    public function __construct(
        OtpService $otpService,
        UserRepository $userRepository
    ) {
        $this->otpService = $otpService;
        $this->userRepository = $userRepository;
    }

    public function forgotPassOtpVerify(array $data, $type): User
    {
        $verifiedDetail = $this->otpService->verifyTempDetail(
            data: $data,
            type: $type
        );

        $user = null;
        if ($type === 'email') {
            $user = User::where('email', $verifiedDetail)->first();
        } else {
            $user = User::where('phone', $verifiedDetail)->first();
        }

        if (! $user) {
            throw new \Exception('User not found');
        }

        return $this->userRepository->updatePassword($user, $data['password']);
    }
}
