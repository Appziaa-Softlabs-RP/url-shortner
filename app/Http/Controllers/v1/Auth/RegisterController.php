<?php

namespace App\Http\Controllers\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Auth\RegisterRequest;
use App\Http\Requests\v1\Auth\VerifyOtpRequest;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use App\Services\Auth\RegisterService;
use App\Services\OtpService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    use HttpResponse;

    // Services
    protected OtpService $otpService;
    protected RegisterService $registerService;

    public function __construct(
        OtpService $otpService,
        RegisterService $registerService
    ) {
        $this->otpService = $otpService;
        $this->registerService = $registerService;
    }

    public function registerRequest(RegisterRequest $request)
    {
        try {
            $validated = $request->validated();

            $responseData = $this->otpService
                ->sendOtpRequest($validated, $validated['type']);

            $otpId = $responseData['otp_id'];

            // store user data in user_temp_details table
            $this->registerService->createUserTempDetails(
                $validated,
                $otpId
            );

            return $this->success(
                message: "OTP sent successfully",
                data: $responseData
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 500,
            );
        }
    }

    public function registerVerify(VerifyOtpRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();

            $user = $this->registerService->registerVerify(
                data:$validated,
                type: $request->type
            );

            return $this->success(
                message: "User registered successfully",
                data: $user
            );

        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 500,
            );
        }
    }
}
