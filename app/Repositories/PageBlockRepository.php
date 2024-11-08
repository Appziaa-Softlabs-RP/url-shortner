<?php

namespace App\Repositories;

use App\Models\PageBlock;

class PageBlockRepository
{

    protected PageBlock $model;

    public function __construct(PageBlock $model)
    {
        $this->model = $model;
    }

}
