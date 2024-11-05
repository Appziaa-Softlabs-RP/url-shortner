<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTempDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'otp_id',
        'salutation',
        'first_name',
        'last_name',
        'phone',
        'email',
        'password',
    ];
}
