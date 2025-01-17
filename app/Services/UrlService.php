<?php

namespace App\Services;

use App\Repositories\UrlRepository;
use App\Repositories\DltRepository;
use Illuminate\Support\Str;
use App\Models\Url;

class UrlService
{

    protected UrlRepository $urlRepository;
    protected DltRepository $dltRepository;

    public function __construct(
        UrlRepository $urlRepository,
        DltRepository $dltRepository
    )
    {
        $this->urlRepository = $urlRepository;
        $this->dltRepository = $dltRepository;
    }

    private function generateUniqueShortCode()
    {
        do {
            $shortCode = Str::random(6);
        } while (Url::where('short_code', $shortCode)->exists());

        return $shortCode;
    }

    public function generateShortUrl($longUrl, $dltCode)
    {
        $codeWithDlt = $dltCode ? $dltCode . '/' : '';

        // Check if the long URL already exists in the database
        $existingUrl = $this->urlRepository->getByUrl($longUrl);
        if ($existingUrl) {
            return url($codeWithDlt . $existingUrl->short_code);

        }
        // Generate a unique shortcode
        $shortCode = $this->generateUniqueShortCode();

        $dltId = null;
        if($dltCode) {
            $dltDetails = $this->dltRepository->getByCode($dltCode);
            if($dltDetails) {
                $dltId = $dltDetails->id;
            }
        }

        Url::create([
            'dlt_id' => $dltId,
            'long_url' => $longUrl,
            'short_code' => $shortCode
        ]);

        return  secure_url($codeWithDlt . $shortCode);
    }

    public function getById(int $id)
    {
        return $this->urlRepository->getById($id);
    }

}
