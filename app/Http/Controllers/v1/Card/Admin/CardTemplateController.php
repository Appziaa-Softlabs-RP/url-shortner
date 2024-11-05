<?php

namespace App\Http\Controllers\v1\Card\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Admin\Card\Template\AddTemplateRequest;
use App\Http\Traits\HttpResponse;
use App\Services\CardTemplateService;
use Illuminate\Http\Request;

class CardTemplateController extends Controller
{
    use HttpResponse;

    protected CardTemplateService $CardTemplateService;

    public function __construct(CardTemplateService $CardTemplateService)
    {
        $this->CardTemplateService = $CardTemplateService;
    }

    public function index(Request $request)
    {
        $data = $this->CardTemplateService->index($request);

        return $this->success(
            data: $data,
            message: 'Card Templates fetched successfully',
        );
    }

    public function store(AddTemplateRequest $request)
    {
        $data = $this->CardTemplateService->store($request->all());

        return $this->success(
            data: $data,
            message: 'Card Template created successfully',
        );
    }

    public function show($id)
    {
        $data = $this->CardTemplateService->show($id);

        return $this->success(
            data: $data,
            message: 'Card Template fetched successfully',
        );
    }

    public function update(AddTemplateRequest $request, $id)
    {
        $data = $this->CardTemplateService->update($request->all(), $id);

        return $this->success(
            data: $data,
            message: 'Card Template updated successfully',
        );
    }

    public function destroy($id)
    {
        $data = $this->CardTemplateService->destroy($id);

        return $this->success(
            data: $data,
            message: 'Card Template deleted successfully',
        );
    }
}
