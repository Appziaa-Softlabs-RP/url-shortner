<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'long_url',
        'qr_code_path',
    ];

    protected $appends = [
        'qr_code'
    ];

    public function getQrCodeAttribute()
    {
        return url('storage/qr_codes/' . $this->attributes['qr_code_path']);
    }
}
