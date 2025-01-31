<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

class Url extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'long_url',
        'title',
        'short_code',
        'dlt_id',
        'clicks',
        'ip',
        'country_code',
        'city',
        'location',
        'device'
    ];

    // Append the custom attribute `short_url` to the model's array and JSON output
    protected $appends = ['short_url'];

    public function getShortUrlAttribute()
    {
        return env('APP_URL') . '/' . $this->short_code;
    }

    /**
     * Create a new URL record with automatic metadata.
     *
     * @param array $data
     * @return \App\Models\Url
     */
    public function create(array $data)
    {
        // Add IP Address
        $data['ip'] = request()->ip();

        // Add Geolocation (Country, City, Location)
        $ip = $data['ip'];
        // Handle localhost/private IPs
        if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            $ip = '8.8.8.8'; // Use Google's DNS as fallback for testing
        }

        try {
            $location = Location::get($ip);
            $data['country_code'] = $location?->countryCode ?? null;
            $data['city'] = $location?->cityName ?? null;
            $data['location'] = ($location?->latitude && $location?->longitude)
                ? "{$location->latitude},{$location->longitude}"
                : null;
        } catch (\Exception $e) {
            logger()->error("Location detection failed: " . $e->getMessage());
            $data['country_code'] = null;
            $data['city'] = null;
            $data['location'] = null;
        }

        // Add Device Information
        $agent = new Agent();
        $device = $agent->device();
        $platform = $agent->platform();
        $browser = $agent->browser();

        $data['device'] = "{$device} on {$platform} using {$browser}";

        // Save and return the record
        return parent::create($data);
    }

    public function analytics()
    {
        return $this->hasMany(UrlAnalytics::class);
    }
}
