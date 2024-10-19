<?php

namespace App\Repositories;

use App\Models\UserTempDetail;

class UserTempRepository
{
    public function store(array $data): UserTempDetail
    {
        $userTmp = UserTempDetail::create($data);
        // store password in encrypted form
        if (isset($data['password'])) {
            $userTmp->password = bcrypt($data['password']);
            $userTmp->update();
        }

        return $userTmp;
    }

    public function getTempDetailsOnOtpId(string $otp_id): ?UserTempDetail
    {
        return UserTempDetail::where('otp_id', $otp_id)->first();
    }
}
