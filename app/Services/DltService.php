<?php

namespace App\Services;

use App\Repositories\DltRepository;

class DltService
{

    protected DltRepository $dltRepository;

    public function __construct(DltRepository $dltRepository)
    {
        $this->dltRepository = $dltRepository;
    }

    public function getById(int $id)
    {
        return $this->dltRepository->getById($id);
    }

}
