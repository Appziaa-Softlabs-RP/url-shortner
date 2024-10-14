<?php

namespace App\Http\Controllers\v1\Ai;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Ai\GeneratePrescreeningModalAnswerRequest;
use App\Http\Requests\v1\Ai\GeneratePrescreeningQuestionsRequest;
use App\Http\Traits\HttpResponse;
use App\Services\AIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PreScreeningQuestionsController extends Controller
{
    use HttpResponse;

    protected AIService $aiService;

    public function __construct(
        AIService $aiService
    ) {
        $this->aiService = $aiService;
    }

    public function generateQuestion(GeneratePrescreeningQuestionsRequest $request): JsonResponse
    {
        try{
            $data = $request->validated();
            $response = $this->aiService->generatePrescreeningInterviewQuestions($data);

            return $this->success(
                message: 'Prescreening Questions generated successfully',
                data: $response
            );
        }catch (\Exception $e){
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }

    public function generateAnswer(GeneratePrescreeningModalAnswerRequest $request): JsonResponse
    {
        try{
            $data = $request->validated();

            $response = $this->aiService->generatePrescreeningModalAnswer($data);

            return $this->success(
                message: 'Prescreening Modal Answer generated successfully',
                data: $response
            );
        }catch (\Exception $e){
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }
}
