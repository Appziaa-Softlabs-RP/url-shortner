<?php

namespace App\Services;

use App\Externals\OtpApi;
use App\Models\LoginWithPinTemp;
use App\Repositories\OtpRepository;

class OtpService
{
    protected $otpId = null;

    // Externals
    protected OtpApi $otpApi;

    // Repositories
    protected OtpRepository $otpRepository;

    public function __construct(
        OtpApi $otpApi,
        OtpRepository $otpRepository
    ) {
        $this->otpApi = $otpApi;
        $this->otpRepository = $otpRepository;
    }

    public function sendOtp(array $data, string $type)
    {
        // calling otp api
        $data = $this->otpApi->sendOtp($data, $type);

        return $data['otpId'];
    }

    public function sendOtpRequest(array $data, string $type)
    {
        $responseData = $this->sendOtp(
            data: $data,
            type: $type
        );

        $this->otpId = $responseData;

        // Storing OTP Details in temp
        if ($type === 'email') {
            $this->createTempEmail(
                data: $data,
                otpId: $this->otpId
            );
        } else {
            $this->createTempPhone(
                data: $data,
                otpId: $this->otpId
            );
        }
        $otpData = [
            'otp_id' => $this->otpId,
        ];

        return $otpData;
    }

    public function createTempEmail(array $data, $otpId): LoginWithPinTemp
    {
        return $this->otpRepository->storeTempEmail($data, $otpId);
    }

    public function createTempPhone(array $data, $otpId): LoginWithPinTemp
    {
        return $this->otpRepository->storeTempPhone($data, $otpId);
    }

    public function verifyTempDetail(array $data, string $type)
    {
        $storedDetails = $this->otpRepository->getTempDetails(
            data: $data,
            type: $type
        );

        // Verify the OTP
        if ($this->otpApi->verifyOtp($data)) {
            $this->otpRepository->deleteTempDetails($data);

            return $storedDetails;
        } else {
            throw new \Exception('Invalid OTP');
        }
    }

    public function verifyOtpForLogin(array $data)
    {
        return $this->otpApi->verifyOtp($data);
    }
}
