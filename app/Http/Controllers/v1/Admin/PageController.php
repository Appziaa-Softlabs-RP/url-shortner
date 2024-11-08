<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\PageService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    use HttpResponse;

    protected PageService $service;

    public function __construct(
        PageService $service
    ) {
        $this->service = $service;
    }
}
