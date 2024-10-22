<?php

namespace App\Repositories;

use App\Models\Tool;

class ToolRepository
{
    protected Tool $tool;

    public function __construct(Tool $tool)
    {
        $this->tool = $tool;
    }

    public function store(array $data): Tool
    {
        return $this->tool->create($data);
    }
}
