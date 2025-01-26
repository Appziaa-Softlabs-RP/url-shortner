<?php

namespace App\Repositories;

use App\Models\QrCode;
use Illuminate\Support\Facades\Storage;

class QrCodeRepository
{

    public function getForUserId($userId)
    {
        return QrCode::where('user_id', $userId)->get();
    }


    public function createQrCode(int $userId, string $longUrl, string $qrCodePath)
    {
        return QrCode::create([
            'user_id' => $userId,
            'long_url' => $longUrl,
            'qr_code_path' => $qrCodePath
        ]);
    }

    public function deleteByUserId(int $userId)
    {
        $qrCode = QrCode::where('user_id', $userId)->first();
        if ($qrCode) {
            Storage::delete('public/qr_codes/' . $qrCode->qr_code_path);
            $qrCode->delete();
        }
    }

    public function getByUserIdAndLongUrl(int $userId, string $longUrl)
    {
        return QrCode::where('user_id', $userId)
            ->where('long_url', $longUrl)
            ->first();
    }
}
