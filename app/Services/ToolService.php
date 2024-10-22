<?php

namespace App\Services;

use App\Models\Tool;
use App\Repositories\ToolRepository;

class ToolService
{
    protected ToolRepository $toolRepository;

    public function __construct(
        ToolRepository $toolRepository
    ) {
        $this->toolRepository = $toolRepository;
    }

    public function store(array $data): Tool
    {
        return $this->toolRepository->store($data);
    }
}
