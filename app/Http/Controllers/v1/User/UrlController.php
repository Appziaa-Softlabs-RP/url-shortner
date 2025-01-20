<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\ShortenUrlRequest;
use App\Http\Requests\v1\User\ValidateUrlRequest;
use App\Http\Traits\HttpResponse;
use App\Services\UrlAnalyticsService;
use App\Services\UrlService;

class UrlController extends Controller
{
    use HttpResponse;

    protected UrlService $urlService;
    protected UrlAnalyticsService $analyticsService;

    public function __construct(
        UrlService $urlService,
        UrlAnalyticsService $analyticsService
    ) {
        $this->urlService = $urlService;
        $this->analyticsService = $analyticsService;
    }

    public function index()
    {
        try {
            $urls = $this->urlService->getUserUrls(auth()->id());

            return $this->success(
                data: $urls,
                message: null
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function store(ShortenUrlRequest $request)
    {
        try {
            $data = $request->validated();
            $longUrl = $data['long_url'];
            $title = $request->title ?? null;
            $dltCode = $request->dlt_code;

            $shortCode = $this->urlService->generateShortUrl(
                longUrl: $longUrl,
                dltCode: $dltCode,
                title: $title
            );

            return $this->success(
                data: ['short_code' => $shortCode],
                message: 'Short URL generated successfully'
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function validateAuthUserUrl(ValidateUrlRequest $request)
    {
        try {
            $data = $request->validated();
            $url = $data['url'];
            $shortCode = $request->short_code;
            $data = $this->urlService->validateUrl(
                url: $url,
                shortCode: $shortCode,
                userId: auth()->id()
            );

            return $this->success(
                message: null
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function show($shortCode)
    {
        try {
            $url = $this->urlService->getByShortCodeWhereNullDltAndUserId(
                shortCode: $shortCode,
                userId: auth()->id()
            );

            $analytics = $this->analyticsService->getAnalyticsForUrl($url->id);

            $data = [
                "url" => $url,
                "analytics" => $analytics
            ];

            return $this->success(
                data: $data,
                message: null
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function getAllUrlAnalytics()
    {
        try {
            $analytics = $this->analyticsService->getAllUrlsAnalyticsForUser(auth()->id());

            $data = [
                "analytics" => $analytics
            ];

            return $this->success(
                data: $data,
                message: null
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function update($shortCode, ShortenUrlRequest $request)
    {
        try {
            $data = $request->validated();
            $longUrl = $data['long_url'];
            $title = $data['title'];

            $shortCode = $this->urlService->updateShortUrl(
                longUrl: $longUrl,
                shortCode: $shortCode,
                title: $title
            );

            return $this->success(
                data: ['short_code' => $shortCode],
                message: 'Short URL generated successfully'
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function destroy($shortCode)
    {
        $url = $this->urlService->deleteUserUrl($shortCode, auth()->id());

        return $this->success(
            data: $url,
            message: "URL deleted successfully"
        );
    }
}
