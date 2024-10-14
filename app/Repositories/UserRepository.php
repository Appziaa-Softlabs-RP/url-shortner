<?php

namespace App\Repositories;

use App\Externals\RewardsAuthApi;
use App\Models\PinCode;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserRepository
{

    // External Apis
    protected RewardsAuthApi $rewardsAuthApi;

    public function __construct(
        RewardsAuthApi $rewardsAuthApi
    ) {
        $this->rewardsAuthApi = $rewardsAuthApi;
    }

    public function store(array $data, string $otpId, string $type): User
    {
        $mainServerData = [
            'type' => $type,
            'company_id' => env('COMPANY_ID'),
            'first_name' => $data['company_name'], //Change according to app's need
            'email' => isset($data['email']) ? $data['email'] : null,
            'phone' => isset($data['phone']) ? $data['phone'] : null,
            'password' => isset($data['password']) ? bcrypt($data['password']) : null,
            'otp_id' => $otpId,
        ];

        $mainServerResponse = $this->rewardsAuthApi->register($mainServerData, $type);

        // Creating user in local database
        $userData = [
            'rewards_id' => $mainServerResponse['rewards_id'],
            'business_age' => $data['business_age'],
            'pin_code_id' => PinCode::where('pin_code', $data['pin_code'])->first()->id,
        ];

        return User::create($userData);
    }

    public function updatePassword(User $user, string $password): User
    {
        $user->password = bcrypt($password);
        $user->save();
        return $user;
    }
}
