<?php

namespace App\Services;

use App\Repositories\CardTemplateRepository;

class CardTemplateService
{
    protected CardTemplateRepository $CardTemplateRepository;

    public function __construct(CardTemplateRepository $CardTemplateRepository)
    {
        $this->CardTemplateRepository = $CardTemplateRepository;
    }
}
