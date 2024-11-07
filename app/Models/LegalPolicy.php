<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegalPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file',
    ];

    public function getFileAttribute($value)
    {
        return url('storage/policies/files/' . $value);
    }
}
