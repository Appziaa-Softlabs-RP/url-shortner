<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected UserRepository $repository;

    public function __construct(
        UserRepository $repository
    ) {
        $this->repository = $repository;
    }

    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function getUserOnboardingStatus(int $id)
    {
        return $this->repository->getUserOnboardingStatus($id);
    }
}
