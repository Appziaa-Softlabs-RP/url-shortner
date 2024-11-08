<?php

namespace App\Repositories;

use App\Models\BlockField;

class BlockFieldRepository
{

    protected BlockField $model;

    public function __construct(
        BlockField $model
    ) {
        $this->model = $model;
    }

}
