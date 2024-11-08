<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockField extends Model
{
    use HasFactory;

    protected $fillable = [
        'block_id',
        'field_type'
    ];

}
