<?php

namespace App\Services\Auth;

use App\Models\User;

class LogoutService
{
    public function logout(): bool
    {
        $user = User::find('id', auth()->user()->id);

        if (!$user) {
            return false;
        }

        $user->tokens->each(function ($token) {
            $token->revoke();
        });

        return true;
    }
}
