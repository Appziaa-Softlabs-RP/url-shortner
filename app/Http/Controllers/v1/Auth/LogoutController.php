<?php

namespace App\Http\Controllers\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\Auth\LogoutService;

class LogoutController extends Controller
{
    use HttpResponse;

    protected LogoutService $logoutService;

    public function __construct(
        LogoutService $logoutService
    ) {
        $this->logoutService = $logoutService;
    }

    public function logout()
    {
        if (! $this->logoutService->logout()) {
            return $this->error(
                message: 'User not found',
            );
        }

        return $this->success(
            message: 'User logged out successfully',
        );
    }
}
