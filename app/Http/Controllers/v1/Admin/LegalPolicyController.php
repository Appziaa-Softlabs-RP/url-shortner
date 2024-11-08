<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Admin\LegalPolicy\AddLegalPolicyRequest;
use App\Http\Requests\v1\Admin\LegalPolicy\UpdateLegalPolicyRequest;
use App\Http\Traits\HttpResponse;
use App\Services\LegalPolicyService;

class LegalPolicyController extends Controller
{
    use HttpResponse;

    protected LegalPolicyService $service;

    public function __construct(
        LegalPolicyService $service
    ) {
        $this->service = $service;
    }

    public function index()
    {
        $data = $this->service->index();

        return $this->success(
            data: $data,
            message: 'Legal Policy List'
        );
    }

    public function show($id)
    {
        $data = $this->service->show($id);

        return $this->success(
            data: $data,
            message: 'Legal Policy Detail'
        );
    }

    public function store(AddLegalPolicyRequest $request)
    {
        $data = $request->validated();
        $file = $request->file('file');

        $data = $this->service->store($data, $file);

        return $this->success(
            data: $data,
            message: 'Legal Policy Created'
        );
    }

    public function update(UpdateLegalPolicyRequest $request, $id)
    {
        $data = $request->validated();
        $file = $request->file('file');

        $data = $this->service->update($id, $data, $file);

        return $this->success(
            data: $data,
            message: 'Legal Policy Updated'
        );
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);

        return $this->success(
            data: $data,
            message: 'Legal Policy Deleted'
        );
    }
}
