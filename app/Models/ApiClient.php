<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ApiClient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'app_url',
        'description',
        'token',
        'is_active',
    ];

    protected static function boot()
    {
        parent::boot();

        // Automatically generate a token when a new ApiClient is created
        static::creating(function ($model) {
            do {
                $token = Str::random(60);
            } while (self::where('token', $token)->exists());

            $model->token = $token;
        });
    }

    /**
     * Get the user associated with this API client.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
