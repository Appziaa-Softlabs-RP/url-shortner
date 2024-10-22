<?php

use App\Http\Controllers\v1\Ai\CompareCvController;
use App\Http\Controllers\v1\Ai\JobDescriptionController;
use App\Http\Controllers\v1\Ai\PreScreeningQuestionsController;
use App\Http\Controllers\v1\Ai\ToolsController;
use App\Http\Controllers\v1\Auth\AuthController;
use App\Http\Controllers\v1\Auth\ForgotPasswordController;
use App\Http\Controllers\v1\Auth\LoginController;
use App\Http\Controllers\v1\Auth\LogoutController;
use App\Http\Controllers\v1\Auth\RegisterController;
use App\Models\Specialization;
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

    // AI Controllers
    Route::controller(CompareCvController::class)->group(function () {
        Route::post('compare-cv', 'compare');
        Route::post('candiate-fit-score', 'calculateCandidateFitScore');
    });
    Route::controller(JobDescriptionController::class)->group(function () {
        Route::post('generate-job-description', 'generate');
    });
    Route::controller(PreScreeningQuestionsController::class)->group(function () {
        Route::post('generate-prescreening-questions', 'generateQuestion');
        Route::post('generate-prescreening-question-answer', 'generateAnswer');
    });
    Route::controller(ToolsController::class)->group(function () {
        Route::post('get-boolean-string', 'generateBooleanString');
    });

    // Auth Routes
    Route::middleware('auth:api')->group(function () {
        //Routes
    });
});
