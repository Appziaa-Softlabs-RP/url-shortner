<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\SaveOnboardingDataRequest;
use App\Http\Traits\HttpResponse;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use HttpResponse;

    protected UserService $service;

    public function __construct(
        UserService $service
    ) {
        $this->service = $service;
    }

    public function saveOnboarding(SaveOnboardingDataRequest $request)
    {
        $data = $request->validated();

        $data['is_onboarding_done'] = true;

        $user = $this->service->update(
            id: auth()->id(),
            data: $data
        );

        return $this->success(
            data: $data,
            message: "Onboarding data saved successfully"
        );
    }

    public function getOnboardingStatus()
    {
        $data = [
            "is_onboarding_done" => $this->service->getUserOnboardingStatus(auth()->id())
        ];
        return $this->success(
            data: $data,
            message: null
        );
    }
}
