<?php

namespace App\Services;

use App\Repositories\CardTemplateRepository;
use Illuminate\Http\Request;

class CardTemplateService
{
    protected CardTemplateRepository $CardTemplateRepository;

    public function __construct(CardTemplateRepository $CardTemplateRepository)
    {
        $this->CardTemplateRepository = $CardTemplateRepository;
    }

    public function getActiveCardTemplates()
    {
        return $this->CardTemplateRepository->getActiveCardTemplates();
    }

    public function index(Request $request)
    {
        return $this->CardTemplateRepository->index($request);
    }

    public function store($data)
    {
        return $this->CardTemplateRepository->store($data);
    }

    public function show($id)
    {
        return $this->CardTemplateRepository->show($id);
    }

    public function update($data, $id)
    {
        return $this->CardTemplateRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->CardTemplateRepository->destroy($id);
    }
}
