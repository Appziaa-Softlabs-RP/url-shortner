<?php

namespace App\Repositories;
use App\Models\DltCode;

class DltRepository
{
    protected DltCode $dltCode;

    public function __construct(DltCode $dltCode)
    {
        $this->dltCode = $dltCode;
    }

    public function getById(int $id)
    {
        return $this->dltCode->find($id);
    }

    public function getByCode(string $code)
    {
        return $this->dltCode->where('code', $code)->first();
    }
}
