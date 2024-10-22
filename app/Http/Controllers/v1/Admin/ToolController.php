<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\ToolService;
use Illuminate\Http\Request;

class ToolController extends Controller
{
    use HttpResponse;

    protected ToolService $toolService;

    public function __construct(
        ToolService $toolService
    ) {
        $this->toolService = $toolService;
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
            ]);

            $tool = $this->toolService->store($validated);

            return $this->success(
                message: 'Tool created successfully',
                data: $tool
            );
        } catch (\Exception $e) {
            return $this->internalError(
                message: $e->getMessage()
            );
        }
    }
}
