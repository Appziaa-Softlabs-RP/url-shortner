<?php

namespace App\Http\Controllers\v1\Ai;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Ai\GenerateBooleanStringRequest;
use App\Http\Traits\HttpResponse;
use App\Services\AIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    use HttpResponse;

    protected AIService $aiService;

    public function __construct(
        AIService $aiService
    ) {
        $this->aiService = $aiService;
    }

    public function generateBooleanString(GenerateBooleanStringRequest $request): JsonResponse
    {
        try{
            $data = $request->validated();
            $response = $this->aiService->generateBooleanString($data);

            return $this->success(
                message: 'Boolean string generated successfully',
                data: $response
            );
        }catch (\Exception $e){
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }
}
