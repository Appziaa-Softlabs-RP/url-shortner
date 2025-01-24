<?php

namespace App\Http\Middleware;

use App\Services\ApiClientService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateUrlShorteningApiToken
{
    protected $apiClientService;

    public function __construct(ApiClientService $apiClientService)
    {
        $this->apiClientService = $apiClientService;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        $appUrl = $request->header('App-Url');

        if (!$this->apiClientService->validateToken($token, $appUrl)) {
            return response()->json(['message' => 'Invalid or unauthorized API token.'], 403);
        }

        return $next($request);
    }
}
