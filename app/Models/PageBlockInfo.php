<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageBlockInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_block_id',
        'field_type',
        'field_value'
    ];
}
