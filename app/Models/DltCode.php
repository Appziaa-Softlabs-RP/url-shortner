<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DltCode extends Model
{
    use HasFactory;

    protected $table="dlt_codes";

    protected $fillable = [
        'company_name',
        'code',
        'status'
    ];
}