<?php

namespace App\Repositories;

use App\Models\Url;

class UrlRepository
{
    protected Url $url;
    protected DltRepository $dltRepository;

    public function __construct(
        Url $url,
        DltRepository $dltRepository
    )
    {
        $this->url = $url;
        $this->dltRepository = $dltRepository;
    }

    public function getByUrl(string $url)
    {
        return $this->url->where('long_url', $url)->first();
    }

    public function getLongUrlByShortCodeAndDlt($code, $dltCode)
    {
        $dltId = null;
        if($dltCode) {
            $dltDetails = $this->dltRepository->getByCode($dltCode);
            if($dltDetails) {
                $dltId = $dltDetails->id;
            }
        }

        return $this->url->where('short_code', $code)
            ->where('dlt_id', $dltId)
            ->first();
    }

}
