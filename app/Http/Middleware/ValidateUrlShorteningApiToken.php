<?php

namespace App\Http\Middleware;

use App\Services\ApiClientService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValidateUrlShorteningApiToken
{
    protected $apiClientService;

    public function __construct(ApiClientService $apiClientService)
    {
        $this->apiClientService = $apiClientService;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = trim($request->header('rwps_token'));
        $appUrl = request()->getSchemeAndHttpHost();

        if (!$this->apiClientService->validateToken($token, $appUrl)) {
            return response()->json(['message' => 'Invalid or unauthorized API token.'], 403);
        }

        // validate user via token
        Auth::login($this->apiClientService->getUserByToken($token));

        return $next($request);
    }
}
