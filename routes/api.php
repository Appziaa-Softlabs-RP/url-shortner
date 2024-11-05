<?php

use App\Http\Controllers\v1\Auth\ForgotPasswordController;
use App\Http\Controllers\v1\Auth\LoginController;
use App\Http\Controllers\v1\Auth\LogoutController;
use App\Http\Controllers\v1\Auth\RegisterController;
use App\Http\Controllers\v1\Card\Admin\CardTemplateController;
use App\Http\Controllers\v1\Card\Admin\SocialLinkController;
use App\Http\Controllers\v1\Card\User\CardTemplateController as UserCardTemplateController;
use App\Models\CardTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    // Auth Controllers
    Route::controller(RegisterController::class)->group(function () {
        Route::post('/register-request', 'registerRequest');
        Route::post('/register-verify', 'registerVerify');
    });
    Route::controller(LoginController::class)->group(function () {
        Route::post('/login-email', 'loginEmail');
        Route::post('/login-otp-request', 'loginWithOtpRequest');
        Route::post('/login-otp-verify', 'loginOtpVerify');
        Route::post('/login-pin', 'loginPin');
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

    // Auth Routes
    Route::middleware('auth:api')->group(function () {
        Route::controller(UserCardTemplateController::class)->group(function () {
            Route::get('/card-templates', 'index');
        });
        Route::group(['middleware' => 'isAdmin'], function () {
            Route::prefix('admin')->group(function () {
                Route::resource('card-social-links', SocialLinkController::class)->only([
                    'index', 'store', 'show', 'update', 'destroy'
                ]);
                Route::resource('card-templates', CardTemplateController::class)->only([
                    'index', 'store', 'show', 'update', 'destroy'
                ]);
            });
        });
    });
});
