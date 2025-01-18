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
use Illuminate\Support\Facades\Http;

class UrlController extends Controller
{

    use HttpResponse;

    protected UrlService $service;
    protected UrlRepository $repository;

    public function __construct(
        UrlService $service,
        UrlRepository $repository
    ) {
        $this->service = $service;
        $this->repository = $repository;
    }

    public function redirect($code)
    {
        $url = $this->service->getByShortCodeWhereNullDlt(
            shortCode: $code
        );
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
