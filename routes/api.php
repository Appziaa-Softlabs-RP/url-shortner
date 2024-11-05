<?php

use App\Http\Controllers\v1\Admin\BlogCategoryController;
use App\Http\Controllers\v1\Admin\BlogController;
use App\Http\Controllers\v1\Auth\ForgotPasswordController;
use App\Http\Controllers\v1\Auth\LoginController;
use App\Http\Controllers\v1\Auth\LogoutController;
use App\Http\Controllers\v1\Auth\RegisterController;
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
        Route::group(['middleware' => 'isAdmin'], function () {
            Route::prefix('admin')->group(function () {
                Route::apiResource('blog-categories', BlogCategoryController::class);
                Route::apiResource('blogs', BlogController::class);
            });
        });
    });
});
