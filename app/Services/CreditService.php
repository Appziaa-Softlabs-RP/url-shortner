<?php

namespace App\Services;

use App\Repositories\UserRepository;

class CreditService
{
    protected UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }
}
