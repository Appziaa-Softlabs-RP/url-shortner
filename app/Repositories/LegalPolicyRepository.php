<?php

namespace App\Repositories;

use App\Models\LegalPolicy;

class LegalPolicyRepository
{
    protected LegalPolicy $model;

    public function __construct(
        LegalPolicy $model
    ) {
        $this->model = $model;
    }

    public function index()
    {
        return $this->model
            ->orderBy('id', 'desc')
            ->where('title', 'like', '%' . request()->search ?? '' . '%')
            ->paginate(request()->limit ?? 10);
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function store($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        $model = $this->model->findOrFail($id);
        $model->update($data);

        return $model;
    }

    public function destroy($id)
    {
        $model = $this->model->findOrFail($id);
        $model->delete();

        return $model;
    }
}
