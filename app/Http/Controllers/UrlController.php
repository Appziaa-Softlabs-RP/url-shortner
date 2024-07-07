<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function shorten(Request $request)
    {
        $request->validate([
            'long_url' => 'required|url'
        ]);

        $longUrl = $request->long_url;

        // Check if the long URL already exists in the database
        $existingUrl = Url::where('long_url', $longUrl)->first();
        if ($existingUrl) {
            return response()->json(['short_url' => url($existingUrl->short_code)]);
        }

        // Generate a unique shortcode
        $shortCode = $this->generateUniqueShortCode();

        Url::create([
            'long_url' => $longUrl,
            'short_code' => $shortCode
        ]);

        return response()->json(['short_url' => url($shortCode)]);
    }

    public function redirect($code)
    {
        $url = Url::where('short_code', $code)->firstOrFail();
        return redirect($url->long_url);
    }
}
