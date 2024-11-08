<?php

namespace App\Repositories;

use App\Models\Block;

class BlockRepository
{
    protected Block $model;

    public function __construct(
        Block $model
    ) {
        $this->model = $model;
    }
}
