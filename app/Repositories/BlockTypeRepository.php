<?php

namespace App\Repositories;

use App\Models\BlockType;

class BlockTypeRepository
{

    protected BlockType $model;

    public function __construct(BlockType $model)
    {
        $this->model = $model;
    }

}
