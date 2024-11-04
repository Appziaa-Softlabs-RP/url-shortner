<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'priority',
        'credits',
        'template',
        'status'
    ];
}
