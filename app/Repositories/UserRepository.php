<?php

namespace App\Repositories;

use App\Externals\RewardsAuthApi;
use App\Models\User;

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
            'email' => isset($data['email']) ? $data['email'] : null,
            'password' => isset($data['password']) ? $data['password'] : null,
            'otp_id' => $otpId,
        ];

        $mainServerResponse = $this->rewardsAuthApi->register($mainServerData, $type);

        // Creating user in local database
        $userData = [
            'rewards_id' => $mainServerResponse['user']['rewards_id'],
        ];

        return User::create($userData);
    }

    public function updatePassword(User $user, string $password): User
    {
        $user->password = bcrypt($password);
        $user->save();

        return $user;
    }

    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);

        // Fill the model with the provided data
        $user->fill($data);

        // Save the updated model
        $user->save();

        // Return the updated user
        return $user;
    }

    public function getUserOnboardingStatus(int $id): bool
    {
        $user = User::findOrFail($id);
        return $user->is_onboarding_done;
    }


    public function addUserCredits(string $rewardsId, int $credits): User
    {
        $user = User::where('rewards_id', $rewardsId)->firstOrFail();
        $user->available_credits += $credits;
        $user->save();

        return $user;
    }

    public function deductUserCredits(string $rewardsId, int $credits): User
    {
        $user = User::where('rewards_id', $rewardsId)->firstOrFail();
        if ($user->available_credits < $credits) {
            throw new \Exception('Insufficient credits');
        }
        $user->available_credits -= $credits;
        $user->save();

        return $user;
    }

    public function addInitialCredits(User $user): User
    {
        $user->available_credits = 500;
        $user->save();

        return $user;
    }
}
