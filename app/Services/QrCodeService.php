<?php

namespace App\Services;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class QrCodeService
{
    public function generateQrCode(string $longUrl, int $userId): string
    {
        // Generate unique QR code file name
        $fileName = 'qr_code_' . md5($longUrl . $userId) . '.png';
        $path = storage_path('app/public/qr_codes/' . $fileName);

        // Generate the QR code and save it
        QrCode::format('png')->size(200)->generate($longUrl, $path);

        return $fileName;
    }
}
