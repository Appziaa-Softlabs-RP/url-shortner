<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\ShortenUrlRequest;
use App\Http\Requests\v1\User\ValidateUrlRequest;
use App\Http\Traits\HttpResponse;
use App\Services\UrlService;

class UrlController extends Controller
{
    use HttpResponse;

    protected UrlService $urlService;

    public function __construct(
        UrlService $urlService,
    ) {
        $this->urlService = $urlService;
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
            $title = $data['title'];
            $dltCode = $request->dlt_code;

            $shortCode = $this->urlService->generateShortUrl(
                longUrl: $longUrl,
                dltCode: $dltCode,
                title: $title
            );

            return $this->success(
                data: ['short_url' => $shortCode],
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
            $data = $this->urlService->validateUrl($data['url'], auth()->id());

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
            $url = $this->urlService->getByShortCodeWhereNullDlt($shortCode);

            return $this->success(
                data: $url,
                message: null
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
