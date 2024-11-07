<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\LegalPolicyService;
use Illuminate\Http\Request;

class LegalPolicyController extends Controller
{
    use HttpResponse;

    protected LegalPolicyService $legalPolicyService;

    public function __construct(LegalPolicyService $legalPolicyService)
    {
        $this->legalPolicyService = $legalPolicyService;
    }

    public function index()
    {
        $data = $this->legalPolicyService->index();
        return $this->success(
            data: $data,
            message: 'Legal policies fetched successfully.'
        );
    }
}
