<?php

namespace App\Services\Auth;

use App\Externals\OtpApi;
use App\Models\UserTempDetail;
use App\Repositories\UserRepository;
use App\Repositories\UserTempRepository;
use App\Services\OtpService;
use Illuminate\Support\Facades\Log;

class RegisterService
{
    // Repositories
    protected UserTempRepository $userTempRepository;
    protected UserRepository $userRepository;

    // Services
    protected OtpService $otpService;

    public function __construct(
        UserRepository $userRepository,
        UserTempRepository $userTempRepository,
        OtpService $otpService
    ) {
        $this->userRepository = $userRepository;
        $this->userTempRepository = $userTempRepository;
        $this->otpService = $otpService;
    }

    public function createUserTempDetails(array $data, $otpId)
    {
        $data['otp_id'] = $otpId;
        $this->userTempRepository->store($data);
    }

    public function registerVerify(array $data, $type)
    {
        // verified details contains email or phone
        $verifiedDetail = $this->otpService->verifyTempDetail(
            data: $data,
            type: $type
        );

        $userTmpDetails = null;

        $userTmpDetails = $this->userTempRepository->getTempDetailsOnOtpId($data['otp_id']);

        if(!$userTmpDetails) {
            throw new \Exception('Details not found');
        }

        // storing user
        $user = $this->userRepository->store(
            data: $userTmpDetails->toArray(),
            type: $type,
            otpId: $data['otp_id']
        );

        // adding user inital credits
        $this->userRepository->addInitialCredits($user);

        return $user;

    }
}
