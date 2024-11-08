<?php

namespace App\Repositories;

use App\Models\Page;

class PageRepository
{

    protected Page $model;

    public function __construct(Page $model)
    {
        $this->model = $model;
    }

}
