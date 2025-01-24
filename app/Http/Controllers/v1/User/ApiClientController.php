<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\User\RegisterApp\RegisterAppRequest;
use App\Http\Traits\HttpResponse;
use App\Services\ApiClientService;

class ApiClientController extends Controller
{
    use HttpResponse;

    protected ApiClientService $service;

    public function __construct(ApiClientService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->index();

        return $this->success(
            data: $data,
            message: "Apps fetched successfully"
        );
    }

    public function show($id)
    {
        $data = $this->service->show($id);

        return $this->success(
            data: $data,
            message: "App fetched successfully"
        );
    }

    public function store(RegisterAppRequest $request)
    {
        try {
            $data = $request->validated();
            $result = $this->service->registerApp($data);

            return $this->success(
                data: $result['data'],
                message: 'App registered successfully.'
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                code: 400
            );
        }
    }

    public function update(int $id, RegisterAppRequest $request)
    {
        $data = $request->validated();

        $data = $this->service->update($id, $data);

        return $this->success(
            data: $data,
            message: "App updated successfully"
        );
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);

        return $this->success(
            data: $data,
            message: "App deleted successfully"
        );
    }
}
