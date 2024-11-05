<?php

namespace App\Http\Controllers\v1\Card\User;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\CardTemplateService;

class CardTemplateController extends Controller
{
    use HttpResponse;

    protected CardTemplateService $cardTemplateService;

    public function __construct(CardTemplateService $cardTemplateService)
    {
        $this->cardTemplateService = $cardTemplateService;
    }

    public function index()
    {
        $cardTemplates = $this->cardTemplateService->getActiveCardTemplates();

        return $this->success(
            data: $cardTemplates,
            message: 'Card templates fetched successfully.'
        );
    }
}
