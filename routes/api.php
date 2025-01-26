<?php

use App\Http\Controllers\v1\Auth\ForgotPasswordController;
use App\Http\Controllers\v1\Auth\LoginController;
use App\Http\Controllers\v1\Auth\LogoutController;
use App\Http\Controllers\v1\Auth\RegisterController;
use App\Http\Controllers\v1\UrlController;
use App\Http\Controllers\v1\User\ApiClientController;
use App\Http\Controllers\v1\User\UrlController as UserUrlController;
use App\Http\Controllers\v1\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/shorten', [UrlController::class, 'shorten']);

Route::prefix('v1')->group(function () {
    Route::middleware('validate.url.shortening.api.token')->group(function () {
        Route::post('shorten', [UserUrlController::class, 'store']);
    });

    // Auth Controllers
    Route::controller(LoginController::class)->group(function () {
        Route::post('/login-email', 'loginEmail');
    });
    Route::controller(RegisterController::class)->group(function () {
        Route::post('/register-request', 'registerRequest');
        Route::post('/register-verify', 'registerVerify');
    });
    Route::controller(ForgotPasswordController::class)->group(function () {
        Route::post('/forgot-password-request', 'forgotPasswordRequest');
        Route::post('/forgot-password-verify', 'forgotPasswordVerify');
    });
    Route::controller(LogoutController::class)->group(function () {
        Route::middleware('auth:api')->group(function () {
            Route::post('/logout', 'logout');
        });
    });

    // Route::post('/shorten', [UrlController::class, 'shorten']);
    Route::post('/fetch-title', [UrlController::class, 'fetchTitle']);

    // Auth Routes
    Route::middleware('auth:api')->group(function () {
        // User Routes
        Route::prefix('user')->group(function () {
            Route::apiResource('urls', UserUrlController::class);
            Route::controller(UserUrlController::class)->group(function () {
                Route::post('validate-auth-user-url', 'validateAuthUserUrl');
                Route::get('get-analytics', 'getAllUrlAnalytics');
            });
            Route::controller(UserController::class)->group(function () {
                Route::post('save-user-onboarding', 'saveOnboarding');
                Route::get('get-onboarding-status', 'getOnboardingStatus');
                Route::get('display-name', 'getDisplayName');
                Route::put('display-name', 'updateDisplayName');
            });
            // api access routes
            Route::apiResource('    ', ApiClientController::class);
        });
        Route::group(['middleware' => 'isAdmin'], function () {
            Route::prefix('admin')->group(function () {
                // Admin Routes
            });
        });
    });
});
