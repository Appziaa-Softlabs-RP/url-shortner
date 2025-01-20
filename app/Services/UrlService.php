<?php

namespace App\Services;

use App\Models\Url;
use App\Models\UrlAnalytics;
use App\Repositories\UrlRepository;
use App\Repositories\DltRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class UrlService
{

    protected UrlRepository $repository;
    protected DltRepository $dltRepository;

    public function __construct(
        UrlRepository $repository,
        DltRepository $dltRepository
    ) {
        $this->repository = $repository;
        $this->dltRepository = $dltRepository;
    }

    public function getUserUrls($userId)
    {
        return $this->repository->getByUserId($userId);
    }

    private function generateUniqueShortCode()
    {
        do {
            $shortCode = Str::random(6);
        } while ($this->repository->isShortCodeExists($shortCode));

        return $shortCode;
    }

    private function extractCode($url)
    {
        $path = parse_url($url, PHP_URL_PATH); // Extract the path part of the URL
        return basename($path); // Get the last part of the path
    }

    private function getRootDomain($url)
    {
        $parsedUrl = parse_url($url);
        $host = $parsedUrl['host'];

        $hostParts = explode('.', $host);
        $hostPartsCount = count($hostParts);

        if ($hostPartsCount >= 2) {
            return $hostParts[$hostPartsCount - 2] . '.' . $hostParts[$hostPartsCount - 1];
        }

        return $host;
    }

    public function validateUrl($url, $shortCode = null, $userId)
    {

        if ($shortCode) {
            if (!$this->repository->isShortCodeByUserIdExists($shortCode, $userId)) {
                throw new \Exception("Short Code doesn't exists");
            }
        }
        if ($userId) {
            $existingUrl = $this->repository->getByUrlAndUserId($url, $userId);
            if ($existingUrl && (!$shortCode || $existingUrl->short_code != $shortCode)) {
                throw new \Exception("Looks like this destination is already used for another short link. Check the existing url tab.");
            }
        }

        $shortCode = $this->extractCode($url);

        $existingShortUrl = $this->repository->getByShortCodeAndUserId($shortCode, $userId);

        $isUrlSame = (
            (env('APP_URL') === "https://" . $this->getRootDomain($url)) ||
            (env('APP_URL') === "http://" . $this->getRootDomain($url)) ||
            (env('APP_URL') === $this->getRootDomain($url))
        );

        if ($existingShortUrl && !$isUrlSame) {
            throw new \Exception("This is a rwps short Link and can't be shortened again. Enter a different URL.");
        }
    }

    public function generateShortUrl($longUrl, $dltCode, $title)
    {
        $this->validateUrl(
            url: $longUrl,
            shortCode: null,
            userId: auth()->id()
        );

        $codeWithDlt = $dltCode ? $dltCode . '/' : '';

        // Generate a unique shortcode
        $shortCode = $this->generateUniqueShortCode();

        $dltId = null;
        if ($dltCode) {
            $dltDetails = $this->dltRepository->getByCode($dltCode);
            if ($dltDetails) {
                $dltId = $dltDetails->id;
            }
        }

        $this->repository->create([
            'dlt_id' => $dltId,
            'long_url' => $longUrl,
            'title' => $title,
            'short_code' => $shortCode,
            'user_id' => auth()->id()
        ]);

        return $shortCode;
    }

    public function generateShortUrlOld($longUrl, $dltCode)
    {
        $codeWithDlt = $dltCode ? $dltCode . '/' : '';

        // Check if the long URL already exists in the database
        $existingUrl = $this->repository->getByUrl($longUrl);
        if ($existingUrl) {
            return url($codeWithDlt . $existingUrl->short_code);
        }
        // Generate a unique shortcode
        $shortCode = $this->generateUniqueShortCode();

        $dltId = null;
        if ($dltCode) {
            $dltDetails = $this->dltRepository->getByCode($dltCode);
            if ($dltDetails) {
                $dltId = $dltDetails->id;
            }
        }

        $this->repository->create([
            'dlt_id' => $dltId,
            'long_url' => $longUrl,
            'short_code' => $shortCode
        ]);

        return  secure_url($codeWithDlt . $shortCode);
    }

    public function updateShortUrl($longUrl, $shortCode, $title)
    {
        $this->validateUrl(
            url: $longUrl,
            userId: auth()->id(),
            shortCode: $shortCode
        );

        $path = '';

        $this->repository->updateByShortCode(
            shortCode: $shortCode,
            data: [
                'long_url' => $longUrl,
                'title' => $title,
                'user_id' => auth()->id()
            ]
        );

        return $shortCode;
    }

    public function getById(int $id)
    {
        return $this->repository->getById($id);
    }

    public function getByShortCodeWhereNullDlt($shortCode)
    {
        return $this->repository->getByShortCodeWhereNullDlt(
            shortCode: $shortCode
        );
    }

    public function getByShortCodeWhereNullDltAndUserId($shortCode, $userId)
    {
        return $this->repository->getByShortCodeWhereNullDltAndUserId(
            shortCode: $shortCode,
            userId: $userId
        );
    }

    public function getTitle($url)
    {
        return $this->repository->getTitle($url);
    }

    public function deleteUserUrl($shortCode, $userId)
    {
        return $this->repository->deleteUserUrl($shortCode, $userId);
    }
}
