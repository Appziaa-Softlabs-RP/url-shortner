<?php

namespace App\Services;

use App\Externals\GeminiAiApi;
use Illuminate\Http\JsonResponse;

class AIService
{
    protected GeminiAiApi $geminiAiApi;

    public function __construct(
        GeminiAiApi $geminiAiApi
    ) {
        $this->geminiAiApi = $geminiAiApi;
    }

    public function generatePrescreeningInterviewQuestions(array $data)
    {
        return $this->geminiAiApi->generatePrescreeningInterviewQuestions($data['description']);
    }

    public function generatePrescreeningModalAnswer(array $data)
    {
        return $this->geminiAiApi->generatePrescreeningModalAnswer($data['question']);
    }

    public function generateJobDescription(array $data)
    {
        return $this->geminiAiApi->generateJobDescription(
            jobTitle: $data['job_title'],
            industry: isset($data['industry']) ? $data['industry'] : '',
            tone: $data['tone']
        );
    }
}
