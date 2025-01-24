<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\SaveOnboardingDataRequest;
use App\Http\Requests\v1\User\UpdateDisplayNameRequest;
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

    public function getDisplayName()
    {
        $user = auth()->user();

        $data = [
            "name" => $user->name
        ];

        return $this->success(
            data: $data,
            message: "User Name fetched successfully"
        );
    }

    public function updateDisplayName(UpdateDisplayNameRequest $request)
    {
        $data = $request->validated();
        $name = $data['name'];

        $this->service->updateDisplayName(
            id: auth()->id(),
            name: $name
        );

        $data = [
            "name" => $name
        ];

        return $this->success(
            data: $data,
            message: "Display Name updated successfully"
        );
    }
}
