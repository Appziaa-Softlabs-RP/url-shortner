<?php

namespace App\Services;

use App\Repositories\PageRepository;

class PageService
{

    protected PageRepository $repository;

    public function __construct(
        PageRepository $repository
    ) {
        $this->repository = $repository;
    }

}
