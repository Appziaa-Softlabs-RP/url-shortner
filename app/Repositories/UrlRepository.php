<?php

namespace App\Repositories;

use App\Models\Url;
use App\Models\UrlCache;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class UrlRepository
{
    protected Url $model;
    protected DltRepository $dltRepository;

    public function __construct(
        Url $model,
        DltRepository $dltRepository
    ) {
        $this->model = $model;
        $this->dltRepository = $dltRepository;
    }

    public function getByUserId(int $userId)
    {
        $urls = $this->model
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($urls as $url) {
            if ($url && !$url->title) {
                $url->title = $this->getTitle($url->long_url);
            }
        }
        logger()->info($urls);

        return $urls;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function isShortCodeExists(string $code)
    {
        return $this->model->where('short_code', $code)->exists();
    }

    public function getByUrl(string $url)
    {
        $url = $this->model->where('long_url', $url)->first();
        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }
        return $url;
    }

    public function getByUrlAndUserId(string $url, int $userId)
    {
        $url = $this->model->where('long_url', $url)->where('user_id', $userId)->first();
        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }
        return $url;
    }

    public function isShortCodeByUserIdExists(string $shortCode, int $userId)
    {
        return $this->model->where('short_code', $shortCode)->where('user_id', $userId)->exists();
    }


    public function getByShortCodeAndUserId(string $url, int $userId)
    {
        $url = $this->model->where('short_code', $url)->where('user_id', $userId)->first();
        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }
        return $url;
    }

    public function getById(int $id)
    {
        $url = $this->model->find($id);
        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }
        return $url;
    }

    public function updateByShortCode(string $shortCode, array $data)
    {
        return $this->model->where('short_code', $shortCode)->update($data);
    }


    public function getLongUrlByShortCodeAndDlt($code, $dltCode)
    {
        $dltId = null;
        if ($dltCode) {
            $dltDetails = $this->dltRepository->getByCode($dltCode);
            if ($dltDetails) {
                $dltId = $dltDetails->id;
            }
        }

        $url = $this->model->where('short_code', $code)
            ->where('dlt_id', $dltId)
            ->first();

        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }

        return $url;
    }


    public function getByShortCodeWhereNullDlt($shortCode)
    {
        $url = $this
            ->model
            ->where('short_code', $shortCode)
            ->whereNull('dlt_id')
            ->firstOrFail();

        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }

        return $url;
    }


    public function getByShortCodeWhereNullDltAndUserId($shortCode, $userId)
    {
        $url = $this
            ->model
            ->where('short_code', $shortCode)
            ->where('user_id', $userId)
            ->whereNull('dlt_id')
            ->firstOrFail();

        if ($url && !$url->title) {
            $url->title = $this->getTitle($url->long_url);
        }

        return $url;
    }

    public function getTitle(string $url): string
    {
        // Validate the URL format
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return 'Invalid URL';
        }

        // Check if the URL is already cached
        $cache = UrlCache::where('url', $url)->first();

        if ($cache) {
            // Check if the cached entry is older than 3 days
            $expirationDate = Carbon::parse($cache->updated_at)->addDays(3);
            if ($expirationDate->isFuture()) {
                return $cache->title;
            }
        }

        try {
            // Check if the URL is reachable before fetching the content
            $response = Http::head($url); // Use HEAD request to check if the URL is reachable

            // If the response fails, return an error message
            if ($response->failed()) {
                return 'URL is not reachable or invalid';
            }

            // If the URL is reachable, fetch the HTML content
            $response = Http::get($url);

            if ($response->failed()) {
                throw new \Exception('Failed to fetch the URL');
            }

            $html = $response->body();

            // Extract the title using a regex
            preg_match('/<title>(.*?)<\/title>/', $html, $matches);

            $domain = parse_url($url, PHP_URL_HOST);
            $title = $matches[1] ?? ($domain . ' - untitled');

            // Save or update the result in the database
            UrlCache::updateOrCreate(
                ['url' => $url],
                ['title' => $title]
            );

            return $title;
        } catch (\Exception $e) {
            // Log the exception and return a fallback message
            $domain = parse_url($url, PHP_URL_HOST);
            return $domain . ' - untitled';
        }
    }

    public function deleteUserUrl($shortCode, $userId)
    {
        return $this->model->where('short_code', $shortCode)->where('user_id', $userId)->delete();
    }
}
