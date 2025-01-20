<?php

namespace App\Services;

use App\Models\Url;
use App\Models\UrlAnalytics;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;
use Illuminate\Http\Request;

class UrlAnalyticsService
{
    public function recordAnalytics(Url $url)
    {
        // Increment the click count
        $url->increment('clicks');

        // Gather visitor information
        $ipAddress = request()->ip();
        $agent = new Agent();
        $device = $agent->device();
        $location = Location::get($ipAddress);

        // Record analytics
        UrlAnalytics::create([
            'url_id' => $url->id,
            'ip_address' => $ipAddress,
            'country_code' => $location->countryCode ?? null,
            'city' => $location->cityName ?? null,
            'device' => $device,
        ]);
    }


    public function getAnalyticsForUrl($urlId)
    {
        $totalVisits = UrlAnalytics::where('url_id', $urlId)->count();

        $dailyVisits = UrlAnalytics::selectRaw('DATE(created_at) as date, COUNT(*) as visits')
            ->where('url_id', $urlId)
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->take(7) // Limit to the last 7 days
            ->get();

        $deviceDistribution = UrlAnalytics::selectRaw('device, COUNT(*) as count')
            ->where('url_id', $urlId)
            ->groupBy('device')
            ->get();

        $topCountries = UrlAnalytics::selectRaw('country_code, COUNT(*) as count')
            ->where('url_id', $urlId)
            ->groupBy('country_code')
            ->orderBy('count', 'desc')
            ->take(5)
            ->get();

        $cityDistribution = UrlAnalytics::selectRaw('city, COUNT(*) as count')
            ->where('url_id', $urlId)
            ->groupBy('city')
            ->orderBy('count', 'desc')
            ->take(5)
            ->get();

        return [
            'totalVisits' => $totalVisits,
            'dailyVisits' => $dailyVisits,
            'deviceDistribution' => $deviceDistribution,
            'topCountries' => $topCountries,
            'cityDistribution' => $cityDistribution,
        ];
    }

    public function getAllUrlsAnalyticsForUser($userId)
    {
        // Fetch all URLs for the user
        $urls = Url::where('user_id', $userId)->whereNull('dlt_id')->get();

        $totalVisits = 0;
        $dailyVisits = [];
        $deviceDistribution = [];
        $topCountries = [];
        $cityDistribution = [];

        // Loop through each URL and aggregate data
        foreach ($urls as $url) {
            // Increment total visits
            $totalVisits += UrlAnalytics::where('url_id', $url->id)->count();

            // Aggregate daily visits (for the last 7 days)
            $dailyVisitData = UrlAnalytics::selectRaw('DATE(created_at) as date, COUNT(*) as visits')
                ->where('url_id', $url->id)
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->take(7)
                ->get();

            foreach ($dailyVisitData as $dailyVisit) {
                $date = $dailyVisit->date;
                $existing = collect($dailyVisits)->firstWhere('date', $date);
                if ($existing) {
                    // Update visits if the date already exists
                    $existing['visits'] += $dailyVisit->visits;
                } else {
                    $dailyVisits[] = [
                        'date' => $date,
                        'visits' => $dailyVisit->visits
                    ];
                }
            }

            // Aggregate device distribution
            $devices = UrlAnalytics::selectRaw('device, COUNT(*) as count')
                ->where('url_id', $url->id)
                ->groupBy('device')
                ->get();

            foreach ($devices as $device) {
                $existingDevice = collect($deviceDistribution)->firstWhere('device', $device->device);
                if ($existingDevice) {
                    // Update count if the device already exists
                    $existingDevice['count'] += $device->count;
                } else {
                    $deviceDistribution[] = [
                        'device' => $device->device,
                        'count' => $device->count
                    ];
                }
            }

            // Aggregate top countries
            $countries = UrlAnalytics::selectRaw('country_code, COUNT(*) as count')
                ->where('url_id', $url->id)
                ->groupBy('country_code')
                ->orderBy('count', 'desc')
                ->take(5)
                ->get();

            foreach ($countries as $country) {
                $existingCountry = collect($topCountries)->firstWhere('country_code', $country->country_code);
                if ($existingCountry) {
                    // Update count if the country already exists
                    $existingCountry['count'] += $country->count;
                } else {
                    $topCountries[] = [
                        'country_code' => $country->country_code,
                        'count' => $country->count
                    ];
                }
            }

            // Aggregate city distribution
            $cities = UrlAnalytics::selectRaw('city, COUNT(*) as count')
                ->where('url_id', $url->id)
                ->groupBy('city')
                ->orderBy('count', 'desc')
                ->take(5)
                ->get();

            foreach ($cities as $city) {
                $existingCity = collect($cityDistribution)->firstWhere('city', $city->city);
                if ($existingCity) {
                    // Update count if the city already exists
                    $existingCity['count'] += $city->count;
                } else {
                    $cityDistribution[] = [
                        'city' => $city->city,
                        'count' => $city->count
                    ];
                }
            }
        }

        // Sort daily visits in descending order by date
        usort($dailyVisits, function ($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });

        return [
            'totalVisits' => $totalVisits,
            'dailyVisits' => $dailyVisits,
            'deviceDistribution' => $deviceDistribution,
            'topCountries' => $topCountries,
            'cityDistribution' => $cityDistribution,
        ];
    }
}
