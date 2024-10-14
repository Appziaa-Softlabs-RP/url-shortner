<?php

namespace App\Http\Controllers\v1\Ai;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Ai\GenerateJobDescriptionRequest;
use App\Http\Traits\HttpResponse;
use App\Services\AIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobDescriptionController extends Controller
{
    use HttpResponse;

    protected AIService $aiService;

    public function __construct(
        AIService $aiService
    ) {
        $this->aiService = $aiService;
    }

    public function generate(GenerateJobDescriptionRequest $request): JsonResponse {
        try{
            $data = $request->validated();
            $response = $this->aiService->generateJobDescription($data);

            return $this->success(
                message: 'Job description generated successfully',
                data: $response
            );
        }catch (\Exception $e){
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }
}
