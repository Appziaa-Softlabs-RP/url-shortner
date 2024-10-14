<?php

namespace App\Repositories;

use App\Models\UserTempDetail;

class UserTempRepository
{
    public function store(array $data): UserTempDetail
    {
        $user = UserTempDetail::create($data);
        // store password in encrypted form
        if (isset($data['password'])) {
            $user->password = bcrypt($data['password']);
            $user->update();
        }

        return $user;
    }

    public function getTempDetailsOnOtpId(string $otp_id): ?UserTempDetail
    {
        return UserTempDetail::where('otp_id', $otp_id)->first();
    }
}
