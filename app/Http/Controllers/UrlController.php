<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use App\Services\UrlService;
use App\Repositories\UrlRepository;

class UrlController extends Controller
{

    protected UrlService $urlService;
    protected UrlRepository $urlRepository;

    public function __construct(
        UrlService $urlService,
        UrlRepository $urlRepository
    )
    {
        $this->urlService = $urlService;
        $this->urlRepository = $urlRepository;
    }

    public function shorten(Request $request)
    {
        $request->validate([
            'long_url' => [
                'required',
                'url'
            ],
            'dlt_code' => [
                'nullable',
                'string',
                'exists:dlt_codes,code',
                'max:6'
            ]
        ]);

        $longUrl = $request->input('long_url');
        $dltCode = $request->dlt_code;

        $shortCode = $this->urlService->generateShortUrl(
            longUrl: $longUrl,
            dltCode: $dltCode
        );

        return response()->json(['short_url' => $shortCode]);
    }

    public function redirect($code)
    {
        $url = Url::where('short_code', $code)
            ->whereNull('dlt_id')
            ->firstOrFail();
        return redirect($url->long_url);
    }


    public function redirectWithDlt($dltCode, $code)
    {
        $url = $this->urlRepository->getLongUrlByShortCodeAndDlt(
            code: $code,
            dltCode: $dltCode
        );
        if(!$url) {
            abort(404);
        }
        return redirect($url->long_url);
    }

}
