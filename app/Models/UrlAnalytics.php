<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UrlAnalytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'url_id',
        'ip_address',
        'country_code',
        'city',
        'device',
    ];

    public function url()
    {
        return $this->belongsTo(Url::class);
    }
}
