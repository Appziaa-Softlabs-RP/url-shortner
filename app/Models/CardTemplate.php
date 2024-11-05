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
        'type',
        'vertical_front_template',
        'horizontal_front_template',
        'vertical_back_template',
        'horizontal_back_template',
        'status',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
