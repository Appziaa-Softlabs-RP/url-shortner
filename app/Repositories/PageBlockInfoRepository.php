<?php

namespace App\Repositories;

use App\Models\PageBlockInfo;

class PageBlockInfoRepository
{

    protected PageBlockInfo $model;

    public function __construct(
        PageBlockInfo $model
    ) {
        $this->model = $model;
    }

}
