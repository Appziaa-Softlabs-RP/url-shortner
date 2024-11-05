<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PinCode extends Model
{
    use HasFactory;

    protected $table = 'pin_codes';

    protected $fillable = [
        'name',
        'pin_code',
        'district_id',
    ];

    public function district()
    {
        return $this->belongsTo(District::class);
    }
}
