<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginWithPinTemp extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'phone',
        'otp_id'
    ];
}
