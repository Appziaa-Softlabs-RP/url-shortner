<?php

namespace App\Http\Controllers\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Auth\LoginEmailRequest;
use App\Http\Requests\v1\Auth\LoginPhoneOtpRequest;
use App\Http\Requests\v1\Auth\LoginPhoneRequest;
use App\Http\Traits\HttpResponse;
use App\Services\Auth\LoginService;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    use HttpResponse;

    protected LoginService $loginService;
    protected OtpService $otpService;

    public function __construct(
        LoginService $loginService,
        OtpService $otpService
    )
    {
        $this->loginService = $loginService;
        $this->otpService = $otpService;
    }

    public function loginEmail(LoginEmailRequest $request)
    {
        try {
            $credentials = $request->validated();

            $responseData = $this->loginService->login($credentials);
            if ($responseData) {
                return $this->success(
                    data: $responseData,
                    message: "User logged in successfully",
                );
            }

            return $this->error(
                message: "Invalid credentials",
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
            );
        }
    }

    public function loginWithOtpRequest(LoginPhoneRequest $request)
    {
        try {
            $validated = $request->validated();

            $responseData = $this->otpService
                ->sendOtpRequest($validated, $validated['type']);

            return $this->success(
                data: $responseData,
                message: "OTP Sent Successfully!",
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
            );
        }
    }

    public function loginOtpVerify(LoginPhoneOtpRequest $request)
    {
        try {
            $validated = $request->validated();

            $responseData = $this->loginService
                ->loginOtpVerify($validated);

            Log::info(json_encode($responseData));

            return $this->success(
                data: $responseData,
                message: "User logged in successfully",
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
            );
        }
    }

}
