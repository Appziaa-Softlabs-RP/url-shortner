<?php

namespace App\Http\Controllers\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Auth\ForgotPasswordRequest;
use App\Http\Requests\v1\Auth\ForgotPasswordSendOtpRequest;
use App\Http\Traits\HttpResponse;
use App\Services\Auth\ForgotPasswordService;
use App\Services\OtpService;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use HttpResponse;

    protected ForgotPasswordService $forgotPasswordService;
    protected OtpService $otpService;

    public function __construct(
        ForgotPasswordService $forgotPasswordService,
        OtpService $otpService
    )
    {
        $this->forgotPasswordService = $forgotPasswordService;
        $this->otpService = $otpService;
    }

    public function forgotPasswordRequest(ForgotPasswordSendOtpRequest $request)
    {
        try {
            $validated = $request->validated();

            $responseData = $this->otpService
                ->sendOtpRequest($validated, 'phone');

            return $this->success(
                data: $responseData,
                message: "Otp Send Successfully!",
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
            );
        }
    }

    public function forgotPasswordVerify(ForgotPasswordRequest $request)
    {
        try {
            $validated = $request->validated();

            $responseData = $this->forgotPasswordService
                ->forgotPassOtpVerify($validated, 'phone');

            return $this->success(
                data: $responseData,
                message: "Password Changed Successfully.",
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
            );
        }
    }
}
