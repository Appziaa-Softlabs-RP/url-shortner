<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_id',
        'name',
        'bio',
        'designation',
        'company',
        'email',
        'phone_no',
        'address',
        'dp',
        'logo',
    ];
}
