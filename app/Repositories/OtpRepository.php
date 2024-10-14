<?php

namespace App\Repositories;

use App\Models\LoginWithPinTemp;
use Illuminate\Support\Facades\Log;

class OtpRepository
{

    public function storeTempEmail(array $data, $otpId): LoginWithPinTemp
    {
        return LoginWithPinTemp::create([
            'email' => $data['email'],
            'otp_id' => $otpId,
        ]);
    }

    public function storeTempPhone(array $data, $otpId): LoginWithPinTemp
    {
        return LoginWithPinTemp::create([
            'phone' => $data['phone'],
            'otp_id' => $otpId,
        ]);
    }

    public function getTempDetails(array $data, string $type): ?string
    {
        $temp = LoginWithPinTemp::where('otp_id', $data['otp_id'])
            ->first();

        $detail = null;

        if ($temp) {
            $detail = $type === 'email' ? $temp->email : $temp->phone;
        }

        if (!$detail) {
            throw new \Exception('Invalid OTP');
        }

        return $detail;
    }

    public function deleteTempDetails(array $data): bool
    {
        return LoginWithPinTemp::where('otp_id', $data['otp_id'])
            ->delete();
    }

}
