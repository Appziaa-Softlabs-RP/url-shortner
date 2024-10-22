<?php

namespace App\Http\Controllers\v1\Ai;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Ai\CompareCvRequest;
use App\Http\Traits\HttpResponse;
use App\Services\VertexService;
use Illuminate\Http\Request;

class CompareCvController extends Controller
{
    use HttpResponse;

    protected $vertexService;

    public function __construct(
        VertexService $vertexService
    ) {
        $this->vertexService = $vertexService;
    }

    public function compare(CompareCvRequest $request)
    {
        try {
            $validated = $request->validated();

            $result = $this->vertexService->comparePdfs($validated['job_description'], $request->pdfs);

            return $this->success(
                message: 'CVs compared successfully',
                data: $result
            );
        } catch (\Exception $e) {
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }

    public function calculateCandidateFitScore(CompareCvRequest $request)
    {
        try {
            $validated = $request->validated();

            $result = $this->vertexService->calculateCandidateFitScore($validated['job_description'], $request->pdfs);

            return $this->success(
                message: 'CVs compared successfully',
                data: $result
            );
        } catch (\Exception $e) {
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }
}
