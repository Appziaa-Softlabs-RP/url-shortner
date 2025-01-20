<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\ShortenUrlRequest;
use App\Http\Requests\v1\User\ValidateUrlRequest;
use App\Http\Traits\HttpResponse;
use App\Models\Url;
use App\Services\UrlService;
use App\Repositories\UrlRepository;
use App\Services\UrlAnalyticsService;
use Illuminate\Support\Facades\Http;

class UrlController extends Controller
{

    use HttpResponse;

    protected UrlService $service;
    protected UrlRepository $repository;
    protected UrlAnalyticsService $analyticsService;

    public function __construct(
        UrlService $service,
        UrlRepository $repository,
        UrlAnalyticsService $analyticsService
    ) {
        $this->service = $service;
        $this->repository = $repository;
        $this->analyticsService = $analyticsService;
    }

    public function redirect($code)
    {
        $url = $this->service->getByShortCodeWhereNullDlt(
            shortCode: $code
        );
        $this->analyticsService->recordAnalytics($url);
        return redirect($url->long_url);
    }

    public function redirectWithDlt($dltCode, $code)
    {
        $url = $this->repository->getLongUrlByShortCodeAndDlt(
            code: $code,
            dltCode: $dltCode
        );
        if (!$url) {
            abort(404);
        }
        return redirect($url->long_url);
    }

    public function fetchTitle(ValidateUrlRequest $request)
    {
        $title = $this->service->getTitle(
            url: $request->url
        );
        return $this->success(
            data: $title,
            message: 'Title fetched successfully'
        );
    }
}
